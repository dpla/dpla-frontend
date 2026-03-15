# Exhibitions (`/exhibitions`)

## Overview

Online Exhibitions are long-form curated features that present DPLA collection items within a narrative context. Each exhibition is organized into **sections** and optionally **subsections**, with images, video, audio, or PDF documents displayed in a rich media viewer alongside editorial text and captions.

There are currently **32 exhibitions** live on the site. They are linked from the site header and from the "Browse by Topic" callout. Examples:

- `https://dp.la/exhibitions` — landing page (all exhibitions)
- `https://dp.la/exhibitions/civilian-conservation-corps` — exhibition home
- `https://dp.la/exhibitions/civilian-conservation-corps/enrollees` — section
- `https://dp.la/exhibitions/civilian-conservation-corps/enrollees/camp-life` — subsection

---

## Where Exhibition Content Lives

> **Important:** Exhibition content is NOT stored in WordPress or edited through a CMS interface. It lives as **static JSON files** committed directly to this repository in the `/exhibitions-data/` directory.

Each exhibition has two relevant files:

| File | Purpose |
|------|---------|
| `exhibitions-data/exhibitions.json` | Index listing — title, slug, and thumbnail URL for every exhibition |
| `exhibitions-data/{slug}.json` | Full exhibition content — all sections, subsections, items, text, and captions |

The JSON files are the canonical source of truth for exhibition content. The data structure reflects legacy conventions from **Omeka**, a digital exhibition platform that DPLA previously used and no longer operates — field names like `element_texts`, `item_type`, and `file_urls` are Omeka artifacts that persist in the JSON schema. New exhibitions and edits are made by directly authoring or modifying these JSON files.

---

## URL Structure & Routing

| URL Pattern | Page Type | Next.js File |
|-------------|-----------|-------------|
| `/exhibitions` | Landing page — grid of all exhibitions | `pages/exhibitions/index.js` |
| `/exhibitions/{slug}` | Exhibition home — intro, hero image, table of contents | `pages/exhibitions/[exhibitionSlug]/index.js` |
| `/exhibitions/{slug}/{section}` | Section page — items viewer + sidebar nav | `pages/exhibitions/[exhibitionSlug]/[sectionSlug]/index.js` |
| `/exhibitions/{slug}/{section}/{subsection}` | Subsection page — same viewer, narrower scope | `pages/exhibitions/[exhibitionSlug]/[sectionSlug]/[subsectionSlug]/index.js` |

Any section or subsection URL may also include `?item={blockId}` to deep-link directly to a specific item in the viewer (used for sharing and for prev/next navigation).

---

## Data Model

### Exhibition (`exhibitions-data/{slug}.json`)

```
title       string    Display title (e.g. "Roosevelt's Tree Army: The Civilian Conservation Corps")
slug        string    URL slug (e.g. "civilian-conservation-corps")
id          integer   Exhibition ID (legacy field from Omeka; not used by the frontend)
description string    HTML — intro/citation paragraph shown on exhibition home
credits     string    HTML — curator and contributor credits
pages       Page[]    All pages: homepage + sections + subsections (see below)
```

### Page (Section or Subsection)

Every section and subsection is a "page" object in the `pages` array. Their role is determined by two fields:

```
slug        string         URL segment for this section/subsection
title       string         Display title in sidebar and page header
order       integer        Sort position within its level (0, 1, 2, ...)
parent      null | object  null = top-level section; {id: N} = subsection of that section ID
page_blocks PageBlock[]    Ordered list of media items for this page
```

**Special page — `"homepage"` (order 0, no parent):**
This page holds the hero image and introductory text shown on the exhibition home (`/exhibitions/{slug}`). It does not appear as a section in the navigation.

**Sections** are pages with `parent: null` and `order ≥ 1`.
**Subsections** are pages whose `parent.id` matches the `id` field of their parent section.

### PageBlock

Each block represents one item (image, video, audio, or PDF) shown in the viewer:

```
id          integer        Block ID — used as the ?item= query param value
order       integer        Position within the page (1, 2, 3, ...)
text        string | null  HTML editorial text displayed beside the item (can be multi-paragraph with headings)
attachments Attachment[]   Always contains exactly one attachment
```

### Attachment

```
id          integer   Attachment ID
caption     string    HTML caption (typically: title and source credit)
item        Item      Item record with metadata and DPLA ID (see below)
files       File[]    Media file URLs (always one file per attachment in practice)
```

