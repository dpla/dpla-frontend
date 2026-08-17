import { test } from "node:test";
import assert from "node:assert/strict";

import { canvasUnitKey, CANVAS_UNIT_PREFIX } from "./transcriptUnitKey.js";

test("canvasUnitKey is prefixed and deterministic", () => {
  const a = canvasUnitKey("https://example.org/iiif/abc/canvas/1");
  const b = canvasUnitKey("https://example.org/iiif/abc/canvas/1");
  assert.equal(a, b);
  assert.ok(a.startsWith(CANVAS_UNIT_PREFIX));
  assert.equal(a.length, CANVAS_UNIT_PREFIX.length + 64); // "canvas#" + sha256 hex
});

test("distinct canvas ids yield distinct keys", () => {
  assert.notEqual(canvasUnitKey("a"), canvasUnitKey("b"));
});

test("key stays well under DynamoDB's 1024-byte sort-key limit even for very long ids", () => {
  const longId = "https://example.org/iiif/" + "x".repeat(5000) + "/canvas/1";
  assert.ok(Buffer.byteLength(canvasUnitKey(longId), "utf8") < 1024);
});
