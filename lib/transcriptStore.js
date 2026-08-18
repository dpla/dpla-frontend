// DynamoDB data-access for transcription units. Each row is one transcribable unit:
// PK = dpla_item_id, SK = unit_key (v1: canvas#{sha256 of canvasId}); the raw canvas @id
// is kept in the canvas_id attribute. Alongside an item's unit rows sits one **rollup
// row** (SK = ITEM_ROLLUP_SORT_KEY) holding per-status counters, so the item's overall
// status set is a single read and can drive an item-level status facet later. Non-key
// attributes are schemaless, so timed/region units slot in without migration. Uses the
// dependency-free SigV4 client in ./dynamodbClient. See docs/transcribe/transcription-storage.md.

import { dynamoRequest } from "./dynamodbClient";
import { canvasUnitKey } from "./transcriptUnitKey";
import {
  ITEM_ROLLUP_SORT_KEY,
  ITEM_ROLLUP_RECORD_TYPE,
  statusCountAttr,
  deriveStatusSet,
  rollupDelta,
} from "./transcriptRollup";
import { TRANSCRIPT_STATUSES } from "constants/transcribe";

const SCHEMA_VERSION = 1;

function tableName() {
  const name = process.env.TRANSCRIBE_TABLE_NAME;
  if (!name) throw new Error("TRANSCRIBE_TABLE_NAME is not set");
  return name;
}

// Read { status: count } for every known status (0 when absent), in enum order so
// deriveStatusSet yields a stable ordering.
function countersFromRollup(rollupRow) {
  const counters = {};
  for (const status of TRANSCRIPT_STATUSES) {
    const raw = rollupRow?.[statusCountAttr(status)]?.N;
    counters[status] = raw ? Number(raw) : 0;
  }
  return counters;
}

// All transcription units for an item (list — see the GET contract) plus the item's
// rollup status set. Follows DynamoDB pagination (LastEvaluatedKey) so a large result
// set isn't truncated at the 1 MB per-Query limit. The rollup row is filtered out of
// `units` — it is not a transcribable unit.
export async function getTranscriptsForItem(itemId) {
  const units = [];
  let rollupRow = null;
  let exclusiveStartKey;
  do {
    const out = await dynamoRequest("Query", {
      TableName: tableName(),
      KeyConditionExpression: "dpla_item_id = :id",
      ExpressionAttributeValues: { ":id": { S: itemId } },
      ...(exclusiveStartKey ? { ExclusiveStartKey: exclusiveStartKey } : {}),
    });
    for (const item of out.Items || []) {
      if (item.unit_key?.S === ITEM_ROLLUP_SORT_KEY) {
        rollupRow = item;
        continue;
      }
      units.push({
        unitKey: item.unit_key?.S,
        unitType: item.unit_type?.S,
        canvasId: item.canvas_id?.S ?? null,
        text: item.transcript_text?.S ?? "",
        status: item.status?.S,
        updatedAt: item.updated_at?.S,
      });
    }
    exclusiveStartKey = out.LastEvaluatedKey;
  } while (exclusiveStartKey);
  return { units, itemStatus: deriveStatusSet(countersFromRollup(rollupRow)) };
}