### File

```
file_urls.fullsize          URL   Full-size image (primary display in ZoomableImageViewer)
file_urls.square_thumbnail  URL   Square crop used in the gallery thumbnail strip
file_urls.thumbnail         URL   Medium-size thumbnail
file_urls.original          URL   Original file — used for PDFs, video, audio, and as fallback
```

### Item

The `item` object contains Dublin Core metadata stored as a `element_texts` array (a legacy schema from Omeka):

```
element_texts[].element.name   The field name (see table below)
element_texts[].text           The field value
```

| Element Name | Purpose |
|-------------|---------|
| `Title` | Item title |
| `Has Version` | **DPLA item ID** — the 32-character hex ID used to fetch live data from the DPLA Search API |
| `Description` | Item description |
| `Creator` | Creator/artist |
| `Contributor` | Additional contributor |
| `Date` | Date created |
| `Rights` | Rights statement |
| `Identifier` | Legacy item identifier |

The `Has Version` field is the critical link between the exhibition data and the DPLA collection. At page render time, the frontend extracts this ID and fetches the live DPLA item record to display enriched metadata.

---

## How Pages Are Rendered

### Static vs. Server-Side

| Page | Rendering | When |
|------|-----------|------|
| `/exhibitions` | Static (`getStaticProps`) | At build time |
| `/exhibitions/{slug}` | Static (`getStaticProps` + `getStaticPaths`) | At build time, one per exhibition |
| `/exhibitions/{slug}/{section}` | Server-side (`getServerSideProps`) | On each request |
| `/exhibitions/{slug}/{section}/{subsection}` | Server-side (`getServerSideProps`) | On each request |

Section and subsection pages are server-rendered rather than static because they need to process the `?item=` query parameter to determine which block is active in the viewer.

### DPLA API Enrichment

For every block rendered on a page, the server calls the DPLA Search API to fetch the full item record:

```
GET https://api.dp.la/v2/items/{dplaItemId}?api_key={API_KEY}
```

This happens at request time for section/subsection pages and at build time for exhibition home pages. The enriched data is used to display title, creator, contributor, and partner information alongside the item in the viewer.

---

## Page Layouts

### Landing Page (`/exhibitions`)

Grid of cards, one per exhibition, showing the thumbnail image and title. Data comes from `exhibitions.json`.

### Exhibition Home (`/exhibitions/{slug}`)

- Full-width hero image (first block of the `homepage` page)
- Exhibition title and description
- Exhibition credits
- Table of contents listing all sections with links
- "Explore Exhibition" button linking to the first section

### Section & Subsection Pages

All section and subsection pages share the same three-panel layout:

```
┌─────────────────────────────────────────────────────┐
│  Header: Exhibition Title              [Close ×]    │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│   Sidebar    │           Viewer                     │
│              │   [← Prev]  [Active Item]  [Next →]  │
│  Section 1   │                                      │
│   ├ Intro    │   [Thumbnail strip gallery]          │
│   ├ Sub A ◄  │                                      │
│   └ Sub B    │   Caption                            │
│  Section 2   │   Side text (if present)             │
│  Section 3   │                                      │
├──────────────┴──────────────────────────────────────┤
│  [← Previous Section]        [Next Section →]      │
└─────────────────────────────────────────────────────┘
```

- **Sidebar** — Tree of all sections, expanded to show subsections of the current section. Collapsible on mobile.
- **Viewer** — Displays the active item with prev/next arrows. Below it, a scrollable thumbnail strip allows direct navigation to any item.
- **Side text** — If `page_block.text` is non-null, it appears as a column alongside the item (HTML, can include headings and paragraphs).
- **Caption** — From `attachment.caption` (HTML). Typically includes item title and source credit.
- **Footer nav** — Navigates between items, subsections, and sections in reading order.

---

## Media Types & Viewers

The viewer component selects the appropriate player based on file extension or the `item_type.name` field (a legacy field from the Omeka schema):

| Type | Extensions | Viewer Component | Notes |
|------|-----------|-----------------|-------|
| Still Image | `.jpg` `.jpeg` `.png` `.tif` `.tiff` `.gif` | `ZoomableImageViewer` | Pan and zoom; uses `file_urls.fullsize` |
| Moving Image | `.mp4` `.webm` `.ogg` | `VideoPlayer` | HTML5 video |
| Sound | `.mp3` `.wav` | `AudioPlayer` | HTML5 audio |
| PDF | `.pdf` | `PDFViewer` | Embedded; uses `file_urls.original` |

