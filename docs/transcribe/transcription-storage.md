# Transcription storage — data model & API contract (v1)

Durable, cross-session storage for crowdsourced transcriptions on the Transcribe
local. This is the "real heart" of the project: the first publicly-writable,
persistent capability. This document is the **contract** the save/load API and UI
are built against — review it before the implementation lands.

## Scope (v1)

In: persist and load a **per-canvas** transcript (text) + a **status** for items in
the Transcribe local, keyed so the correct page always carries the correct text.

Out (deferred — see bottom): the transcription UI itself (separate PR), accounts /
attribution, version history, drafts/autosave, drift detection, moderation,
indexing transcripts into ES, and export back to providers.

## Why DynamoDB

Many small, independently-mutable records, written **concurrently** by different
users to **distinct keys**, that must be **durable** (they're the product, not a
cache) and read by key ("all pages for this item"). That is a transactional
key-value record store, not a blob — a JSON/CSV file on S3 would clobber concurrent
writers. (See the DynamoDB-vs-S3 reasoning discussed for this project.)

## Data model

**Table:** `transcribe-transcripts` — on-demand billing (`PAY_PER_REQUEST`), region
`us-east-1`.

| Key | Attribute | Type | Notes |
|-----|-----------|------|-------|
| **PK** | `dpla_item_id` | S | The 32-hex DPLA item id |
| **SK** | `canvas_id` | S | The IIIF canvas `@id` (the per-asset key) |
| | `transcript_text` | S | Verbatim text; rendered as **text** in the UI (no HTML) |
| | `status` | S | enum below |
| | `updated_at` | S | ISO-8601 UTC |
| | `schema_version` | N | `1` — lets the record shape evolve |

**Status enum:** `in_progress | complete | nothing_to_transcribe | illegible`.
`not_started` is **implicit** — it's simply the absence of a record for that canvas
(a `GET` returns nothing for it, and the UI shows "not started").

**Keying / correctness:** the SK is the IIIF **canvas `@id`** the viewer already
parses (`parseIiifManifest` returns `canvas.id`). Keying on the stable canvas URI —
not a page index — keeps the right text attached to the right page even if the
provider reorders pages. Content-hash / perceptual-hash drift detection and a
save-time derivative are a **later hardening** (deferred), not part of v1.

## API contract

Two same-origin Next API routes on the Transcribe app (behind the alpha header
gate). The app authenticates to DynamoDB via the **ECS task role** — no keys in the
app or the browser.

### `GET /api/transcript/{itemId}` — hydrate an item on open
Query DynamoDB by `PK = itemId`, return every canvas that has a record:
```json
{
  "itemId": "0123…",
  "transcripts": {
    "https://provider/iiif/x/canvas/1": { "text": "…", "status": "complete",    "updatedAt": "2026-…" },
    "https://provider/iiif/x/canvas/2": { "text": "…", "status": "in_progress", "updatedAt": "2026-…" }
  }
}
```

### `PUT /api/transcript/{itemId}` — save one canvas
Body: `{ "canvasId": "https://…/canvas/2", "text": "…", "status": "in_progress" }`
→ upserts one item, returns `{ "canvasId": "…", "status": "…", "updatedAt": "…" }`.
(`canvasId` is a URI with slashes, so it travels in the **body**, not the path.)

## Write-path guards (v1)

Enforced server-side in the `PUT` handler:
- `itemId` matches the DPLA id regex; else 404.
- `canvasId` is a non-empty string ≤ 2048 chars; else 400.
- `status` ∈ the enum; else 400.
- `text` ≤ 100 000 chars (well under DynamoDB's 400 KB item limit); else 413.
- Text is stored **verbatim** and rendered as text in the UI, so there's no HTML/JS
  injection surface (no server-side HTML sanitization needed as long as the UI never
  renders it as HTML).

**Rate limiting is deferred** — the alpha is header-gated, so abuse exposure is low.
A per-IP / token limiter is required **before any public exposure** (see deferred).

## AWS resources this PR provisions

1. DynamoDB table `transcribe-transcripts` (keys above, on-demand).
2. An IAM policy on the ECS task role (`ecs-tasks-execution-role`) granting
   `dynamodb:GetItem`, `PutItem`, and `Query` scoped to that table's ARN.
3. Task-def env: `TRANSCRIBE_TABLE_NAME=transcribe-transcripts`.

## Deferred / follow-up (tracked on the PR, not the issue tracker)

Rate limiting + abuse controls; an "experimental — data may be wiped" UI notice;
account/attribution; version history; drafts/autosave; canvas drift detection
(content + perceptual hash) and bounded save-time derivative preservation;
moderation; indexing transcripts into ES; export back to providers.
