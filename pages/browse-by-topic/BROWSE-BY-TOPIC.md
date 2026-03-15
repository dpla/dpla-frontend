# Browse by Topic

Browse by Topic is a curated three-level hierarchy — **Topics → Subtopics → Items** — that lets visitors explore DPLA's collection through hand-picked themes. Topics and subtopics are WordPress categories with custom ACF fields; items are a custom WordPress post type whose metadata is enriched at request time from the DPLA Search API.

The section is linked from the main navigation and the home page.

---

## Routes

| URL | File | Renders |
|-----|------|---------|
| `/browse-by-topic` | `pages/browse-by-topic/index.js` | Grid of all topics |
| `/browse-by-topic/[topicSlug]` | `pages/browse-by-topic/[topicSlug]/index.js` | Topic detail: subtopic grid + related content carousel |
| `/browse-by-topic/[topicSlug]/[subtopicSlug]` | `pages/browse-by-topic/[topicSlug]/[subtopicSlug]/index.js` | Subtopic detail: sidebar + item list |

All three pages are **server-side rendered on every request** (`getServerSideProps`).

---

## Data Architecture

```
WordPress
├── Category taxonomy
│   ├── Topic (parent=0, is_topic_browse_category=true)
│   │   ├── ACF: category_image, order, related_content[]
│   │   └── Subtopic (parent=topic.term_id)
│   │       └── ACF: category_image, order, description (WP field)
└── Custom post type: topic_browse_item
    ├── ACF: dpla_url, order
    └── categories: [topic_term_id, subtopic_term_id]

DPLA Search API
└── Called per item at request time to fetch:
    thumbnail, type, date, creator, description, dataProvider, provider, isShownAt
```

### WordPress API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `{WP_URL}/wp-json/dpla/v2/categories?per_page=100` | All topics |
| `{WP_URL}/wp-json/dpla/v2/categories?slug={slug}` | Single topic by slug |
| `{WP_URL}/wp-json/dpla/v2/subcategories?parent={term_id}` | Subtopics for a topic |
| `{WP_URL}/wp-json/wp/v2/topic_browse_item?per_page=100&categories={term_id}` | Items for a subtopic |

The `dpla/v2` namespace is a custom WordPress plugin specific to this site. It filters the standard category taxonomy using the ACF field `is_topic_browse_category` to separate topic-browse categories from the rest of the site's WP categories.

---

## Level 1: Topics

### What They Are
Topics are top-level WordPress **categories** (`parent=0`) with `is_topic_browse_category` set to `true` in ACF. The index page (`/browse-by-topic`) fetches all of them and renders a responsive grid of cards.

### Fields

| Field | Where set | Notes |
|-------|-----------|-------|
| Name | WP category Name field | Displayed on card and as page `<h1>` |
| Slug | WP category Slug field | Used in URL: `/browse-by-topic/{slug}` |
| Description | WP category Description field | Curator credit line, shown below subtopic grid |
| `category_image` | ACF | Card thumbnail image URL |
| `order` | ACF | Sort order (use increments of 10: 10, 20, 30…) |
| `is_topic_browse_category` | ACF | **Must be `true`** — this is the filter that includes the category in Browse by Topic |
| `related_content` | ACF repeater | Optional list of Exhibitions and/or Primary Source Sets shown in a carousel below subtopics |

### Related Content Carousel
Each `related_content` entry has:
- `related_content_type`: `"Exhibition"` or `"Primary Source Set"`
- `exhibition_id`: exhibition slug (if type = Exhibition)
- `primary_source_set_id`: full PSS API URL (if type = Primary Source Set)

The frontend resolves these to titles and thumbnails at request time and renders a "You might also enjoy" carousel. Omit the `related_content` field or leave it empty to suppress the carousel.

### Current Topics (as of March 2026)

