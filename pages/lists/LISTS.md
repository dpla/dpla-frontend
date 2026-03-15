# Lists

The Lists feature lets users build temporary, named collections of DPLA items as they browse the site. It is entirely **client-side and browser-local** — no accounts, no server storage, no login required. Lists persist across page navigations and browser restarts via **localForage** (IndexedDB), but exist only in the browser that created them and cannot be shared via URL.

---

## Routes

| URL | File | Renders |
|-----|------|---------|
| `/lists` | `pages/lists/index.js` | All lists ("My Lists" landing page) |
| `/lists/[listId]` | `pages/lists/[listId].js` | Individual list detail and item view |

Both pages are **client-side only** — `getServerSideProps` is not used. List data is loaded from localForage after the component mounts.

---

## How Lists Are Stored

All list data is stored in the browser using **localForage** (`lib/localForage/index.js`), which uses IndexedDB where available and falls back to localStorage. This is:

- **Persistent** across page navigations and browser restarts
- **Browser-local** — different browsers on the same computer have separate list stores
- **Not synced** across devices, tabs, or users
- **Not shareable** — a `/lists/[uuid]` URL will show a 404 to anyone else

### List Data Structure

Each list is stored as a localForage entry keyed by its UUID:

```js
{
  uuid: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",  // RFC4122 v4 UUID
  name: "My List Name",                           // Max 64 characters
  selectedHash: {
    "item-id-abc": "item-id-abc",                 // Keys and values are both the DPLA item ID
    "item-id-def": "item-id-def"
  },
  count: 2,                                       // Derived from Object.keys(selectedHash).length
  createdAt: 1710000000000,                       // Date.now() at creation
  updatedAt: 1710000000000                        // Date.now() at last modification
}
```

### localForage API (`lib/localForage/index.js`)

| Function | Purpose |
|----------|---------|
| `getLocalForageLists()` | Returns all lists as an array |
| `getLocalForageItem(key)` | Returns a single list by UUID |
| `setLocalForageItem(key, value)` | Saves or updates a list |
| `removeLocalForageItem(key)` | Deletes a list by UUID |

---

## The `/lists` Landing Page

Content is **hardcoded** — no WordPress CMS integration.

The page renders:

- **If no lists exist**: `ListsEmpty` component showing introductory text and embedded tutorial videos explaining how lists work
- **If lists exist**:
  - A note: "You won't see lists created in another browser here"
  - A "Create new list" button
  - A card for each existing list showing its name, item count, and creation date

---

## User Flow: Creating a List

1. User visits `/lists` and clicks **"Create new list"**
2. A **`ListNameModal`** appears with a text field (default: "Untitled list", max 64 chars)
3. On submit:
   - A new UUID is generated via `createUUID()`
   - A new list object is created with an empty `selectedHash: {}`
   - Saved to localForage under the UUID key
   - User is redirected to `/lists/[uuid]`

A list can also be created implicitly from search results or item pages if a user tries to add to a list when none exist yet.

---

## User Flow: Adding Items to a List

Items can be added from three places:

### From an Item Page (`/item/[itemId]`)
- The **`CheckableLists`** component renders a checkbox for each existing list
- Checking a box calls `addItemToList(listId)`, which adds `selectedHash[itemId] = itemId`, increments `count`, and saves
- Unchecking calls `removeItemFromList(listId)`, which deletes the key from `selectedHash`, decrements `count`, and saves

### From Search Results (`/search`) or Browse by Topic
- The **`ListView`** component (with `behavior="search"` or `behavior="browse"`) shows an "Add to:" dropdown and checkboxes next to items
- Selecting a list and checking items calls `addCell(itemId)`, updating the list in localForage
- A maximum of **50 items** per list is enforced (`MAX_LIST_ITEMS` in `constants/site.js`)

### From a List Page (removing)
- With `behavior="list"`, ListView shows checkboxes to remove items
- Checking calls `removeCell(itemId)`, removing the entry from `selectedHash`

---

## User Flow: The Individual List Page (`/lists/[listId]`)

On load:
1. The UUID is read from the URL
2. The list is fetched from localForage
3. If not found → 404
4. If found → item IDs are extracted from `selectedHash` and sent to the internal API proxy (`/api/items/[idListString]`), which fetches full item metadata from the DPLA Search API in a single batched request
5. Items are displayed using ListView with full metadata (title, thumbnail, date, creator, provider, etc.)

The page shows:
- Breadcrumb: My Lists → [List Name]
- List name as `<h1>` with a rename (pencil) button
- "Created X days ago" (via dayjs)
- The item grid/list
- A **"Download list"** link (exports as CSV)
- A **"Delete list"** button

---

## User Flow: Renaming a List

1. User clicks the pencil/rename icon on the list detail page
2. **`ListNameModal`** appears pre-filled with the current name
3. On submit, `list.name` is updated, `list.updatedAt` is refreshed, and saved to localForage

---

## User Flow: Downloading a List

The ListView component generates a **CSV export** when `exportable={true}` and `behavior="list"`:

- Columns: `id`, `Title`, `Date`, `Creator`, `Description`, `Provider`, `Thumbnail`, `URL`
- File name: `[ListName].csv`
- Only items currently in the list are exported
- Uses the Blob API (with `navigator.msSaveBlob` fallback for IE10+)

---

## User Flow: Deleting a List

1. User clicks **"Delete list"** on the list detail page
2. A confirmation modal appears
3. On confirm: `removeLocalForageItem(listId)` deletes the list from localForage
4. User is redirected to `/lists`

There is no "close" or "hide" operation — users either navigate away (list persists) or delete it.

---

## Server-Side Involvement

List management is **entirely client-side**. There is one server-side component:

**`/pages/api/items/[idListString].js`** — An internal Next.js API route that:
- Accepts a comma-separated string of DPLA item IDs in the URL
- Proxies a batch request to the DPLA Search API
- Returns full item metadata (title, thumbnail, type, date, creator, provider, etc.)
- Used only by the list detail page to hydrate items with display metadata

Lists themselves are never written to or read from any server.

---

## Constraints

| Constraint | Value | Source |
|------------|-------|--------|
| Max items per list | 50 | `MAX_LIST_ITEMS` in `constants/site.js` |
| Max list name length | 64 characters | `NAME_CHAR_LIMIT` in `ListNameModal` |
| Storage scope | Current browser only | localForage (IndexedDB) |
| Shareable via URL | No | Stored locally; URL returns 404 in another browser |
| Account required | No | Fully anonymous |
| Survives browser close | Yes | IndexedDB is persistent |
| Survives clearing site data | No | IndexedDB is cleared with browser storage |

---

## Where to Edit Things

| What | Where |
|------|-------|
| Page title ("My Lists") | `constants/lists.js` — `LISTS_TITLE` |
| Max items per list | `constants/site.js` — `MAX_LIST_ITEMS` |
| Success message display duration | `constants/site.js` — `MESSAGE_DELAY` |
| Landing page copy and tutorial videos | `components/ListComponents/index.js` — `ListsEmpty` component |
| "You won't see lists from another browser" note | `components/ListComponents/index.js` — `ListNote` component |
| CSV export column definitions | `components/shared/ListView/index.js` — `downloadCSV()` function |
| localForage read/write logic | `lib/localForage/index.js` |
