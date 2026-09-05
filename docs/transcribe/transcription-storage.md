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

### Item rollup row (per-status counters)

Alongside an item's unit rows sits **one rollup row** — same PK, reserved
`unit_key = #item` (it sorts before the `canvas#…` unit keys and can't collide with a
hashed one). It carries a **counter per status**, so an item's **status set** (the
distinct statuses it has ≥1 unit in) is a single read — the basis for an item-level
status facet, since search returns items, not units.

| Attribute | Type | Notes |
|---|---|---|
| `record_type` | S | `item_rollup` (distinguishes it from unit rows) |
| `n_{status}` | N | count of the item's units currently in `{status}` (e.g. `n_complete`) |
| `updated_at` | S | ISO-8601 UTC of the last write |
| `schema_version` | N | `1` |

**Maintained on every unit write, not recomputed.** The `PUT` upserts the unit row with
`ReturnValues=ALL_OLD` to learn the status it replaced, then applies just that delta to
the rollup with atomic `ADD` (`+new`, `−old`) — so concurrent writes to *different* units
of the same item compose correctly, and re-saving the same status is a no-op. The unit
rows are the source of truth; the rollup is a derived aggregate that
`scripts/backfill-transcript-rollups.mjs` can rebuild from them at any time (it also does
the one-time backfill).

**Rollup rows exist only for *touched* items.** `not_started` / "untranscribed" is still
the absence of any row for the item — its **count** is `iiif-corpus total (from ES) −
touched items (from DynamoDB)`, and a work-queue can hand out untranscribed items by
sampling the corpus; neither needs a per-item placeholder. (Materializing an
`untranscribed` default per corpus item is possible but is a near-whole-corpus copy —
deferred.)

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
  "itemStatus": ["complete", "in_progress"],
  "units": [
    { "unitKey": "canvas#3b1f…", "unitType": "canvas",
      "canvasId": "https://…/canvas/1", "text": "…", "status": "complete",    "updatedAt": "2026-…" },
    { "unitKey": "canvas#9a04…", "unitType": "canvas",
      "canvasId": "https://…/canvas/2", "text": "…", "status": "in_progress", "updatedAt": "2026-…" }
  ]
}
```
`itemStatus` is the item's status set (from the rollup row, which is filtered out of
`units`). Future timed/region units appear in the same list with `startMs`/`endMs` or
`region` fields — additive only.

### `PUT /api/transcript/{itemId}` — save one unit
v1 body: `{ "canvasId": "https://…/canvas/2", "text": "…", "status": "in_progress" }`
→ server derives `unit_key = canvas#{sha256 of canvasId}`, stores the raw id in
`canvas_id`, sets `unit_type = canvas`, upserts one unit, updates the item rollup, and
returns `{ "unitKey": "…", "canvasId": "…", "status": "…", "updatedAt": "…",
"itemStatus": ["…"] }`. Later the body gains optional `unitType` / `startMs` / `endMs` /
`page` fields to address finer units — additive, non-breaking.

## How future media types map on (no migration, no breaking change)

- **Timed audio/video:** N segment-units per asset, each `unit_key = av#{asset}#{startMs}`
  with `start_ms`/`end_ms`/`text`/`status`. `begins_with av#{asset}#` returns them in
  time order — exactly what WebVTT/caption export needs. Just new rows + attributes.
- **PDF sub-pages / regions:** N unit-records per asset (`pdf#…#page#…`,
  `canvas#…#region#…`), region geometry (`xywh`) as an attribute. One asset, many units.
- **Per-unit vs asset-level status:** each unit carries its own `status`; the
  **item-level** rollup row (above) aggregates them into per-status counters under the
  reserved `#item` key. A finer asset-level rollup (per PDF, per A/V file) can slot in
  the same way later.

## Write-path guards (v1)