// Upsert one canvas unit's transcript + status, and keep the item rollup counters in
// step. Returns the stored key/status/time plus the item's new status set.
export async function putCanvasTranscript({ itemId, canvasId, text, status }) {
  const unitKey = canvasUnitKey(canvasId);
  const updatedAt = new Date().toISOString();

  // Consistency model — the unit PutItem and the rollup UpdateItem are two separate,
  // NON-transactional writes, deliberately (TransactWriteItems can't return ALL_OLD, so a
  // transaction would force an extra GetItem on every save just to learn the prior
  // status). This is sound for a derived, non-authoritative aggregate:
  //   • Concurrency is safe: DynamoDB serializes single-item PutItems and ALL_OLD returns
  //     the exact value each write replaced, so concurrent same-unit deltas telescope
  //     (−old/+new pairs cancel) and the rollup's atomic ADD composes writes across an
  //     item's different units — the counters stay correct without a lock.
  //   • The only gap is a *dropped* rollup update: if this PutItem lands but the following
  //     UpdateItem fails (crash/throttle), the rollup drifts. That is acceptable because
  //     the unit rows are the source of truth and the rollup is a derived aggregate that
  //     scripts/backfill-transcript-rollups.mjs recomputes/repairs from them at any time.
  // ALL_OLD gives us the status this write replaced, so we adjust the rollup by that delta.
  const putOut = await dynamoRequest("PutItem", {
    TableName: tableName(),
    Item: {
      dpla_item_id: { S: itemId },
      unit_key: { S: unitKey },
      unit_type: { S: "canvas" },
      canvas_id: { S: canvasId },
      transcript_text: { S: text },
      status: { S: status },
      updated_at: { S: updatedAt },
      schema_version: { N: String(SCHEMA_VERSION) },
    },
    ReturnValues: "ALL_OLD",
  });
  const previousStatus = putOut.Attributes?.status?.S ?? null;

  const rollup = await applyRollupDelta({
    itemId,
    previousStatus,
    newStatus: status,
    updatedAt,
  });
  return { unitKey, canvasId, status, updatedAt, itemStatus: deriveStatusSet(rollup) };
}

// Apply a unit's status delta to the item rollup row with atomic ADD (so concurrent
// writes to other units of the same item compose correctly), upserting the row on the
// item's first unit. Returns the new counters.
async function applyRollupDelta({ itemId, previousStatus, newStatus, updatedAt }) {
  const delta = rollupDelta(previousStatus, newStatus);

  const names = { "#u": "updated_at", "#rt": "record_type", "#sv": "schema_version" };
  const values = {
    ":u": { S: updatedAt },
    ":rt": { S: ITEM_ROLLUP_RECORD_TYPE },
    ":sv": { N: String(SCHEMA_VERSION) },
  };
  const addParts = [];
  Object.entries(delta).forEach(([status, amount], i) => {
    const nameKey = `#c${i}`;
    const valueKey = `:d${i}`;
    names[nameKey] = statusCountAttr(status);
    values[valueKey] = { N: String(amount) };
    addParts.push(`${nameKey} ${valueKey}`);
  });

  const updateExpression =
    (addParts.length ? `ADD ${addParts.join(", ")} ` : "") +
    "SET #u = :u, #rt = :rt, #sv = :sv";

  const out = await dynamoRequest("UpdateItem", {
    TableName: tableName(),
    Key: {
      dpla_item_id: { S: itemId },
      unit_key: { S: ITEM_ROLLUP_SORT_KEY },
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values,
    ReturnValues: "ALL_NEW",
  });
  return countersFromRollup(out.Attributes);
}

// --- Status browse (home-page "browse by transcription status" grid) ---
// The alpha table is small, so these Scan the item rollup rows directly. At scale this
// should move to a GSI keyed on status (or a maintained set) — see
// docs/transcribe/transcription-storage.md.

// Every item rollup row (one per touched item).
async function scanRollupRows() {
  const rows = [];
  let exclusiveStartKey;
  do {
    const out = await dynamoRequest("Scan", {
      TableName: tableName(),
      FilterExpression: "unit_key = :sk",
      ExpressionAttributeValues: { ":sk": { S: ITEM_ROLLUP_SORT_KEY } },
      ...(exclusiveStartKey ? { ExclusiveStartKey: exclusiveStartKey } : {}),
    });
    for (const row of out.Items || []) rows.push(row);
    exclusiveStartKey = out.LastEvaluatedKey;
  } while (exclusiveStartKey);
  return rows;
}

// DPLA item ids that currently have at least one unit in `status`.
export async function getItemIdsWithStatus(status) {
  const rows = await scanRollupRows();
  return rows
    .filter((row) => countersFromRollup(row)[status] > 0)
    .map((row) => row.dpla_item_id?.S)
    .filter(Boolean);
}

// Every DPLA item id with any transcription activity — used to exclude touched items
// from the "untranscribed" browse.
export async function getTouchedItemIds() {
  const rows = await scanRollupRows();
  return rows.map((row) => row.dpla_item_id?.S).filter(Boolean);
}
