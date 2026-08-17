// Pure helpers for the transcription unit sort key — no I/O, no AWS import, so this is
// unit-testable and safe to import anywhere. In v1 the only unit is a whole IIIF canvas;
// the key is namespaced (`canvas#...`) so region/timed units can slot in later.
// See docs/transcribe/transcription-storage.md.

export const CANVAS_UNIT_PREFIX = "canvas#";

// Sort key for a whole-canvas transcript. The canvas @id is percent-encoded so the "#"
// delimiter stays unambiguous even when the id itself contains "#" or "/".
export function canvasUnitKey(canvasId) {
  return `${CANVAS_UNIT_PREFIX}${encodeURIComponent(canvasId)}`;
}

// Inverse of canvasUnitKey: recover the canvas @id from a unit key, or null if the key
// is not a canvas unit / is malformed.
export function canvasIdFromUnitKey(unitKey) {
  if (typeof unitKey !== "string" || !unitKey.startsWith(CANVAS_UNIT_PREFIX)) {
    return null;
  }
  try {
    return decodeURIComponent(unitKey.slice(CANVAS_UNIT_PREFIX.length));
  } catch {
    return null;
  }
}
