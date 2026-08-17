// Shared, client-safe transcription constants — no AWS imports, so this is safe to
// import from both the API route and (later) client components.
// See docs/transcribe/transcription-storage.md.

// Statuses a user can set on a unit. `not_started` is implicit — the absence of a
// stored record for that unit.
export const TRANSCRIPT_STATUSES = [
  "in_progress",
  "complete",
  "nothing_to_transcribe",
  "illegible",
];

// Well under DynamoDB's 400 KB item limit.
export const MAX_TRANSCRIPT_TEXT_CHARS = 100000;
export const MAX_CANVAS_ID_CHARS = 2048;
