#!/usr/bin/env python3
"""
Generate per-hub item sitemaps for DPLA local hub subdomains.

Provider-based hubs read the latest snapshot from s3://dpla-master-dataset/<hub>/jsonl/
and extract the DPLA item ID from each record's _source.id field.

Tag-based hubs (aviation, bws) paginate the DPLA API using a tag filter.

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
import urllib.error
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

# Tag-based hubs: hub_id → tag value for DPLA API
TAG_HUBS = {
    "aviation": "aviation",
    "bws": "blackwomensuffrage",
}

ALL_HUBS = list(PROVIDER_HUBS) + list(TAG_HUBS)


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
    # Paginate to handle hubs with more than 1000 snapshot dirs.
    snapshot_paginator = s3_client.get_paginator("list_objects_v2")
    snapshot_pages = snapshot_paginator.paginate(
        Bucket=SOURCE_BUCKET, Prefix=base_prefix, Delimiter="/"
    )
    snapshots = sorted(
        cp["Prefix"]
        for page in snapshot_pages
        for cp in page.get("CommonPrefixes", [])
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
            text = (
                gzip.decompress(raw).decode("utf-8") if is_gz else raw.decode("utf-8")
            )

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
                    print(
                        f"  Warning: malformed JSONL in {key} line {line_no}: {exc}",
                        file=sys.stderr,
                    )


API_CALL_DELAY = 1.0  # seconds between API calls to respect rate limits


class RateLimitError(Exception):
    """Raised when the DPLA API returns 403 or 429 (rate limit exhausted)."""


def _redact_url(url):
    """Strip the api_key query parameter from a URL before logging."""
    parsed = urllib.parse.urlparse(url)
    params = urllib.parse.parse_qs(parsed.query, keep_blank_values=True)
    params.pop("api_key", None)
    return urllib.parse.urlunparse(parsed._replace(query=urllib.parse.urlencode(params, doseq=True)))


def _api_get(api_url, api_key, tag, extra_params, timeout=30, retries=5):
    """Make a single DPLA API request and return parsed JSON, with retries.

    Raises RateLimitError on HTTP 403 or HTTP 429.
    """
    params = {"api_key": api_key, "tags": tag}
    params.update(extra_params)
    query = urllib.parse.urlencode(params, quote_via=urllib.parse.quote)
    url = f"{api_url}/v2/items?{query}"
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    last_exc = None
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = json.loads(resp.read())
            time.sleep(API_CALL_DELAY)
            return data
        except urllib.error.HTTPError as exc:
            if exc.code == 403:
                raise RateLimitError(
                    f"API rate limit reached (HTTP 403): {_redact_url(exc.url)}"
                ) from exc
            if exc.code == 429:
                last_exc = exc
                retry_after = exc.headers.get("Retry-After") if exc.headers else None
                backoff = 30 * (attempt + 1)
                try:
                    header_secs = int(retry_after) if retry_after else None
                except (ValueError, TypeError):
                    header_secs = None
                if header_secs is not None:
                    wait = max(header_secs, backoff)
                    wait_method = f"Retry-After={header_secs}s, backoff={backoff}s → {wait}s"
                else:
                    wait = backoff
                    wait_method = f"backoff={wait}s"
                    if retry_after:
                        wait_method += f" (Retry-After header unparseable: {retry_after!r})"
                print(
                    f"  Warning: HTTP 429 rate limit (attempt {attempt + 1}/{retries}), "
                    f"waiting {wait_method}…",
                    file=sys.stderr,
                )
                if attempt < retries - 1:
                    time.sleep(wait)
                continue
            if exc.code in (500, 502, 503, 504):
                last_exc = exc
                if attempt < retries - 1:
                    time.sleep(5 * (attempt + 1))
                continue
            raise
        except urllib.error.URLError as exc:
            last_exc = exc
            print(
                f"  Warning: network error (attempt {attempt + 1}/{retries}): {exc.reason}",
                file=sys.stderr,
            )
            if attempt < retries - 1:
                time.sleep(5 * (attempt + 1))
            continue
    if last_exc is not None and getattr(last_exc, "code", None) == 429:
        raise RateLimitError(
            f"API rate limit reached (HTTP 429) after {retries} retries: {_redact_url(last_exc.url)}"
        ) from last_exc
    if last_exc is not None:
        raise last_exc  # retries exhausted on transient server error
    raise RuntimeError("retries exhausted without a captured exception")


MAX_API_WINDOW = 49_800  # ES max_result_window is 50K; stay safely under it


def _paginate_segment(api_url, api_key, tag, extra_base, page_size, seen, label):
    """Paginate a single (provider [+ date]) segment, yielding unseen IDs."""
    max_pages = MAX_API_WINDOW // page_size
    page = 1
    while True:
        extra = {"page": page, "page_size": page_size, "fields": "id"}
        extra.update(extra_base)
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
        if page >= max_pages:
            print(
                f"  Warning: {label}: reached ES window limit at page {page} — "
                f"segment may be incomplete; consider finer segmentation",
                file=sys.stderr,
            )
            break
        page += 1


def iter_ids_from_api(hub_id):
    """Yield item IDs from the DPLA API for tag-based hubs.

    Segments by dataProvider to stay under the ES max_result_window (50K).
    For any provider that itself exceeds the window, further segments by
    sourceResource.date.begin year.
    """
    api_key = os.environ.get("API_KEY", "")
    if not api_key:
        print(
            "  Warning: API_KEY environment variable is not set",
            file=sys.stderr,
        )
    api_url = os.environ.get("API_URL", "https://api.dp.la")
    tag = TAG_HUBS[hub_id]
    page_size = 500

    # Get total count and dataProvider facets.
    data = _api_get(
        api_url,
        api_key,
        tag,
        {"page_size": 1, "facets": "dataProvider", "facet_size": 500},
    )
    total = data.get("count", 0)
    print(f"  {hub_id}: {total} total items in API", flush=True)

    facet_entries = data.get("facets", {}).get("dataProvider", {}).get("terms", [])
    providers = [
        (e["term"], e["count"]) for e in facet_entries if e.get("count", 0) > 0
    ]

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
            # Quote as a phrase to avoid query-parser errors on punctuation
            # (e.g., slash in provider names).
            quoted_provider = '"' + provider.replace("\\", "\\\\").replace("/", "\\/").replace('"', '\\"') + '"'
            provider_param = {"dataProvider": quoted_provider}
            print(
                f"  {hub_id}: dataProvider={provider!r} ({provider_count} items)",
                flush=True,
            )
        else:
            provider_param = {}

        if provider_count <= MAX_API_WINDOW:
            yield from _paginate_segment(
                api_url,
                api_key,
                tag,
                provider_param,
                page_size,
                seen,
                provider or "all",
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
                segment_params = dict(provider_param)
                segment_params["q"] = f"id:{hex_char}*"
                yield from _paginate_segment(
                    api_url,
                    api_key,
                    tag,
                    segment_params,
                    page_size,
                    seen,
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


def generate_hub(hub_id, dry_run, timestamp):
    s3_client = boto3.client("s3")
    print(f"  {hub_id}: collecting IDs...", flush=True)
    if hub_id in PROVIDER_HUBS:
        id_iter = iter_ids_from_s3(s3_client, hub_id)
    else:
        id_iter = iter_ids_from_api(hub_id)

    ts_str = timestamp.strftime("%Y%m%d-%H%M%S")
    shard_keys = []
    shard_buf = []
    total = 0
    n = 0
    rate_limited = False

    try:
        for item_id in id_iter:
            shard_buf.append(f"{ITEM_BASE}/{item_id}")
            total += 1
            if len(shard_buf) == SHARD_SIZE:
                n += 1
                key = f"sitemap/{hub_id}/{ts_str}/all_item_urls_{n}.xml.gz"
                shard_keys.append(key)
                upload_shard(
                    s3_client,
                    key,
                    build_shard(shard_buf, timestamp),
                    dry_run,
                    shard_buf,
                )
                shard_buf = []
    except RateLimitError as exc:
        rate_limited = True
        print(
            f"  WARNING: {hub_id}: API rate limit hit after {total} IDs — uploading partial sitemap",
            flush=True,
        )
        print(f"  {exc}", flush=True)

    if shard_buf:
        n += 1
        key = f"sitemap/{hub_id}/{ts_str}/all_item_urls_{n}.xml.gz"
        shard_keys.append(key)
        upload_shard(
            s3_client, key, build_shard(shard_buf, timestamp), dry_run, shard_buf
        )

    coverage = " (partial — rate limited)" if rate_limited else ""
    print(f"  {hub_id}: {total} IDs{coverage}", flush=True)
    if not shard_keys:
        if rate_limited:
            print(
                f"  WARNING: {hub_id}: rate limited before any IDs collected — no sitemap written",
                flush=True,
            )
            return
        raise RuntimeError(
            f"{hub_id}: no IDs found — source data may be missing or empty"
        )

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

    timestamp = datetime.now(timezone.utc)

    print(
        f"generate-hub-sitemaps: {'dry-run ' if args.dry_run else ''}generating for: {', '.join(hubs)}"
    )
    failed = []
    for hub_id in hubs:
        try:
            generate_hub(hub_id, args.dry_run, timestamp)
        except Exception as exc:
            failed.append(hub_id)
            print(f"  ERROR: {hub_id}: {exc}", file=sys.stderr)

    if failed:
        print(
            f"generate-hub-sitemaps: {len(failed)} hub(s) failed: {', '.join(failed)}",
            file=sys.stderr,
        )
        sys.exit(1)

    print("generate-hub-sitemaps: done")


if __name__ == "__main__":
    main()
