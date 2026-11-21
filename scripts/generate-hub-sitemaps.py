#!/usr/bin/env python3
"""
Generate per-hub item sitemaps for DPLA local hub subdomains.

Each hub reads the latest snapshot from s3://dpla-master-dataset/<hub>/jsonl/
and extracts the DPLA item ID from each record's _source.id field.

Tag-based hubs (aviation, bws) need ES access, so ingestion3's post_indexer.py
builds them on the ingest EC2.

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
import sys
from datetime import datetime, timezone
from xml.sax.saxutils import escape

import boto3

ITEM_BASE = "https://dp.la/item"
SOURCE_BUCKET = "dpla-master-dataset"
SITEMAP_BUCKET = "sitemaps.dp.la"
SHARD_SIZE = 50_000

# hub_id → S3 prefix under dpla-master-dataset
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

ALL_HUBS = list(PROVIDER_HUBS)


def iter_ids_from_s3(s3_client, hub_id):
    """Yield item IDs from S3 JSONL files for a hub.

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
    print(f"  {hub_id}: collecting IDs from S3…", flush=True)
    id_iter = iter_ids_from_s3(s3_client, hub_id)

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
            upload_shard(
                s3_client,
                key,
                build_shard(shard_buf, timestamp),
                dry_run,
                shard_buf,
            )
            shard_buf = []

    if shard_buf:
        n += 1
        key = f"sitemap/{hub_id}/{ts_str}/all_item_urls_{n}.xml.gz"
        shard_keys.append(key)
        upload_shard(
            s3_client, key, build_shard(shard_buf, timestamp), dry_run, shard_buf
        )

    print(f"  {hub_id}: {total} IDs", flush=True)
    if not shard_keys:
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
