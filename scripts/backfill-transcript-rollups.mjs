// Backfill / repair the item-level rollup rows in the transcribe-transcripts table.
//
// Recomputes each item's per-status counters from its authoritative unit rows and
// overwrites its rollup row (SK = "#item"). Idempotent — safe to re-run — because it
// derives everything from the unit rows, so it doubles as a repair tool if an
// incremental rollup update was ever lost mid-write.
//
// Uses the AWS CLI (default profile credentials), not the app's SigV4 client, so it can
// run locally. Read-only against unit rows; only writes "#item" rollup rows.
//
//   node scripts/backfill-transcript-rollups.mjs
//
// See docs/transcribe/transcription-storage.md.

import { execFileSync } from "node:child_process";

import {
  ITEM_ROLLUP_SORT_KEY,
  ITEM_ROLLUP_RECORD_TYPE,
  statusCountAttr,
} from "../lib/transcriptRollup.js";

const TABLE = process.env.TRANSCRIBE_TABLE_NAME || "transcribe-transcripts";
const REGION = process.env.AWS_REGION || "us-east-1";
const SCHEMA_VERSION = "1";

// Run an aws CLI command with args passed as an array (no shell — nothing to escape).
function aws(args) {
  const out = execFileSync(
    "aws",
    [...args, "--region", REGION, "--output", "json"],
    { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 },
  );
  return out.trim() ? JSON.parse(out) : {};
}

// 1. Scan every row (paginated).
const rows = [];
let startKey = null;
do {
  const args = ["dynamodb", "scan", "--table-name", TABLE];
  if (startKey) args.push("--exclusive-start-key", JSON.stringify(startKey));
  const page = aws(args);
  rows.push(...(page.Items || []));
  startKey = page.LastEvaluatedKey || null;
} while (startKey);

// 2. Group unit rows by item and count statuses (skip existing rollup rows).
const byItem = new Map();
for (const row of rows) {
  if (row.unit_key?.S === ITEM_ROLLUP_SORT_KEY) continue;
  const itemId = row.dpla_item_id?.S;
  const status = row.status?.S;
  const updatedAt = row.updated_at?.S ?? "";
  if (!itemId || !status) continue;
  if (!byItem.has(itemId)) byItem.set(itemId, { counts: {}, latest: "" });
  const rec = byItem.get(itemId);
  rec.counts[status] = (rec.counts[status] || 0) + 1;
  if (updatedAt > rec.latest) rec.latest = updatedAt;
}

// 3. Overwrite each item's rollup row from the recomputed counts.
let written = 0;
for (const [itemId, { counts, latest }] of byItem) {
  const item = {
    dpla_item_id: { S: itemId },
    unit_key: { S: ITEM_ROLLUP_SORT_KEY },
    record_type: { S: ITEM_ROLLUP_RECORD_TYPE },
    schema_version: { N: SCHEMA_VERSION },
    updated_at: { S: latest || new Date().toISOString() },
  };
  for (const [status, count] of Object.entries(counts)) {
    item[statusCountAttr(status)] = { N: String(count) };
  }
  aws(["dynamodb", "put-item", "--table-name", TABLE, "--item", JSON.stringify(item)]);
  written += 1;
  console.log(`  ${itemId}  ${JSON.stringify(counts)}`);
}

console.log(
  `Backfilled ${written} item rollup row(s) from ${rows.length} scanned row(s) in ${TABLE}.`,
);
