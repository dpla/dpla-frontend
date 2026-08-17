import { test } from "node:test";
import assert from "node:assert/strict";

import {
  canvasUnitKey,
  canvasIdFromUnitKey,
  CANVAS_UNIT_PREFIX,
} from "./transcriptUnitKey.js";

test("canvasUnitKey encodes the canvas id under the canvas# prefix", () => {
  const key = canvasUnitKey("https://example.org/iiif/abc/canvas/1");
  assert.ok(key.startsWith(CANVAS_UNIT_PREFIX));
  // "/" is encoded so the structural "#" delimiter stays unambiguous
  assert.ok(!key.slice(CANVAS_UNIT_PREFIX.length).includes("/"));
});

test("round-trips a canvas id, including ones containing # and /", () => {
  for (const id of [
    "https://example.org/iiif/abc/canvas/1",
    "https://example.org/canvas#xywh=0,0,100,100",
    "urn:foo:bar",
  ]) {
    assert.equal(canvasIdFromUnitKey(canvasUnitKey(id)), id);
  }
});

test("canvasIdFromUnitKey returns null for non-canvas or invalid keys", () => {
  assert.equal(canvasIdFromUnitKey("av#asset#000012345"), null);
  assert.equal(canvasIdFromUnitKey(""), null);
  assert.equal(canvasIdFromUnitKey(null), null);
  assert.equal(canvasIdFromUnitKey(undefined), null);
});
