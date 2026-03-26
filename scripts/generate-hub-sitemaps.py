#!/usr/bin/env python3
"""
Generate per-hub item sitemaps for DPLA local hub subdomains.

Provider-based hubs read the latest snapshot from s3://dpla-master-dataset/<hub>/jsonl/
and extract the DPLA item ID from each record's _source.id field.

Tag-based hubs (aviation, nwdh, texas) paginate the DPLA API using a tag filter.

Sitemaps are written (gzip-compressed, ≤50,000 URLs/shard) to:
  s3://sitemaps.dp.la/sitemap/<hub>/all_item_urls_N.xml.gz

A sitemap index is written to:
  s3://sitemaps.dp.la/sitemap/<hub>/all_item_urls.xml

Run:
  python3 scripts/generate-hub-sitemaps.py [--hub HUB] [--dry-run]

  --hub HUB   Generate only for this hub (default: all hubs)
  --dry-run   Skip S3 uploads and print shard URL previews plus full index XML
"""

import argparse
import gzip
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from xml.sax.saxutils import escape

import boto3

ITEM_BASE = "https://dp.la/item"
SOURCE_BUCKET = "dpla-master-dataset"
SITEMAP_BUCKET = "sitemaps.dp.la"
SHARD_SIZE = 50_000

# Provider-based hubs: hub_id → S3 prefix under dpla-master-dataset
PROVIDER_HUBS = {
    "plains2peaks": "p2p",
    "wisconsin": "wisconsin",
    "illinois": "il",
    "florida": "florida",
    "vermont": "vt",
    "oklahoma": "oklahoma",
    "njde": "njde",
    "nwdh": "northwest-heritage",
    "texas": "texas",
}

# Tag-based hubs using DPLA API: hub_id → tag value
# Use only for small collections (< ~350 API calls total across the run).
TAG_HUBS = {
    "aviation": "aviation",
}

# Tag-based hubs using S3 full-scan: hub_id → tag value
# Used for large collections where the API rate limit is a constraint.
# Scans all hub prefixes in dpla-master-dataset and filters by tag.
S3_TAG_HUBS = {
    "bws": "blackwomensuffrage",
}

ALL_HUBS = list(PROVIDER_HUBS) + list(TAG_HUBS) + list(S3_TAG_HUBS)


def iter_ids_from_s3(s3_client, hub_id):
    """Yield item IDs from S3 JSONL files for provider-based hubs.

    Reads only the latest snapshot under <prefix>/jsonl/.  Snapshots are
    date-stamped subdirectories (e.g. 20260211_064914-p2p-.../); the most
    recent one is selected by lexicographic sort.

    Data files are gzip-compressed Spark output (part-*.txt.gz) or older
    JSON batches (*.json).  Each line is an Elasticsearch-style document
    whose DPLA item ID lives at _source.id.
    """
    prefix = PROVIDER_HUBS[hub_id]
    base_prefix = f"{prefix}/jsonl/"

    # Find the latest snapshot subdirectory.
    resp = s3_client.list_objects_v2(
        Bucket=SOURCE_BUCKET, Prefix=base_prefix, Delimiter="/"
    )
    snapshots = sorted(
        cp["Prefix"] for cp in resp.get("CommonPrefixes", [])
    )
    if not snapshots:
        return
    latest = snapshots[-1]

    paginator = s3_client.get_paginator("list_objects_v2")
    pages = paginator.paginate(Bucket=SOURCE_BUCKET, Prefix=latest)
    for page in pages:
        for obj in page.get("Contents", []):
            key = obj["Key"]
            basename = key.split("/")[-1]
            # Skip zero-byte markers, checksums, and hidden files.
            if obj["Size"] == 0 or basename.startswith(".") or basename.startswith("_"):
                continue
            is_gz = key.endswith(".gz")
            if not (is_gz or key.endswith(".json")):
                continue

            response = s3_client.get_object(Bucket=SOURCE_BUCKET, Key=key)
            raw = response["Body"].read()
            text = gzip.decompress(raw).decode("utf-8") if is_gz else raw.decode("utf-8")

            for line_no, line in enumerate(text.splitlines(), start=1):
                line = line.strip()
                if not line:
                    continue
                try:
                    record = json.loads(line)
                    # Elasticsearch-wrapped format: { "_id": ..., "_source": { "id": ... } }
                    item_id = record.get("_source", {}).get("id") or record.get("id")
                    if item_id:
                        yield item_id
                except json.JSONDecodeError as exc:
                    print(f"  Warning: malformed JSONL in {key} line {line_no}: {exc}", file=sys.stderr)