| Order | Name | Slug | term_id | Items |
|-------|------|------|---------|-------|
| 1 | American Civil War | `american-civil-war` | 52 | 457 |
| 20 | Aviation | `aviation` | 5 | 344 |
| 30 | Baseball | `baseball` | 22 | 340 |
| 40 | Civil Rights Movement | `civil-rights-movement` | 62 | 335 |
| 50 | Food | `food` | 29 | 329 |
| 60 | Immigration Since 1840 | `immigration-since-1840` | 43 | 408 |
| 70 | Photography | `photography` | 9 | 378 |
| 80 | Women in Science | `women-in-science` | 36 | 353 |

---

## Level 2: Subtopics

### What They Are
Subtopics are WordPress **categories** whose `parent` is set to a topic's `term_id`. They do **not** need `is_topic_browse_category` — only their parent relationship matters. Each topic currently has 6–8 subtopics.

### Fields

| Field | Where set | Notes |
|-------|-----------|-------|
| Name | WP category Name field | Displayed on card, sidebar, and page `<h1>` |
| Slug | WP category Slug field | Used in URL: `/browse-by-topic/{topicSlug}/{subtopicSlug}` |
| Description | WP category Description field | Full paragraph shown in the sidebar on the subtopic page |
| `category_image` | ACF | Card thumbnail image URL; also shown in sidebar |
| `order` | ACF | Sort order within the parent topic (1, 2, 3…) |
| Parent | WP category Parent field | **Must be set to the parent topic's category** |

### Prev/Next Navigation
On subtopic pages, prev/next arrows allow navigating between subtopics within the same topic. Order is determined by the `order` ACF field (ascending).

---

## Level 3: Items

### What They Are
Items are WordPress posts of the custom post type **`topic_browse_item`**. Each item is a pointer to a DPLA collection item via its dp.la URL. The post itself stores very little — just the DPLA URL and a sort order. All display metadata (title, thumbnail, type, date, creator, provider, description) is **fetched live from the DPLA Search API** at page request time.

Each item post must be assigned to **two categories**: the subtopic it belongs to AND that subtopic's parent topic. This is required because WordPress category counts and the frontend's category filter (`?categories={subtopic_term_id}`) both depend on it.

### ACF Fields on Items

| Field | Type | Notes |
|-------|------|-------|
| `dpla_url` | URL | Full `https://dp.la/item/{id}` URL — the only content field; everything else comes from the API |
| `order` | number | Display order within the subtopic (ascending) |

### Metadata Fetched from DPLA API
At request time, the frontend calls `/items/{id}` for every item in the subtopic and enriches each with:
- Thumbnail image
- Item type (image, sound, text, etc.)
- Date
- Creator
- Description
- Data provider (contributing institution)
- Hub (provider)
- Link to the source item (`isShownAt`)

Items that fail the DPLA API fetch are silently filtered out.

### Total Items
~2,944 items total across all topics (as of March 2026). Subtopics typically contain around 60 items each.

---

## Note: `isFeatured` and `isNew` Ribbons

The topic card component contains code to display "Featured" and "New" ribbon badges. These fields (`isFeatured`, `isNew`) **do not exist in the WordPress API** and were never implemented. The ribbons will never appear on live data. This is dead code.

---

## Step-by-Step Instructions

### How to Add a New Topic

1. In WP admin, go to **Posts → Categories**.
2. Click **Add New Category**.
3. Set:
   - **Name**: the topic title (e.g. "Jazz Music")
   - **Slug**: URL-friendly version (e.g. `jazz-music`) — auto-generated but confirm
   - **Parent Category**: leave as *None* (topics are top-level)
   - **Description**: curator credit line (optional, shown below subtopic grid)
4. Save the category.
5. Open the newly created category in the ACF panel (still on the category edit screen) and set:
   - **`is_topic_browse_category`**: ✓ checked (required — without this the topic is invisible to the site)
   - **`category_image`**: upload or paste a URL for the card image
   - **`order`**: a number controlling its position in the topic grid (use multiples of 10 to leave room)
   - **`related_content`**: add any Exhibitions or Primary Source Sets for the "You might also enjoy" carousel (optional)
