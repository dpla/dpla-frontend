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

// Human-readable labels for the status picker. Keyed by the enum values above.
export const TRANSCRIPT_STATUS_LABELS = {
  in_progress: "In progress",
  complete: "Complete",
  nothing_to_transcribe: "Nothing to transcribe",
  illegible: "Illegible / can't read",
};

// The status a freshly-opened (not-yet-saved) page defaults to in the picker.
export const DEFAULT_TRANSCRIPT_STATUS = "in_progress";

// Max transcript size, measured in UTF-8 *bytes* (not characters) since that is what
// DynamoDB's 400 KB per-item limit counts. Kept below 400 KB to leave headroom for the
// item's other attributes (keys, status, timestamps, canvas_id).
export const MAX_TRANSCRIPT_TEXT_BYTES = 380_000;
export const MAX_CANVAS_ID_CHARS = 2048;