# Prefixes in dpla-master-dataset that don't contain item records.
_S3_SKIP_PREFIXES = {"tmp", "florida-staging", "txdl"}


def _iter_s3_hub_prefix(s3_client, prefix):
    """Yield parsed _source dicts from the latest snapshot under a hub prefix."""
    base_prefix = f"{prefix}/jsonl/"
    resp = s3_client.list_objects_v2(Bucket=SOURCE_BUCKET, Prefix=base_prefix, Delimiter="/")
    snapshots = sorted(cp["Prefix"] for cp in resp.get("CommonPrefixes", []))
    if not snapshots:
        return
    latest = snapshots[-1]
    paginator = s3_client.get_paginator("list_objects_v2")
    for page in paginator.paginate(Bucket=SOURCE_BUCKET, Prefix=latest):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            basename = key.split("/")[-1]
            if obj["Size"] == 0 or basename.startswith(".") or basename.startswith("_"):
                continue
            is_gz = key.endswith(".gz")
            if not (is_gz or key.endswith(".json")):
                continue
            response = s3_client.get_object(Bucket=SOURCE_BUCKET, Key=key)
            raw = response["Body"].read()
            text = gzip.decompress(raw).decode("utf-8") if is_gz else raw.decode("utf-8")
            for line in text.splitlines():
                line = line.strip()
                if not line:
                    continue
                try:
                    record = json.loads(line)
                    yield record.get("_source", record)
                except json.JSONDecodeError:
                    pass


def iter_ids_from_s3_by_tag(s3_client, tag):
    """Yield item IDs from all dpla-master-dataset hubs whose records include tag.

    Scans every hub prefix that has a jsonl/ directory.  For each hub, reads
    the first data file as a probe; if no matching records are found there, the
    hub is skipped entirely.  This avoids reading large hubs (Internet Archive,
    Library of Congress, etc.) that have no records with the target tag.
    """
    resp = s3_client.list_objects_v2(Bucket=SOURCE_BUCKET, Delimiter="/")
    hub_prefixes = sorted(
        cp["Prefix"].rstrip("/")
        for cp in resp.get("CommonPrefixes", [])
        if cp["Prefix"].rstrip("/") not in _S3_SKIP_PREFIXES
    )
    print(f"  Probing {len(hub_prefixes)} hub prefixes for tag={tag!r}", flush=True)

    for hub_prefix in hub_prefixes:
        base_prefix = f"{hub_prefix}/jsonl/"
        resp2 = s3_client.list_objects_v2(
            Bucket=SOURCE_BUCKET, Prefix=base_prefix, Delimiter="/"
        )
        snapshots = sorted(cp["Prefix"] for cp in resp2.get("CommonPrefixes", []))
        if not snapshots:
            continue
        latest = snapshots[-1]

        # Probe: read first data file to see if this hub has any matching records.
        paginator = s3_client.get_paginator("list_objects_v2")
        first_key = None
        for page in paginator.paginate(Bucket=SOURCE_BUCKET, Prefix=latest):
            for obj in page.get("Contents", []):
                key = obj["Key"]
                basename = key.split("/")[-1]
                if (
                    obj["Size"] > 0
                    and not basename.startswith(".")
                    and not basename.startswith("_")
                    and (key.endswith(".gz") or key.endswith(".json"))
                ):
                    first_key = key
                    break
            if first_key:
                break
        if not first_key:
            continue

        response = s3_client.get_object(Bucket=SOURCE_BUCKET, Key=first_key)
        raw = response["Body"].read()
        text = (
            gzip.decompress(raw).decode("utf-8")
            if first_key.endswith(".gz")
            else raw.decode("utf-8")
        )
        probe_hit = False
        for line in text.splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
                src = rec.get("_source", rec)
                if tag in src.get("tags", []):
                    probe_hit = True
                    break
            except json.JSONDecodeError:
                pass
        if not probe_hit:
            continue

        # Full scan of this hub.
        hub_count = 0
        for src in _iter_s3_hub_prefix(s3_client, hub_prefix):
            if tag in src.get("tags", []):
                item_id = src.get("id")
                if item_id:
                    hub_count += 1
                    yield item_id
        print(f"  {hub_prefix}: {hub_count} {tag!r} items", flush=True)


