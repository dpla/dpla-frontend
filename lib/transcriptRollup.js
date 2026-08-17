// Pure helpers for the item-level status rollup. No I/O and no build-time path
// aliases, so this stays unit-testable under `node --test`. The I/O that reads/writes
// the rollup row lives in ./transcriptStore. See docs/transcribe/transcription-storage.md.

// Reserved sort key for an item's rollup row — one per item, sitting alongside that
// item's unit rows under the same partition key. "#" sorts before the "canvas#"/"av#"/
// "pdf#" unit prefixes and can't be produced by a hashed unit key, so it never collides.
export const ITEM_ROLLUP_SORT_KEY = "#item";

// `record_type` value marking a rollup row (vs a transcribable unit row).
export const ITEM_ROLLUP_RECORD_TYPE = "item_rollup";

// The rollup attribute that counts how many of an item's units are currently in a
// given status, e.g. "n_complete". Per-status counters let a single unit write adjust
// the rollup by an atomic delta, without re-reading all of the item's units.
export function statusCountAttr(status) {
  return `n_${status}`;
}

// The item's status set: the distinct statuses it currently has at least one unit in.
// `counters` is a { status: count } object; its key order is preserved, so pass it in
// the canonical enum order for a stable result.
export function deriveStatusSet(counters) {
  return Object.entries(counters)
    .filter(([, count]) => count > 0)
    .map(([status]) => status);
}

// The counter deltas a single unit write causes, as { status: delta }. Moving a unit
// from one status to another decrements the old and increments the new; a brand-new
// unit only increments; re-saving the same status changes no counters (an empty delta).
export function rollupDelta(previousStatus, newStatus) {
  if (previousStatus === newStatus) return {};
  const delta = { [newStatus]: 1 };
  if (previousStatus) delta[previousStatus] = -1;
  return delta;
}