6. Save.

The topic will immediately appear on `/browse-by-topic` on next page load. It will have no subtopics until you add them.

---

### How to Remove a Topic

1. In WP admin, go to **Posts → Categories**.
2. Find the topic and either:
   - **Delete** it — this also removes all its subtopics and disassociates items (items themselves are not deleted, but become orphaned). **Recommended only if you are retiring all content.**
   - Or uncheck **`is_topic_browse_category`** in ACF — this hides the topic from Browse by Topic without deleting any data.

> **Warning:** Deleting a category in WordPress cannot be undone and will also delete all child subcategories.

---

### How to Add a New Subtopic

1. In WP admin, go to **Posts → Categories**.
2. Click **Add New Category**.
3. Set:
   - **Name**: subtopic title (e.g. "Jazz on Film")
   - **Slug**: URL-friendly (e.g. `jazz-on-film`)
   - **Parent Category**: select the parent topic (e.g. "Jazz Music") — **required**
   - **Description**: the full descriptive paragraph shown in the sidebar on the subtopic page
4. Save, then in the ACF panel set:
   - **`category_image`**: card and sidebar image URL
   - **`order`**: sort order within the topic (1, 2, 3…)
5. Save.

The subtopic will appear on the topic's page at `/browse-by-topic/{topicSlug}`.

---

### How to Remove a Subtopic

1. In WP admin, go to **Posts → Categories**.
2. Find and delete the subtopic category.

> Items assigned to that subtopic are not deleted, but will no longer appear in Browse by Topic. Consider reassigning them before deleting.

---

### How to Edit a Topic or Subtopic's Title, Description, Image, or Order

1. In WP admin, go to **Posts → Categories**.
2. Click the name of the topic or subtopic to edit it.
3. Update as needed:
   - **Title**: the Name field
   - **Slug**: the Slug field (changing this changes the URL — existing links will break)
   - **Description**: the Description field
   - **Image / Order / `is_topic_browse_category` / related content**: in the ACF panel below
4. Save.

---

### How to Change a Subtopic's Parent Topic

1. In WP admin, go to **Posts → Categories**.
2. Edit the subtopic.
3. Change the **Parent Category** dropdown to the new parent topic.
4. Save.

> Any items assigned to this subtopic will also need their categories updated — they must be assigned to both the new parent topic AND the subtopic. Items still associated with the old parent topic category won't break anything but will add to the old topic's item count.

---

### How to Add an Item to a Subtopic

1. Find the DPLA item you want to add by browsing `https://dp.la`. Copy the full item URL (e.g. `https://dp.la/item/abc123def456`).
2. In WP admin, go to **Topic Browse Items → Add New**.
3. Set:
   - **Title**: the item title (for editorial reference — the display title is pulled from the DPLA API)
   - **Categories**: check both the **subtopic** and its **parent topic**
4. In the ACF panel below the editor, set:
   - **`dpla_url`**: paste the full `https://dp.la/item/…` URL
   - **`order`**: the position this item should appear within the subtopic (ascending; lower = earlier)
5. Publish.

The item will appear on the subtopic page at next load.

---

### How to Remove an Item from a Subtopic

1. In WP admin, go to **Topic Browse Items**.
2. Find the item (search by title or browse).
3. Either **Trash** it (removes it from Browse by Topic entirely) or **edit it** to uncheck its category assignments.

---

## Where to Edit Static Copy

| Text | File |
|------|------|
| Page title ("Browse by Topic") | `constants/topicBrowse.js` — `TITLE` |
| Page subtitle/description | `constants/topicBrowse.js` — `DESCRIPTION` |
| Intro paragraph on the topic grid | `components/TopicBrowseComponents/TopicsList/components/Topics/index.js` |
| Callout box ("Enjoying these topics?") | `components/TopicBrowseComponents/TopicsList/components/Callout/index.js` |
