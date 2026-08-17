// Backfill / repair the item-level rollup rows in the transcribe-transcripts table.
//
// Recomputes each item's per-status counters from its authoritative unit rows and
// overwrites its rollup row (SK = "#item"). Idempotent — safe to re-run — because it
// derives everything from the unit rows, so it doubles as a repair tool if an
// incremental rollup update was ever lost mid-write.
//
// Principal & permissions: run as an operator, locally, via the AWS CLI's default
// profile — NOT the ECS task role. It needs dynamodb:Scan + PutItem on the table; the
// task role deliberately does not get Scan (the app only Query/Get/Put/Update), so the
// backfill's broad read stays out of the runtime least-privilege policy.
//
// Run with writes quiesced: it recomputes from a point-in-time scan and overwrites each
// rollup unconditionally, so a transcript write landing mid-run could be overwritten
// with a slightly stale count. It is idempotent, so the remedy is simply to re-run it
// once writes are idle — no fencing / change-replay needed for this coordinated
// maintenance task on a low-traffic alpha table.
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
    { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  );
  return out.trim() ? JSON.parse(out) : {};
}

// Scan the table one page at a time and group unit rows by item as we go, so we never
// hold more than a single ~1 MB page in memory. `--no-paginate` is required: without it
// the AWS CLI auto-paginates and returns the entire table in one response (which can
// blow the maxBuffer and makes the LastEvaluatedKey loop dead code). Rollup rows are
// skipped — only transcribable unit rows feed the counts.
const byItem = new Map();
let scanned = 0;
let startKey = null;
do {
  const args = ["dynamodb", "scan", "--table-name", TABLE, "--no-paginate"];
  if (startKey) args.push("--exclusive-start-key", JSON.stringify(startKey));
  const page = aws(args);
  for (const row of page.Items || []) {
    scanned += 1;
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
  startKey = page.LastEvaluatedKey || null;
} while (startKey);

// Overwrite each item's rollup row from the recomputed counts.
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
  `Backfilled ${written} item rollup row(s) from ${scanned} scanned row(s) in ${TABLE}.`,
);
