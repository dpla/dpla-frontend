# Internal API Route: `/api/items/[idListString]`

## Overview

This is a **server-side proxy endpoint** that batch-fetches full DPLA item metadata on behalf of the client. It is a [Next.js API route](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) — not a page, not a custom Express handler, and not part of the public DPLA Search API. It is automatically served by Next.js from its location in `pages/api/`.

**Its sole purpose** is to support the Lists feature (`/lists/[listId]`). When a user views a saved list, only item IDs are stored in the browser (via localForage/IndexedDB). This route accepts those IDs, looks them up against the DPLA Search API using a server-side API key, and returns the full item records for display — without ever exposing the API key to the browser.

---

## URL Structure

```
GET /api/items/{id1},{id2},{id3},...
```

- IDs are comma-separated DPLA item identifiers in the URL path (not query string)
- Each ID must be a **32-character lowercase hex string** (e.g. `00004e3dddc3c26b03e1e69063e3e1f8`)
- Invalid IDs are silently filtered out before the upstream request is made
- If no valid IDs remain after filtering, returns `404 {}`

**Example:**
```
GET /api/items/00004e3dddc3c26b03e1e69063e3e1f8,1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
```

---

## How It Works

1. Split the URL path segment on commas to get individual IDs
2. Validate each ID against `/^[0-9a-f]{32}$/` — drop any that don't match
3. If zero valid IDs remain → return `404 {}`
4. Construct a DPLA Search API request:
   ```
   GET {API_URL}/items/{id1},{id2},...?api_key={API_KEY}
   ```
5. Stream the DPLA response body directly to the client (no buffering) — preserving the upstream `Content-Type`
6. If the upstream call fails → return `404 "Not found."` or `404 {}` on exception

The streaming implementation uses Node.js `Readable.fromWeb().pipe(res)` to forward the response efficiently without loading the full payload into memory.

---

## Authentication & Environment

The DPLA API key is **never sent to the browser**. This is the primary reason the proxy exists — client-side code can call `/api/items/...` freely, and the key is injected server-side.

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
      "id": "00004e3dddc3c26b03e1e69063e3e1f8",
      "sourceResource": {
        "title": "...",
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

Individual items within `docs` that have an `error` field are filtered out by the caller before display.

---

## Error Responses

| Condition | Status | Body |
|-----------|--------|------|
| Zero valid IDs after filtering | 404 | `{}` |
| Upstream DPLA API error | 404 | `Not found.` (text) |
| Exception during fetch | 404 | `{}` |

Errors are logged to the server console but not surfaced in the response body.

---

## Who Calls This Route

**Only one caller exists:** `pages/lists/[listId].js`

The list detail page collects stored item IDs from localForage, joins them into a comma-separated string, and fetches:

```javascript
const res = await fetch(`/api/items/${ids}`);
```

It then maps the returned `docs` array into display-ready items, extracting:
- All `sourceResource` fields (title, type, date, creator, etc.)
- Thumbnail URL via `getItemThumbnail()` (uses `https://dp.la/thumb/{id}` if `object` is present, otherwise a type-based SVG placeholder)
- `id`, `sourceUrl` (link to item at source institution), `provider`, `dataProvider`

No other page or component in the codebase calls this route.

---

## Limits & Constraints

| Constraint | Value | Defined In |
|-----------|-------|-----------|
| Max items per list | 50 | `MAX_LIST_ITEMS` in `constants/site.js` |
| ID format | 32-char hex | `DPLA_ITEM_ID_REGEX` in `constants/items.js` |
| HTTP methods | GET only | — |
| Persistence | None — IDs live only in the user's browser | `lib/localForage/` |

---

## API Surface

This is the **only API route** in the entire `pages/api/` directory. There are no other Next.js API routes in this application — all other data fetching happens via `getServerSideProps` or `getStaticProps` in page files, or through the custom Express server in `server.js`.

---

## Key Files

| File | Role |
|------|------|
| `pages/api/items/[idListString].js` | The route handler itself |
| `pages/lists/[listId].js` | Only caller; renders the fetched items |
| `constants/items.js` | `DPLA_ITEM_ID_REGEX` validation pattern |
| `lib/getItemThumbnail.js` | Thumbnail URL resolution used by the caller |
| `constants/site.js` | `MAX_LIST_ITEMS` (50) cap on list size |