If no matching type is detected, a still image viewer is used as fallback.

---

## Navigation

### Within a Section/Subsection

- Clicking a thumbnail in the gallery updates the `?item={blockId}` query param and re-renders the viewer on that item.
- The prev/next arrows in the viewer advance through blocks in the current page by `order`.

### Between Sections/Subsections

The footer **Previous** and **Next** buttons traverse the full exhibition in reading order:

1. Items within the current subsection/section
2. Next/previous subsection within the current section
3. Next/previous section
4. Disabled (grayed out) at the very beginning or end of the exhibition

Deep links to specific items (`?item=`) are generated for all prev/next navigation, enabling bookmarking and sharing.

### Breadcrumbs & Header Links

- Section/subsection pages show: **Exhibitions › [Exhibition Name]**
- The **[Close ×]** button in the header returns to the exhibition home page
- The **Exhibitions** header link goes to `/exhibitions`

---

## All 32 Current Exhibitions

| Slug | Title |
|------|-------|
| `erie-canal` | Two Hundred Years on the Erie Canal |
| `american-empire` | American Empire |
| `outsiders-president-elections` | Battle on the Ballot: Political Outsiders in US Presidential Elections |
| `leo-frank` | Tragedy in the New South: The Murder of Mary Phagan and the Lynching of Leo Frank |
| `race-to-the-moon` | Race to the Moon |
| `patent-medicine` | Quack Cures and Self-Remedies: Patent Medicine |
| `urban-parks` | Urban Parks in the United States |
| `history-us-public-libraries` | A History of US Public Libraries |
| `industries-settled-montana` | Boom and Bust: The Industries That Settled Montana |
| `children-progressive-era` | Children in Progressive-Era America |
| `home-front-world-war-ii` | Georgia's Home Front: World War II |
| `civilian-conservation-corps` | Roosevelt's Tree Army: The Civilian Conservation Corps |
| `tourism-mountain-west` | Recreational Tourism in the Mountain West |
| `shoe-industry-massachusetts` | Best Foot Forward: The Shoe Industry in Massachusetts |
| `america-world-war-i` | Patriotic Labor: America during World War I |
| `evolution-personal-camera` | In Focus: The Evolution of the Personal Camera |
| `japanese-internment` | Prisoners at Home: Everyday Life in Japanese Internment Camps |
| `transcontinental-railroad` | Building the First Transcontinental Railroad |
| `1918-influenza` | America during the 1918 Influenza Pandemic |
| `american-aviatrixes` | American Aviatrixes: Women with Wings |
| `maps-in-american-culture` | From Colonialism to Tourism: Maps in American Culture |
| `mapping-american-civil-war` | Torn in Two: Mapping the American Civil War |
| `radio-golden-age` | Golden Age of Radio in the US |
| `gold-rush` | Staking Claims: The Gold Rush in Nineteenth-Century America |
| `the-show` | The Show Must Go On! American Theater in the Great Depression |
| `boston-sports-temples` | Boston Sports Temples |
| `history-of-survivance` | History of Survivance: Upper Midwest 19th-Century Native American Narratives |
| `new-deal` | America's Great Depression and Roosevelt's New Deal |
| `spirits` | Indomitable Spirits: Prohibition in the United States |
| `activism` | Activism in the US |
| `this-land` | This Land Is Your Land: Parks and Public Spaces |
| `breadandroses` | Bread and Roses Strike of 1912 |

---

## How to Edit Exhibitions

Because exhibition content lives in JSON files (not a live CMS), changes require editing those files and deploying a new build. The workflow depends on what you're changing.

---

### Editing Text or Captions

**To change exhibition-level text** (description, credits):
Edit the `description` or `credits` field at the top of `exhibitions-data/{slug}.json`. Both accept HTML.

**To change a section's side text:**
Find the page with the matching `slug` in the `pages` array, then find the relevant `page_block` by its `order` value, and edit its `text` field. HTML is accepted.

**To change an item caption:**
In the page block's `attachments[0].caption` field. HTML is accepted.

---

### Changing a Section or Subsection Title

Find the page object by its `slug` in the `pages` array and update its `title` field.

---

### Changing the Display Order of Sections or Items

- **Section order:** Update the `order` integers on the page objects with `parent: null`. Values are 0-based; `order: 0` is always the homepage and should not be reordered.
- **Item order within a section:** Update the `order` integers on the `page_block` objects within that page.

