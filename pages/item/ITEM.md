# Item Pages (`/item/[itemId]`)

## Overview

Item pages are the backbone of dp.la. Every one of the 50+ million digitized objects in the DPLA collection has a detail page at `/item/{id}`, reached by clicking any search result, browse result, or list entry. These pages are entirely data-driven — no WordPress CMS content is involved. All metadata comes from the DPLA Search API in real time on every page load.

**Live example:** `https://dp.la/item/00004e3dddc3c26b03e1e69063e3e1f8`

---

## URL Structure

```
/item/{itemId}
```

- `itemId` is a 32-character lowercase hex string (e.g. `00004e3dddc3c26b03e1e69063e3e1f8`)
- The page rejects any ID that does not match `/^[0-9a-f]{32}$/` with a 404
- Routing is handled by `pages/item/[itemId].js`

---

## Data Source

All content is fetched server-side (`getServerSideProps`) from:

```
https://api.dp.la/v2/items/{itemId}?api_key={DPLA_API_KEY}
```

No data is cached — every page load hits the live API. If the API returns no docs or the item is not found, the page renders a 404.

---

## Page Layout

The page uses a two-column layout:

| Left (main content, ~75% width) | Right sidebar (~225px) |
|----------------------------------|------------------------|
| Thumbnail / media viewer | Cite This Item button |
| Title | Add to List widget |
| Primary metadata | |
| Additional metadata | |

---

## Thumbnail & Media Viewers

### Thumbnail Logic (`lib/getItemThumbnail.js`)

- If the API record has an `object` field → thumbnail URL is `https://dp.la/thumb/{itemId}` (a DPLA-proxied image)
- If no `object` field → falls back to an SVG placeholder based on the item's `type` field (image, text, sound, moving image, etc.)
- Placeholder SVGs live in `public/static/images/`

### Full Media Viewers

When the item links to a viewable resource, the page can display one of three inline viewers (selected by content type):

| Viewer | Content Type | Library |
|--------|-------------|---------|
| Image viewer | IIIF manifests or image URLs | OpenSeaDragon |
| Audio/video player | Sound or moving image items | HTML5 `<audio>` / `<video>` |
| PDF viewer | PDF documents | PDF.js |

---

## Metadata Fields

All fields are sourced from the DPLA API's `sourceResource` and top-level doc objects. Missing fields are silently omitted from the page — no "N/A" placeholders.

### Main Metadata (displayed prominently)

| Field | API Path | Notes |
|-------|----------|-------|
| Title | `sourceResource.title` | Can be an array; all values displayed |
| Date | `sourceResource.date.displayDate` | Free-text display string |
| Description | `sourceResource.description` | Can be long; displayed as-is |
| Creator | `sourceResource.creator` | Can be an array |

### Additional Metadata (displayed below main section)

| Field | API Path | Notes |
|-------|----------|-------|
| Partner | `provider.name` | The DPLA hub/partner organization |
| Contributing Institution | `dataProvider` | The holding institution |
| Supporting Institution | `intermediateProvider` | Optional; rarely present |
| Collection | `sourceResource.collection.title` | Link to collection search |
| Publisher | `sourceResource.publisher` | Can be an array |
| Subjects | `sourceResource.subject[].name` | Each subject links to a subject search |
| Location | `sourceResource.spatial[].name` | Geographic coverage |
| Type | `sourceResource.type` | Broad type (image, text, sound, etc.) |
| Format | `sourceResource.format` | Physical/digital format description |
| Language | `sourceResource.language[].name` | Can be an array |
| URL at Partner | `isShownAt` | External link to item at source institution |
| Rights (EDM) | `rights` | URI → human-readable label (see below) |
| Rights (Source Resource) | `sourceResource.rights` | Free-text rights statement from provider |

---

## Rights Statements

Rights information is displayed in two layers:

### 1. Standardized Rights URI (`rights` field)