API_CALL_DELAY = 0.5  # seconds between API calls to respect rate limits


def _api_get(api_url, api_key, tag, extra_params, timeout=30, retries=3):
    """Make a single DPLA API request and return parsed JSON, with retries."""
    url = (
        f"{api_url}/v2/items"
        f"?api_key={api_key}"
        f"&tags={tag}"
        f"&{extra_params}"
    )
    req = urllib.request.Request(url, headers={"Accept": "application/json"})  # noqa: S310
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:  # noqa: S310
                data = json.loads(resp.read())
            time.sleep(API_CALL_DELAY)
            return data
        except urllib.error.HTTPError as exc:
            if exc.code in (500, 502, 503, 504) and attempt < retries - 1:
                time.sleep(5 * (attempt + 1))
                continue
            raise


MAX_API_WINDOW = 49_000  # ES max_result_window is 50K; stay safely under it


def _paginate_segment(api_url, api_key, tag, extra_base, page_size, seen, label):
    """Paginate a single (provider [+ date]) segment, yielding unseen IDs."""
    page = 1
    while True:
        extra = f"page={page}&page_size={page_size}&fields=id&{extra_base}"
        data = _api_get(api_url, api_key, tag, extra)
        if page == 1:
            print(f"    {label}: count={data.get('count', '?')}", flush=True)
        docs = data.get("docs", [])
        if not docs:
            break
        for doc in docs:
            item_id = doc.get("id") or doc.get("_id")
            if item_id and item_id not in seen:
                seen.add(item_id)
                yield item_id
        if len(docs) < page_size:
            break
        page += 1


def iter_ids_from_api(hub_id):
    """Yield item IDs from the DPLA API for tag-based hubs.

    Segments by dataProvider to stay under the ES max_result_window (50K).
    For any provider that itself exceeds the window, further segments by
    sourceResource.date.begin year.
    """
    api_key = os.environ.get("API_KEY", "")
    api_url = os.environ.get("API_URL", "https://api.dp.la")
    tag = TAG_HUBS[hub_id]
    page_size = 500

    # Get total count and dataProvider facets.
    data = _api_get(api_url, api_key, tag, "page_size=1&facets=dataProvider&facet_size=500")
    total = data.get("count", 0)
    print(f"  {hub_id}: {total} total items in API", flush=True)

    facet_entries = data.get("facets", {}).get("dataProvider", {}).get("terms", [])
    providers = [(e["term"], e["count"]) for e in facet_entries if e.get("count", 0) > 0]

    if total <= MAX_API_WINDOW:
        print(f"  {hub_id}: using flat pagination", flush=True)
        providers = [(None, total)]
    else:
        print(f"  {hub_id}: segmenting by {len(providers)} dataProviders", flush=True)
        if not providers:
            providers = [(None, total)]

    seen = set()
    for provider, provider_count in providers:
        if provider is not None:
            provider_param = f"dataProvider={urllib.parse.quote(provider, safe='')}"
            print(f"  {hub_id}: dataProvider={provider!r} ({provider_count} items)", flush=True)
        else:
            provider_param = ""

        if provider_count <= MAX_API_WINDOW:
            yield from _paginate_segment(
                api_url, api_key, tag, provider_param, page_size, seen, provider or "all"
            )
        else:
            # Provider exceeds the ES window (50K). Split by the first hex
            # character of the DPLA item ID (0-9, a-f). IDs are 32-char hex
            # strings with uniform distribution, so each bucket holds ~1/16
            # of the items — well under 50K for any realistic hub.
            print(
                f"  {hub_id}: {provider!r} too large ({provider_count}), "
                f"splitting by ID prefix (hex)",
                flush=True,
            )
            for hex_char in "0123456789abcdef":
                id_prefix_param = f"&q=id:{hex_char}*"
                yield from _paginate_segment(
                    api_url, api_key, tag,
                    f"{provider_param}{id_prefix_param}",
                    page_size, seen,
                    f"{provider}/id:{hex_char}*",
                )


def build_shard(urls, timestamp):
    now = timestamp.strftime("%Y-%m-%dT%H:%M:%SZ")
    entries = "\n".join(
        f"  <url>\n    <loc>{escape(u)}</loc>\n    <lastmod>{now}</lastmod>\n  </url>"
        for u in urls
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{entries}\n"
        "</urlset>"
    )


