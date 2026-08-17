// Helpers for the transcription unit sort key. In v1 the only unit is a whole IIIF
// canvas; the key is namespaced (`canvas#...`) so region/timed units can slot in later.
// See docs/transcribe/transcription-storage.md.

import crypto from "node:crypto";

export const CANVAS_UNIT_PREFIX = "canvas#";

// Sort key for a whole-canvas transcript. The canvas @id is hashed (SHA-256) into a
// fixed-length key so the sort key never exceeds DynamoDB's 1024-byte limit no matter
// how long the id is. The raw @id is stored separately as a `canvas_id` attribute for
// retrieval. `begins_with("canvas#")` still groups a page's units because the hash is
// deterministic per id.
export function canvasUnitKey(canvasId) {
  const digest = crypto.createHash("sha256").update(canvasId, "utf8").digest("hex");
  return `${CANVAS_UNIT_PREFIX}${digest}`;
}
