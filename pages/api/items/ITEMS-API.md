# API Route: `/api/items/[idListString]`

## Overview

This route serves two purposes:

**1. Developer/staff convenience** — A quick, key-free way to retrieve raw DPLA item JSON by ID. If you know an item's ID, you can fetch its full metadata directly at `https://dp.la/api/items/{id}` without registering for a DPLA API key or constructing a query against `api.dp.la`. It works in the browser, curl, or any HTTP client.

**2. Lists feature backend** — The `/lists/[listId]` page stores only item IDs in the browser (via localForage/IndexedDB) and uses this route at runtime to fetch full metadata for display. The route hides the DPLA API key server-side so it is never exposed to the browser.

It is a [Next.js API route](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) — not a page, not a custom Express handler, and not part of the public DPLA Search API. It is automatically served by Next.js from its location in `pages/api/`.

---

## URL Structure

```http
GET /api/items/{id}
GET /api/items/{id1},{id2},{id3},...
```

- IDs are comma-separated DPLA item identifiers in the URL path (not query string)
- Each ID must be a **32-character lowercase hex string**
- Invalid IDs are silently filtered out before the upstream request is made
- If no valid IDs remain after filtering, returns `404 {}`

**Single item:**
```text
https://dp.la/api/items/777f28be51fcbd39120f1c17bc9b2d2d
```

**Multiple items:**
```text
https://dp.la/api/items/777f28be51fcbd39120f1c17bc9b2d2d,5a0e0c52dfb724c957a123e8dbde7280
```

---

## How It Works

1. Split the URL path segment on commas to get individual IDs
2. Validate each ID against `/^[0-9a-f]{32}$/` — drop any that don't match
3. If zero valid IDs remain → return `404 {}`
4. Construct a DPLA Search API request:
   ```http
   GET {API_URL}/items/{id1},{id2},...?api_key={API_KEY}
   ```
5. Stream the DPLA response body directly to the client (no buffering) — preserving the upstream `Content-Type`
6. If the upstream call fails → return `404 "Not found."` or `404 {}` on exception

The streaming implementation uses Node.js `Readable.fromWeb().pipe(res)` to forward the response efficiently without loading the full payload into memory.

---

## Authentication & Environment

The DPLA API key is **never sent to the browser** — it is injected server-side on every request. Callers of this route do not need their own API key.

| Environment Variable | Purpose |
|---------------------|---------|
| `API_URL` | Base URL of DPLA Search API (e.g. `https://api.dp.la/v2`) |
| `API_KEY` | DPLA API key for authenticating upstream requests |

---

## Response Shape

On success, the route passes through the raw DPLA Search API response:

```json
{
  "docs": [
    {
      "id": "777f28be51fcbd39120f1c17bc9b2d2d",
      "sourceResource": {
        "title": ["Photograph--Photograph"],
        "type": "image",
        "date": { "displayDate": "1920" },
        "creator": ["..."],
        "description": "..."
      },
      "object": "https://...",
      "isShownAt": "https://...",
      "provider": { "name": "..." },
      "dataProvider": "..."
    }
  ]
}
```

---

## Error Responses

| Condition | Status | Body |
|-----------|--------|------|
| Zero valid IDs after filtering | 404 | `{}` |
| Upstream DPLA API error | 404 | `Not found.` (text) |
| Exception during fetch | 404 | `{}` |

Errors are logged to the server console but not surfaced in the response body.

---

## Use in the Lists Feature

`pages/lists/[listId].js` is the only internal caller. The list page collects stored item IDs from localForage, joins them into a comma-separated string, and fetches:

```javascript
const res = await fetch(`/api/items/${ids}`);
```

It then maps the returned `docs` array into display-ready items, extracting:
- All `sourceResource` fields (title, type, date, creator, etc.)
- Thumbnail URL via `getItemThumbnail()` (uses `https://dp.la/thumb/{id}` if `object` is present, otherwise a type-based SVG placeholder)
- `id`, `sourceUrl` (link to item at source institution), `provider`, `dataProvider`

---

## Limits & Constraints

| Constraint | Value | Defined In |
|-----------|-------|-----------|
| Max items per list (UI-enforced) | 50 | `MAX_LIST_ITEMS` in `constants/site.js` |
| ID format | 32-char hex | `DPLA_ITEM_ID_REGEX` in `constants/items.js` |
| HTTP methods | GET only | — |

---

## API Surface

This is the **only API route** in the entire `pages/api/` directory. There are no other Next.js API routes in this application — all other data fetching happens via `getServerSideProps` or `getStaticProps` in page files, or through the custom Express server in `server.js`.

---

## Key Files

| File | Role |
|------|------|
| `pages/api/items/[idListString].js` | The route handler itself |
| `pages/lists/[listId].js` | Lists feature caller |
| `constants/items.js` | `DPLA_ITEM_ID_REGEX` validation pattern |
| `lib/getItemThumbnail.js` | Thumbnail URL resolution used by the Lists caller |
| `constants/site.js` | `MAX_LIST_ITEMS` (50) cap on list size |