def build_index(shard_keys, timestamp):
    now = timestamp.strftime("%Y-%m-%dT%H:%M:%SZ")
    entries = "\n".join(
        f"  <sitemap>\n"
        f"    <loc>https://{SITEMAP_BUCKET}/{key}</loc>\n"
        f"    <lastmod>{now}</lastmod>\n"
        f"  </sitemap>"
        for key in shard_keys
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{entries}\n"
        "</sitemapindex>"
    )


def upload_shard(s3_client, key, xml, dry_run, shard_urls):
    if dry_run:
        print(f"\n--- {key} (first 3 URLs) ---")
        for url in shard_urls[:3]:
            print(f"  {url}")
        print(f"  ... ({len(shard_urls)} total)")
    else:
        compressed = gzip.compress(xml.encode("utf-8"))
        s3_client.put_object(
            Bucket=SITEMAP_BUCKET,
            Key=key,
            Body=compressed,
            ContentType="application/xml",
            ContentEncoding="gzip",
        )
        print(f"  uploaded s3://{SITEMAP_BUCKET}/{key}")


def generate_hub(hub_id, s3_client, dry_run, timestamp):
    print(f"  {hub_id}: collecting IDs...", flush=True)
    if hub_id in PROVIDER_HUBS:
        id_iter = iter_ids_from_s3(s3_client, hub_id)
    elif hub_id in S3_TAG_HUBS:
        id_iter = iter_ids_from_s3_by_tag(s3_client, S3_TAG_HUBS[hub_id])
    else:
        id_iter = iter_ids_from_api(hub_id)

    ts_str = timestamp.strftime("%Y%m%d-%H%M%S")
    shard_keys = []
    shard_buf = []
    total = 0
    n = 0

    for item_id in id_iter:
        shard_buf.append(f"{ITEM_BASE}/{item_id}")
        total += 1
        if len(shard_buf) == SHARD_SIZE:
            n += 1
            key = f"sitemap/{hub_id}/{ts_str}/all_item_urls_{n}.xml.gz"
            shard_keys.append(key)
            upload_shard(s3_client, key, build_shard(shard_buf, timestamp), dry_run, shard_buf)
            shard_buf = []

    if shard_buf:
        n += 1
        key = f"sitemap/{hub_id}/{ts_str}/all_item_urls_{n}.xml.gz"
        shard_keys.append(key)
        upload_shard(s3_client, key, build_shard(shard_buf, timestamp), dry_run, shard_buf)

    print(f"  {hub_id}: {total} IDs", flush=True)
    if not shard_keys:
        raise RuntimeError(f"{hub_id}: no IDs found — source data may be missing or empty")

    index_xml = build_index(shard_keys, timestamp)
    index_key = f"sitemap/{hub_id}/all_item_urls.xml"

    if dry_run:
        print(f"\n--- {index_key} ---")
        print(index_xml)
    else:
        s3_client.put_object(
            Bucket=SITEMAP_BUCKET,
            Key=index_key,
            Body=index_xml.encode("utf-8"),
            ContentType="application/xml",
        )
        print(f"  uploaded s3://{SITEMAP_BUCKET}/{index_key}")


def main():
    parser = argparse.ArgumentParser(description="Generate per-hub DPLA item sitemaps")
    parser.add_argument("--hub", help="Generate only for this hub (default: all)")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print to stdout instead of uploading to S3",
    )
    args = parser.parse_args()

    hubs = [args.hub] if args.hub else ALL_HUBS
    unknown = [h for h in hubs if h not in ALL_HUBS]
    if unknown:
        print(f"Unknown hub(s): {', '.join(unknown)}", file=sys.stderr)
        print(f"Valid hubs: {', '.join(ALL_HUBS)}", file=sys.stderr)
        sys.exit(1)

    # Always create s3_client — provider hubs need S3 read access even in dry-run.
    s3_client = boto3.client("s3")
    timestamp = datetime.now(timezone.utc)

    print(f"generate-hub-sitemaps: {'dry-run ' if args.dry_run else ''}generating for: {', '.join(hubs)}")
    for hub_id in hubs:
        generate_hub(hub_id, s3_client, args.dry_run, timestamp)

    print("generate-hub-sitemaps: done")


if __name__ == "__main__":
    main()
