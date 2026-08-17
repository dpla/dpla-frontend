// DynamoDB data-access for transcription units. Each row is one transcribable unit:
// PK = dpla_item_id, SK = unit_key (v1: canvas#{sha256 of canvasId}); the raw canvas @id
// is kept in the canvas_id attribute. Non-key attributes are schemaless, so timed/region
// units slot in later without migration. Uses the dependency-free SigV4 client in
// ./dynamodbClient. See docs/transcribe/transcription-storage.md.

import { dynamoRequest } from "./dynamodbClient";
import { canvasUnitKey } from "./transcriptUnitKey";

const SCHEMA_VERSION = 1;

function tableName() {
  const name = process.env.TRANSCRIBE_TABLE_NAME;
  if (!name) throw new Error("TRANSCRIBE_TABLE_NAME is not set");
  return name;
}

// All transcription units for an item, as a list (see the GET contract). Follows
// DynamoDB pagination (LastEvaluatedKey) so a large result set isn't truncated at the
// 1 MB per-Query limit.
export async function getTranscriptsForItem(itemId) {
  const units = [];
  let exclusiveStartKey;
  do {
    const out = await dynamoRequest("Query", {
      TableName: tableName(),
      KeyConditionExpression: "dpla_item_id = :id",
      ExpressionAttributeValues: { ":id": { S: itemId } },
      ...(exclusiveStartKey ? { ExclusiveStartKey: exclusiveStartKey } : {}),
    });
    for (const item of out.Items || []) {
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
  return units;
}

// Upsert one canvas unit's transcript + status. Returns the stored key/status/time.
export async function putCanvasTranscript({ itemId, canvasId, text, status }) {
  const unitKey = canvasUnitKey(canvasId);
  const updatedAt = new Date().toISOString();
  await dynamoRequest("PutItem", {
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
  });
  return { unitKey, canvasId, status, updatedAt };
}