The `rights` field contains a URI from either [RightsStatements.org](https://rightsstatements.org) or [Creative Commons](https://creativecommons.org). The site maps these URIs to human-readable labels, descriptions, and badge icons using:

- **`lib/readMyRights.js`** — looks up the URI in the rights constants and returns `{ statement, description, icon }`
- **`constants/rights.js`** — 650+ entries covering the full RightsStatements.org vocabulary and Creative Commons license suite

The displayed badge links back to the rights statement's canonical URL for full details.

### 2. Source Resource Rights (`sourceResource.rights`)

A free-text rights statement provided directly by the contributing institution. Displayed as-is, below the standardized badge.

---

## Citations (`CiteButton`)

The sidebar "Cite This Item" button (component: `components/shared/CiteButton/`) generates three citation formats on demand:

| Format | Example fields used |
|--------|---------------------|
| Chicago | Author, title, date, partner, URL |
| APA | Author, date, title, partner, URL |
| MLA | Author, title, partner, date, URL |

Citations are generated entirely in JavaScript from the API data — no external citation service is used.

---

## Add to List (`CheckableLists`)

The sidebar also contains the "Add to List" widget (`components/ListComponents/CheckableLists/`). This allows users to save items to named lists stored locally in their browser using **localForage** (IndexedDB). Lists are ephemeral — they exist only in the user's browser and are not synced to any server or account.

See `pages/lists/LISTS.md` for full documentation of the list feature.

---

## Structured Data (JSON-LD)

Each item page emits a `<script type="application/ld+json">` block in `<head>` for SEO and discoverability. Generated by `components/ItemComponents/Content/JsonLdMarkup.js` using schema.org vocabulary.

Typical fields included:
- `@type`: mapped from DPLA type (e.g. `Photograph`, `Book`, `VideoObject`)
- `name`: item title
- `description`
- `creator`
- `dateCreated`
- `url`: canonical dp.la item URL
- `thumbnailUrl`
- `license`: rights URI

---

## Analytics

Two Google Analytics events are fired on item pages:

| Event | Trigger | Data sent |
|-------|---------|-----------|
| `View Item` | Page load | Item ID, partner, type |
| `Click Through` | User clicks the "URL at Partner" link | Item ID, destination URL |

---

## How to Edit Item Page Content

Item page content is **entirely determined by data in the DPLA Search API** — there is no CMS interface for individual items. To change what appears on an item page:

1. **Metadata changes** must be made at the source institution and re-ingested through the DPLA data pipeline. DPLA staff do not edit item records directly.
2. **Rights label/description changes** — edit `constants/rights.js` (the URI-to-label mapping) or `lib/readMyRights.js`.
3. **Layout or field display changes** — edit the React components in `components/ItemComponents/Content/`:
   - `MainMetadata.js` — title, thumbnail, date, description, creator
   - `OtherMetadata.js` — all remaining metadata fields
   - `JsonLdMarkup.js` — structured data output
4. **Adding a new metadata field** — update `OtherMetadata.js` to read and render the new API field.
5. **Thumbnail/placeholder changes** — update `lib/getItemThumbnail.js` or the SVG files in `public/static/images/`.

---

## Key Files

| File | Purpose |
|------|---------|
| `pages/item/[itemId].js` | SSR entry point; fetches API, passes props to page |
| `components/ItemComponents/Content/MainMetadata.js` | Title, thumbnail, date, description, creator |
| `components/ItemComponents/Content/OtherMetadata.js` | All secondary metadata fields |
| `components/ItemComponents/Content/JsonLdMarkup.js` | Schema.org JSON-LD structured data |
| `lib/readMyRights.js` | Maps rights URIs to labels/descriptions/icons |
| `constants/rights.js` | 650+ rights URI → label mappings |
| `lib/getItemThumbnail.js` | Resolves thumbnail URL or placeholder |
| `lib/getDefaultThumbnail.js` | Returns type-specific placeholder SVG path |
| `components/shared/CiteButton/index.js` | Chicago/APA/MLA citation generator |
| `components/ListComponents/CheckableLists/index.js` | Add-to-list sidebar widget |