---

### Changing the Hero Image or Thumbnail

**Exhibition hero image** (shown on the exhibition home page):
Edit `file_urls.fullsize` in `page_blocks[0].attachments[0].files[0]` of the `homepage` page.

**Exhibition thumbnail** (shown on the `/exhibitions` landing page grid):
Edit the `thumbnailUrl` field for this exhibition in `exhibitions-data/exhibitions.json`.

---

### Adding a New Item to a Section

Add a new `page_block` object to the target page's `page_blocks` array. Required fields:

```json
{
  "id": 9999,
  "order": 5,
  "text": "<p>Optional editorial text...</p>",
  "attachments": [
    {
      "id": 9999,
      "caption": "<p>Caption text and source credit.</p>",
      "item": {
        "id": 9999,
        "element_texts": [
          { "text": "Item Title", "element": { "name": "Title", "id": 1 }, "element_set": { "name": "Dublin Core", "id": 1 }, "html": false },
          { "text": "abc123...32hexchars", "element": { "name": "Has Version", "id": 42 }, "element_set": { "name": "Dublin Core", "id": 1 }, "html": false }
        ]
      },
      "files": [
        {
          "id": 9999,
          "file_urls": {
            "fullsize": "https://...",
            "square_thumbnail": "https://...",
            "thumbnail": "https://...",
            "original": "https://..."
          }
        }
      ]
    }
  ]
}
```

The `id` values must be unique integers across the entire exhibition file. The `Has Version` element's `text` must be a valid 32-character DPLA item ID — this is what links the exhibit item to the live DPLA collection record.

---

### Adding a New Section

Add a new page object to the `pages` array with `parent: null`:

```json
{
  "id": 700,
  "slug": "new-section-slug",
  "title": "New Section Title",
  "order": 6,
  "parent": null,
  "page_blocks": [ ... ]
}
```

Set `order` to the next available integer after existing sections.

---

### Adding a New Subsection

Add a page object with `parent` pointing to the `id` of the parent section:

```json
{
  "id": 701,
  "slug": "new-subsection-slug",
  "title": "New Subsection Title",
  "order": 3,
  "parent": { "id": 700 },
  "page_blocks": [ ... ]
}
```

The `parent.id` must match the `id` field of the parent section page.

---

### Adding a Completely New Exhibition

1. **Create** `exhibitions-data/{new-slug}.json` following the structure of an existing file.
2. **Add an entry** to `exhibitions-data/exhibitions.json`:
   ```json
   { "title": "Exhibition Title", "slug": "new-slug", "thumbnailUrl": "https://..." }
   ```
3. The new exhibition will appear on the landing page and have its home page statically generated on the next build.

---

### Deploying Changes

After editing any file in `exhibitions-data/`:

1. Commit and push the changes to the `main` branch (or open a PR)
2. The deployment pipeline will rebuild and redeploy the site
3. Static pages (`/exhibitions` and all exhibition home pages) will be regenerated at build time; no cache purge is needed for section/subsection pages as they are server-rendered

---

## Key Files

| File / Directory | Purpose |
|-----------------|---------|
| `exhibitions-data/exhibitions.json` | Exhibition index — titles, slugs, thumbnails |
| `exhibitions-data/{slug}.json` | Full content for each exhibition |
| `pages/exhibitions/index.js` | Landing page |
| `pages/exhibitions/[exhibitionSlug]/index.js` | Exhibition home page |
| `pages/exhibitions/[exhibitionSlug]/[sectionSlug]/index.js` | Section page |
| `pages/exhibitions/[exhibitionSlug]/[sectionSlug]/[subsectionSlug]/index.js` | Subsection page |
| `lib/exhibitionsStatic.js` | All data-loading functions (`loadExhibition`, `processPageBlocks`, etc.) |
| `lib/getDplaItemIdFromExhibit.js` | Extracts DPLA item ID from the `element_texts` array |
| `components/ExhibitionsComponents/` | All UI components for exhibitions |
| `components/ExhibitionsComponents/ExhibitionSection/Viewer.js` | Media viewer + gallery + media type dispatch |
| `components/ExhibitionsComponents/ExhibitionSection/Sidebar.js` | Section/subsection navigation tree |
| `components/ExhibitionsComponents/ExhibitionSection/FooterNav.js` | Prev/next navigation |
| `constants/exhibitions.js` | Site-wide exhibition constants (title, description, media type names) |
