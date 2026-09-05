import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  MAX_TRANSCRIPT_TEXT_BYTES,
  MAX_TRANSCRIPT_REQUEST_BYTES,
  MAX_CANVAS_ID_CHARS,
} from "../constants/transcribe.js";

const routeSource = readFileSync(
  fileURLToPath(new URL("../pages/api/transcript/[itemId].js", import.meta.url)),
  "utf8",
);

// Next statically analyses `export const config`, so the route can't import
// MAX_TRANSCRIPT_REQUEST_BYTES — it repeats the number as a literal. Without this check
// the two can drift apart silently.
test("the transcript route's sizeLimit literal matches MAX_TRANSCRIPT_REQUEST_BYTES", () => {
  const match = routeSource.match(/sizeLimit:\s*(\d+)/);
  assert.ok(match, "no numeric sizeLimit literal found in the transcript route");
  assert.equal(Number(match[1]), MAX_TRANSCRIPT_REQUEST_BYTES);
});

// The whole point of the headroom: a transcript at exactly the text cap must reach the
// handler, so the handler's own byte check decides and returns its documented JSON 413,
// rather than the body parser rejecting it first with an unexplained one. Newlines are
// the worst case for ordinary text — every byte escapes to two on the wire.
test("a newline-heavy transcript at the text cap still fits under the wire limit", () => {
  const text = "\n".repeat(MAX_TRANSCRIPT_TEXT_BYTES);
  assert.equal(Buffer.byteLength(text, "utf8"), MAX_TRANSCRIPT_TEXT_BYTES);

  const body = JSON.stringify({
    canvasId: "https://example.org/".padEnd(MAX_CANVAS_ID_CHARS, "x"),
    text,
    status: "nothing_to_transcribe", // longest value in TRANSCRIPT_STATUSES
  });

  const wireBytes = Buffer.byteLength(body, "utf8");
  assert.ok(
    wireBytes <= MAX_TRANSCRIPT_REQUEST_BYTES,
    `worst-case body is ${wireBytes} bytes, over the ${MAX_TRANSCRIPT_REQUEST_BYTES} limit`,
  );
});

// A transcript one byte over the text cap must still be small enough on the wire to reach
// the handler, so the user gets "text exceeds 380000 bytes" and not a bare parser 413.
test("a transcript just over the text cap still reaches the handler", () => {
  const body = JSON.stringify({
    canvasId: "https://example.org/iiif/canvas/1",
    text: "a".repeat(MAX_TRANSCRIPT_TEXT_BYTES + 1),
    status: "in_progress",
  });
  assert.ok(Buffer.byteLength(body, "utf8") <= MAX_TRANSCRIPT_REQUEST_BYTES);
});

// Documents a known, deliberate boundary rather than a bug. Control characters JSON-escape
// to \u00XX (six bytes each), so text made largely of them exceeds the wire ceiling and is
// refused by the parser with a generic 413 instead of the handler's specific one. Covering
// it would need a ~2.3MB ceiling — roughly triple the peak per-request memory on a route
// with no rate limiting — for input that is not plausible transcription text. If this test
// ever fails, the multiplier changed: re-read the "Known boundary" note in
// docs/transcribe/transcription-storage.md and make sure the change was intended.
test("control-character text exceeds the wire limit (known, documented boundary)", () => {
  const body = JSON.stringify({
    canvasId: "https://example.org/iiif/canvas/1",
    text: "\0".repeat(MAX_TRANSCRIPT_TEXT_BYTES),
    status: "in_progress",
  });
  assert.ok(Buffer.byteLength(body, "utf8") > MAX_TRANSCRIPT_REQUEST_BYTES);
});
