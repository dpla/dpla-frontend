#!/usr/bin/env python3
"""
Generate per-hub item sitemaps for DPLA local hub subdomains.

Provider-based hubs read JSONL records from s3://dpla-master-dataset/<hub>/jsonl/
and extract the `id` field.

Tag-based hubs (aviation, nwdh, texas) paginate the DPLA API using a tag filter.

Sitemaps are written (gzip-compressed, ≤50,000 URLs/shard) to:
  s3://sitemaps.dp.la/sitemap/<hub>/all_item_urls_N.xml.gz

A sitemap index is written to:
  s3://sitemaps.dp.la/sitemap/<hub>/all_item_urls.xml

Run:
  python3 scripts/generate-hub-sitemaps.py [--hub HUB] [--dry-run]

  --hub HUB   Generate only for this hub (default: all hubs)
  --dry-run   Print generated XML to stdout instead of uploading to S3
"""

import argparse
import gzip
import json
import os
import sys
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
}

# Tag-based hubs: hub_id → tag value for DPLA API
TAG_HUBS = {
    "aviation": "aviation",
    "nwdh": "nwdh",
    "texas": "texas",
}

ALL_HUBS = list(PROVIDER_HUBS) + list(TAG_HUBS)


def iter_ids_from_s3(s3_client, hub_id):
    """Yield item IDs from S3 JSONL files for provider-based hubs."""
    prefix = PROVIDER_HUBS[hub_id]
    paginator = s3_client.get_paginator("list_objects_v2")
    pages = paginator.paginate(Bucket=SOURCE_BUCKET, Prefix=f"{prefix}/jsonl/")
    for page in pages:
        for obj in page.get("Contents", []):
            key = obj["Key"]
            if not key.endswith(".jsonl"):
                continue
            response = s3_client.get_object(Bucket=SOURCE_BUCKET, Key=key)
            for line in response["Body"].iter_lines():
                if not line:
                    continue
                try:
                    record = json.loads(line)
                    item_id = record.get("id") or record.get("_id")
                    if item_id:
                        yield item_id
                except json.JSONDecodeError:
                    pass


def iter_ids_from_api(hub_id):
    """Yield item IDs from the DPLA API for tag-based hubs."""
    api_key = os.environ.get("API_KEY", "")
    api_url = os.environ.get("API_URL", "https://api.dp.la")
    tag = TAG_HUBS[hub_id]
    page = 1
    page_size = 500
    while True:
        url = (
            f"{api_url}/v2/items"
            f"?api_key={api_key}"
            f"&tags={tag}"
            f"&page={page}"
            f"&page_size={page_size}"
            f"&fields=id"
        )
        req = urllib.request.Request(url, headers={"Accept": "application/json"})  # noqa: S310
        with urllib.request.urlopen(req, timeout=30) as resp:  # noqa: S310
            data = json.loads(resp.read())
        docs = data.get("docs", [])
        if not docs:
            break
        for doc in docs:
            item_id = doc.get("id") or doc.get("_id")
            if item_id:
                yield item_id
        if len(docs) < page_size:
            break
        page += 1


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
        print(f"  {hub_id}: no IDs found, skipping", file=sys.stderr)
        return

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