Enforced server-side in the `PUT` handler:
- `itemId` matches the DPLA id regex; else 404.
- `canvasId` non-empty string ≤ 2048 chars; else 400.
- `status` ∈ the enum; else 400.
- `text` ≤ 380 000 **UTF-8 bytes** (`Buffer.byteLength`, not char count — headroom under DynamoDB's 400 KB item limit); else 413. Subject to the wire-size ceiling below, which binds first for text that JSON-escapes to more than about twice its size.
- Text stored **verbatim** and rendered as text in the UI → no HTML/JS injection surface.

Outside the handler, the request body itself is capped at `MAX_TRANSCRIPT_REQUEST_BYTES`
via the route's `config.api.bodyParser.sizeLimit`. That constant is **derived** as
`MAX_TRANSCRIPT_TEXT_BYTES * 2 + 8_192` — twice the text cap is the worst case for
ordinary text once JSON-escaped (a newline, quote or backslash each cost two bytes on the
wire), and the extra 8 KB covers the envelope: keys, quoting, a max-length `canvasId` and
the status. Deriving it means raising the text cap can't silently leave the parser as the
binding constraint. Next statically analyses `export const config`, so the route repeats
the number as a literal; `lib/transcriptRequestLimit.test.mjs` asserts the two match and
covers the newline-heavy worst case. The headroom matters: an over-long transcript must be
rejected by the `text` guard above, which returns a clear JSON 413, not by the body
parser, whose 413 carries no explanation.

**Known boundary.** The 2× multiplier covers ordinary text, where the only characters that
escape are newlines, quotes and backslashes, at two bytes each. It does **not** cover text
made largely of control characters, which JSON-escape to `\u00XX` at six bytes each: 380 000
NUL bytes serialise to 2 280 081 wire bytes, well over the ceiling, so such a request is
rejected by the parser with a generic 413 rather than by the `text` guard. This is
deliberate. Covering it would require a ~2.3 MB ceiling, roughly tripling peak per-request
memory on a route that has no rate limiting or admission control (see **Rate limiting is
deferred** below), to accommodate input that is not plausible transcription text. Nothing is
lost or corrupted in that case — the request is refused either way; only the error message
is less specific. If the handler ever starts rejecting control characters outright, this
boundary disappears and the contract above becomes exact.

This only works because `server.js` mounts **no app-level body parser**. An app-level
parser consumes the request stream before the Next.js catchall runs, so its limit (100 KB
by default) would silently become the ceiling for this route — and Next would then skip
its own parsing entirely, since `req.body` is already set. See the comment above
`expressApp.get("/healthcheck", ...)` in `server.js` before adding one.

**Rate limiting is deferred** — the alpha is header-gated, so abuse exposure is low.
A per-IP / token limiter is required **before any public exposure**.

## AWS resources this PR provisions

1. DynamoDB table `transcribe-transcripts` (keys above, on-demand).
2. An IAM policy on the ECS task role (`ecs-tasks-execution-role`) granting
   `dynamodb:GetItem`, `PutItem`, `UpdateItem`, `Query`, and `Scan` scoped to that
   table's ARN (`UpdateItem` maintains the rollup counters; `Scan` backs the home-page
   status browse — see below).

**Home "browse by transcription status".** The grid tiles link to
`/search?transcription_status=<value>`; `pages/search/index.js` (gated to the transcribe
local) serves those. For an explicit status it Scans the item rollup rows for
`n_<status> > 0`, then hydrates the matching ids via the DPLA API multi-fetch
(`/items/{id,…}`) and renders them like normal results. `untranscribed` is the absence of
a record, so it runs the normal browse and excludes touched item ids (and subtracts them
from the total). That exclusion is applied to the already-paginated page, so a page can be
slightly short and deep-page counts approximate; excluding *before* pagination — so the
untranscribed set is exact — needs the transcribe-local index. The alpha `Scan` is fine at
this size; a GSI keyed on status is the scale replacement.
3. Task-def env: `TRANSCRIBE_TABLE_NAME=transcribe-transcripts`.

The **backfill script** (`scripts/backfill-transcript-rollups.mjs`) runs separately — as
an operator, locally, via the AWS CLI's default profile, **not** the task role — and needs
`dynamodb:Scan` + `PutItem` on the table. The task role deliberately does **not** get
`Scan`: the app only Query/Get/Put/Update, so keeping `Scan` out preserves least
privilege. Run the backfill with transcript writes **quiesced** (it recomputes from a
point-in-time scan and overwrites rollups unconditionally); it is idempotent, so simply
re-run it if a write landed mid-run.

## Deferred / follow-up (tracked on the PR, not the issue tracker)

Sub-canvas + timed-media units (schema is ready; logic deferred); rate limiting +
abuse controls; an "experimental — data may be wiped" UI notice; account/attribution;
version history; drafts/autosave; canvas drift detection (content + perceptual hash)
and bounded save-time derivative preservation; moderation; indexing transcripts into
ES; export back to providers.
