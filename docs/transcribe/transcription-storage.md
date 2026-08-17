# Transcription storage — data model & API contract (v1)

Durable, cross-session storage for crowdsourced transcriptions on the Transcribe
local. This is the "real heart" of the project: the first publicly-writable,
persistent capability. This document is the **contract** the save/load API and UI
are built against — review it before the implementation lands.

## Scope (v1)

In: persist and load a transcript (text) + a **status** for each **transcribable
unit** of an item, keyed so the correct unit always carries the correct text. In v1
there is exactly **one unit per IIIF canvas** (one whole-page transcript).

Out (deferred — see bottom): the transcription UI itself (separate PR), sub-canvas
units, timed-media segments, accounts / attribution, version history, drafts/autosave,
drift detection, moderation, indexing into ES, and export back to providers.

## Design principle that shapes everything below

In DynamoDB, **only the primary key (PK/SK) is expensive to change later** — every
*non-key attribute* is schemaless and can be added to new records at any time with
**zero migration**. So this contract spends its care on the **key schema** and the
**API response shape** (the two things that are painful to unroll), and treats
everything else (timestamps, region coords, per-segment timing…) as free-to-add.

The consequence: we model each record as **one transcribable *unit*** (not "a canvas's
blob"), with a **hierarchical sort key**, so an asset can later hold many units —
pages, regions, or time segments — with no re-keying. v1 simply populates one unit
per canvas.

## Why DynamoDB

Many small, independently-mutable records, written **concurrently** by different
users to **distinct keys**, that must be **durable** (they're the product, not a
cache) and read by key ("all units for this item"). That is a transactional
key-value record store, not a blob — a JSON/CSV file on S3 would clobber concurrent
writers.

## Data model

**Table:** `transcribe-transcripts` — on-demand billing (`PAY_PER_REQUEST`), region
`us-east-1`.

| Key | Attribute | Type | Notes |
|-----|-----------|------|-------|
| **PK** | `dpla_item_id` | S | The 32-hex DPLA item id. "All transcription for an item" is always a Query-by-PK, for every media type. |
| **SK** | `unit_key` | S | **Hierarchical** unit key (below) — the per-unit address |

**Sort-key (unit) convention** — a namespaced, sortable composite:

| Case | `unit_key` pattern | Status |
|---|---|---|
| **v1 image page** (whole canvas) | `canvas#{sha256(canvasId)}` | **now** |
| Region within a canvas | `canvas#{sha256(canvasId)}#region#{id}` | future |
| Timed audio/video segment | `av#{sha256(assetId)}#{startMs zero-padded}` | future |
| PDF sub-page (single-asset) | `pdf#{sha256(assetId)}#page#{n zero-padded}` | future |

The id is **hashed** into the key so the sort key can never exceed DynamoDB's
**1024-byte** limit regardless of id length, and so a `#` inside a canvas `@id` (IIIF
fragment selectors) can't collide with the structural `#` delimiter. The raw id is kept
in a `canvas_id` attribute for retrieval. `begins_with` still scopes reads to a
canvas/asset (e.g. `begins_with av#{hash}#` returns a clip's segments **in time order**,
because start-ms is zero-padded and the hash is deterministic per id). Adding finer
units later is **just more rows** — the v1 `canvas#…` records never need re-keying.

**Attributes (non-key — all extensible without migration):**

| Attribute | Type | v1 | Notes |
|---|---|---|---|
| `unit_type` | S | `canvas` | `av_segment` \| `pdf_page` \| `region` … later |
| `canvas_id` | S | ✓ | raw canvas `@id` (the SK is a hash of it) |
| `transcript_text` | S | ✓ | verbatim; rendered as **text** in the UI (no HTML) |
| `status` | S | ✓ | enum below |
| `updated_at` | S | ✓ | ISO-8601 UTC |
| `schema_version` | N | `1` | |
| `start_ms` / `end_ms` | N | — | timed media (added when we build it — free) |
| `region` (xywh) | S | — | IIIF region selector for sub-canvas units (later) |

**Status enum:** `in_progress | complete | nothing_to_transcribe | illegible`.
`not_started` is **implicit** — the absence of a record for that unit.

## API contract

Two same-origin Next API routes on the Transcribe app (behind the alpha header gate).
The app authenticates to DynamoDB via the **ECS task role** — no keys in the app or
the browser.

### `GET /api/transcript/{itemId}` — hydrate an item on open
Query by `PK = itemId` (paginating `LastEvaluatedKey` so items with many units aren't
truncated at DynamoDB's 1 MB per-Query limit); return a **list of unit records** (not a
map keyed by canvas) so it can represent many units per asset without a breaking change
later:
```json
{
  "itemId": "0123…",
  "units": [
    { "unitKey": "canvas#3b1f…", "unitType": "canvas",
      "canvasId": "https://…/canvas/1", "text": "…", "status": "complete",    "updatedAt": "2026-…" },
    { "unitKey": "canvas#9a04…", "unitType": "canvas",
      "canvasId": "https://…/canvas/2", "text": "…", "status": "in_progress", "updatedAt": "2026-…" }
  ]
}
```
(Future timed/region units appear in the same list with `startMs`/`endMs` or `region`
fields — additive only.)

### `PUT /api/transcript/{itemId}` — save one unit
v1 body: `{ "canvasId": "https://…/canvas/2", "text": "…", "status": "in_progress" }`
→ server derives `unit_key = canvas#{sha256 of canvasId}`, stores the raw id in
`canvas_id`, sets `unit_type = canvas`, upserts one item, and returns
`{ "unitKey": "…", "canvasId": "…", "status": "…", "updatedAt": "…" }`. Later the
body gains optional `unitType` / `startMs` / `endMs` / `page` fields to address finer
units — additive, non-breaking.

## How future media types map on (no migration, no breaking change)

- **Timed audio/video:** N segment-units per asset, each `unit_key = av#{asset}#{startMs}`
  with `start_ms`/`end_ms`/`text`/`status`. `begins_with av#{asset}#` returns them in
  time order — exactly what WebVTT/caption export needs. Just new rows + attributes.
- **PDF sub-pages / regions:** N unit-records per asset (`pdf#…#page#…`,
  `canvas#…#region#…`), region geometry (`xywh`) as an attribute. One asset, many units.
- **Per-unit vs asset-level status:** each unit carries its own `status`; an
  asset-level "done" rollup can be computed or stored under a reserved unit_key later.

## Write-path guards (v1)

Enforced server-side in the `PUT` handler:
- `itemId` matches the DPLA id regex; else 404.
- `canvasId` non-empty string ≤ 2048 chars; else 400.
- `status` ∈ the enum; else 400.
- `text` ≤ 380 000 **UTF-8 bytes** (`Buffer.byteLength`, not char count — headroom under DynamoDB's 400 KB item limit); else 413.
- Text stored **verbatim** and rendered as text in the UI → no HTML/JS injection surface.

**Rate limiting is deferred** — the alpha is header-gated, so abuse exposure is low.
A per-IP / token limiter is required **before any public exposure**.

## AWS resources this PR provisions

1. DynamoDB table `transcribe-transcripts` (keys above, on-demand).
2. An IAM policy on the ECS task role (`ecs-tasks-execution-role`) granting
   `dynamodb:GetItem`, `PutItem`, and `Query` scoped to that table's ARN.
3. Task-def env: `TRANSCRIBE_TABLE_NAME=transcribe-transcripts`.

## Deferred / follow-up (tracked on the PR, not the issue tracker)

Sub-canvas + timed-media units (schema is ready; logic deferred); rate limiting +
abuse controls; an "experimental — data may be wiped" UI notice; account/attribution;
version history; drafts/autosave; canvas drift detection (content + perceptual hash)
and bounded save-time derivative preservation; moderation; indexing transcripts into
ES; export back to providers.
