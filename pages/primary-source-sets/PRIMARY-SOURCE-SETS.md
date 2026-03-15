# Primary Source Sets (`/primary-source-sets`)

## Overview

Primary Source Sets (PSS) are curated educational collections pairing primary source documents — images, audio, video, PDFs — with teaching guides, discussion questions, and classroom activities. They are aimed at K–12 educators and students and are developed by educators in partnership with DPLA.

There are currently **142 sets** live on the site. They are linked from the site header and from the Pro site. Example URLs:

- `https://dp.la/primary-source-sets` — landing page
- `https://dp.la/primary-source-sets/boston-massacre` — individual set
- `https://dp.la/primary-source-sets/boston-massacre/sources/1234` — individual source
- `https://dp.la/primary-source-sets/boston-massacre/teaching-guide` — teaching guide

---

## Where PSS Content Lives

PSS content flows through a three-layer pipeline:

```
github.com/dpla/pss-json   →   Elasticsearch (dpla_pss alias)   →   DPLA API   →   dpla-frontend
  (canonical source)              (indexed by hand)                 /v2/pss/        (this repo)
```

### 1. Canonical source: `dpla/pss-json` repo

**https://github.com/dpla/pss-json** is the repository where all PSS content is authored and maintained. It is a data repository with a build script — not a running service. All edits to PSS content start here.

The repo has 142 set directories under `data/`, one per set:

```
data/
  boston-massacre/
    set.json          — set metadata, overview, source list, related sets
    guide.json        — teaching guide (questions and activities in Markdown)
    items/
      18.json         — individual source item
      19.json
      ...
    updated_boston-massacre.json   — merged output produced by pss-merge.py (committed)
```

A Python script `pss-merge.py` merges each set's source files into a single `updated_{slug}.json` document.

### 2. Indexing: Elasticsearch

After running `pss-merge.py`, the `updated_*.json` files are manually indexed into Elasticsearch under the `dpla_pss` alias using `curl` commands documented in the repo's README. This is a manual step run by DPLA staff after each content change.

### 3. Serving: DPLA API

The DPLA API serves the Elasticsearch data at these endpoints, which this frontend calls at request time:

```
/v2/pss/sets              — list of all sets
/v2/pss/sets/{slug}       — full data for one set
/v2/pss/sources/{id}      — individual source item
```

In production the frontend uses `https://api-internal.dp.la/v2` (via the `API_URL` environment variable). The public equivalent `https://api.dp.la/v2` is accessible with an API key.

### WordPress CPT note

WordPress has a `primary_source_set` custom post type registered (with ACF support) but it contains zero posts and is not used. PSS content is not managed through WordPress.

---

## URL Structure & Routing

| URL Pattern | Page Type | Next.js File |
|-------------|-----------|-------------|
| `/primary-source-sets` | Landing — filterable grid of all sets | `pages/primary-source-sets/index.js` |
| `/primary-source-sets/[set]` | Set home — sources, overview, metadata | `pages/primary-source-sets/[set]/index.js` |
| `/primary-source-sets/[set]/teaching-guide` | Teaching guide — questions and activities | `pages/primary-source-sets/[set]/teaching-guide.js` |
| `/primary-source-sets/[set]/teaching-guide-print` | Printable teaching guide | `pages/primary-source-sets/[set]/teaching-guide-print.js` |
| `/primary-source-sets/[set]/additional-resources` | Additional resources | `pages/primary-source-sets/[set]/additional-resources.js` |
| `/primary-source-sets/[set]/sources/[source]` | Individual source viewer | `pages/primary-source-sets/[set]/sources/[source].js` |

**All pages use `getServerSideProps`** — content is fetched fresh on every request. Nothing is statically generated, so updates to the API are immediately reflected without a redeploy.

**Slug extraction:** The `[set]` segment is extracted from the API's `@id` field using the regex `/\/primary-source-sets\/sets\/([-\w]*)/`. The `[source]` segment is a numeric ID extracted with `/\/primary-source-sets\/sources\/(\d+)/`.

---

## Data Model

PSS data uses JSON-LD with schema.org vocabulary. The top-level response from `/v2/pss/sets` returns an array of set objects; `/v2/pss/sets/{slug}` returns a single full set.

### Set object

```
@id             URL       API identifier; slug is extracted from this
@type           string    "CreativeWork"
name            string    Set title (may contain asterisks used as formatting)
repImageUrl     URL       Representative/hero image for the set
thumbnailUrl    URL       Fallback thumbnail
dateCreated     string    ISO date (e.g. "2016-04-08")
author          Author[]  Educators who created the set (see below)
about           Tag[]     Subject and time period tags (see below)
hasPart         Part[]    All content parts: sources, overview, teaching guide, resources (see below)
isRelatedTo     Set[]     Related sets (same structure, partial — slug and image only)
```

### Author

```
@type           "Person"
name            string          Educator name
affiliation     Organization    { "@type": "Organization", "name": "Institution name" }
```

### Tag (about array)

```
name                        string   Tag label (e.g. "US History", "Civil War and Reconstruction (1850-1877)")
disambiguatingDescription   string   "Subject" or "Time Period"
sameAs                      URL      Canonical URL (present on Time Period tags only)
```

### Part (hasPart array)

The `hasPart` array mixes several different content types, distinguished by `name` and `disambiguatingDescription`:

| Type | name | disambiguatingDescription | Key fields |
|------|------|--------------------------|------------|
| Overview | `"Overview"` | (none) | `text` (Markdown) |
| Source | `"Source N"` | `"source"` | `@id`, `name`, `thumbnailUrl`, `useDefaultImage` |
| Teaching Guide | `"Teaching Guide"` | `"guide"` | `author`, `hasPart` (see below) |
| Resources | `"Resources"` | (none) | `name`, `text` (Markdown) |

**Teaching Guide sub-parts** (nested `hasPart` within the guide):
```
name    "Questions"   text: Markdown — discussion questions
name    "Activity"    text: Markdown — classroom activities
```

### Source object (from `/v2/pss/sources/{id}`)

> Note: source responses are fetched as plain text and sanitized before JSON parsing (`\r\n` characters are stripped) due to a quirk in the API response format.

```
@id             URL             API identifier
@type           "CreativeWork"
name            string          Source title
text            string          Description (Markdown; truncated to 600 chars in display with "Show full" toggle)
thumbnailUrl    URL             Thumbnail image
copyright       string          Copyright notice
mainEntity      MediaEntity[]   One or more media objects (see below)
```

### MediaEntity (mainEntity array)

```
@type                   string            "ImageObject" | "AudioObject" | "VideoObject" | "MediaObject" (PDF)
associatedMedia         Media[]
  contentUrl            URL               Media file URL (may be a relative path; frontend reconstructs full URL)
  fileFormat            string            MIME type (image/jpeg, audio/mp3, video/mp4, application/pdf)
dct:references          WebPage[]
  @id                   URL               Link to original item at source institution
dct:provenance          Organization      { name: "Providing institution" }
citation                Citation[]
  disambiguationDescription   "citation" | "credits"
  text                        string      Citation text or source credit
```

---

## Page Types & Layouts

### Landing Page (`/primary-source-sets`)

- Grid of all 142 set cards, each showing thumbnail, title, time period, and subject tags
- **Subject filter** dropdown (15 options) and **Time Period filter** dropdown (11 options)
- Filters update the URL query string and re-fetch from the API with `&filter=about.name:{value}` parameters
- Tags on individual set cards are clickable and apply that filter
- Data: full set list fetched from `/v2/pss/sets`

### Set Page (`/primary-source-sets/[set]`)

```
┌────────────────────────────────────────────────────────┐
│  Hero image banner with set title overlay              │
├────────────────────────────┬───────────────────────────┤
│                            │  Sidebar                  │
│  Overview (Markdown)       │  - Created By (authors)   │
│  [Show more / Show less]   │  - Time Period (linked)   │
│                            │  - Subjects (linked)      │
│  Tabs:                     │  - Cite This Set          │
│  [Source Set]              │  - Share to Google        │
│  [Additional Resources]    │    Classroom              │
│  [Teaching Guide]          │                           │
│                            │                           │
│  Grid of source cards      │                           │
│                            │                           │
├────────────────────────────┴───────────────────────────┤
│  Related Sets carousel (react-slick)                   │
└────────────────────────────────────────────────────────┘
```

### Teaching Guide Page (`/primary-source-sets/[set]/teaching-guide`)

- Same header/breadcrumbs as set page
- **Discussion Questions** section (Markdown from guide's `hasPart[name="Questions"]`)
- **Classroom Activities** section (Markdown from guide's `hasPart[name="Activity"]`)
- Static sidebar sections: "About This Guide", "Primary source analysis" tools, "Additional tools" (links to National Archives and Library of Congress)
- "Created By" author list (from `teachingGuide.author`)
- Print button linking to `teaching-guide-print`

### Printable Teaching Guide (`/primary-source-sets/[set]/teaching-guide-print`)

- Minimal layout (no site header/footer)
- Automatically triggers `window.print()` on load
- Shows title, questions, activities, and a PSS footer

### Additional Resources Page (`/primary-source-sets/[set]/additional-resources`)

- Same header/tabs as set page
- Renders Markdown from `set.hasPart[name="Resources"]` via react-markdown

### Source Page (`/primary-source-sets/[set]/sources/[source]`)

```
┌───────────────────────────────────────────────────────────┐
│  [← Prev Source]  Source N of M in [Set Name]  [Next →]  │
├─────────────────────────────┬─────────────────────────────┤
│                             │  Sidebar                    │
│  h1: Source title           │  - Cite This Source         │
│                             │  - "Courtesy of" credit     │
│  Media viewer               │  - Provenance institution   │
│  (image/audio/video/PDF)    │  - Copyright                │
│                             │  - View item info (dp.la)   │
│  Description [Show full]    │  - View in {Partner} ↗      │
│                             │  - Tips for Students        │
│                             │    (POV, purpose, context,  │
│                             │     audience — static)      │
└─────────────────────────────┴─────────────────────────────┘
│  Source thumbnail carousel (all sources in set)           │
└───────────────────────────────────────────────────────────┘
```

---

## Media Types & Viewers

The source viewer selects a player based on `mainEntity[0]["@type"]`:

| @type | Viewer Component | Thumbnail Fallback |
|-------|-----------------|-------------------|
| `ImageObject` | `ZoomableImageViewer` (pan/zoom) | Image itself |
| `AudioObject` | `AudioPlayer` (HTML5) | `Sound.svg` placeholder |
| `VideoObject` | `VideoPlayer` (HTML5) | `Video.svg` placeholder |
| `MediaObject` | `PDFViewer` (embedded) | PDF icon |

Media URLs in `contentUrl` may be relative paths; the frontend reconstructs full URLs by extracting the domain from the `thumbnailUrl` field.

---

## Filtering (Landing Page)

### Subject Options (15)
US History, American Literature, Science and Technology, World History, Arts, African Americans, Asian Americans, Labor History, Latino Americans, Law and Government, Migration, Native Americans, Social Movements, Women

### Time Period Options (11)
Three Worlds Meet (Beginnings to 1620), Colonization and Settlement (1585–1763), Revolution and the New Nation (1754–1820s), Expansion and Reform (1801–1861), Civil War and Reconstruction (1850–1877), The Development of the Industrial United States (1870–1900), The Emergence of Modern America (1890–1930), The Great Depression and World War II (1929–1945), Postwar United States (1945 to early 1970s), Contemporary United States (1968 to the present)

Filter values and their URL slugs are defined in `constants/primarySourceSets.js`.

---

## Educational Features

### Teaching Guides
Every set includes a teaching guide with discussion questions and classroom activities authored by educators. The guide lives in `set.hasPart` with `disambiguatingDescription: "guide"`.

### Google Classroom Integration
A "Share to Google Classroom" button appears on set and source pages. It opens Google Classroom's pre-fill URL with the current page URL. The `/teaching-guide` and `/additional-resources` path suffixes are stripped before sharing so the shared link points to the set root.

### Citations
- **Set citation:** Uses the shared `CiteButton` with author list, year, and current URL
- **Source citation:** Free-text citation from `mainEntity[0].citation` (the entry with `disambiguatingDescription: "citation"`)
- **Source credits:** From the `"credits"` citation entry; displayed as "Courtesy of" in the sidebar

### Tips for Students
A static sidebar section on every source page with four prompts: Point of View, Purpose, Context, Audience. This content is hardcoded in the component, not data-driven.

### National History Day
A footer link on all PSS pages points to `https://pro.dp.la/education/national-history-day` (constant `PSS_NHD_URL`).

---

## Navigation

### Between Sources (Source Page)
- **Previous/Next buttons** in the page header navigate to adjacent sources in the set by index
- **Carousel** below the viewer shows thumbnails of all sources; clicking navigates to that source
- Both disabled at the ends of the set

### Between Pages (Set Page Tabs)
Three tabs on the set page link to:
- `/primary-source-sets/[set]` — Source Set (default)
- `/primary-source-sets/[set]/additional-resources`
- `/primary-source-sets/[set]/teaching-guide`

### Breadcrumbs
All set and source pages show: **Primary Source Sets › [Set Name]**

---

## How to Add or Edit a Primary Source Set

**All content changes are made in the `dpla/pss-json` repository, not in this one.** No code change or redeployment of dpla-frontend is needed for content updates — the frontend fetches live data from the API on every request.

### Full workflow for a content change

1. **Clone or pull `dpla/pss-json`**
   ```
   git clone https://github.com/dpla/pss-json
   ```

2. **Edit the source files** for the set you're updating (see file reference below)

3. **Run the merge script** from the repo root:
   ```
   python3 pss-merge.py ./data
   ```
   This regenerates `updated_{slug}.json` for every set.

4. **Commit and push** the changes (both the source files and the regenerated `updated_*.json`)

5. **Index the updated set(s) into Elasticsearch** following the instructions in the pss-json README (manual `curl` commands to the `dpla_pss` ES alias)

6. **Verify** by visiting `https://dp.la/primary-source-sets/{slug}` — changes appear immediately since all pages are server-rendered

---

### File reference: what to edit in `dpla/pss-json`

#### Editing set metadata, overview, or sources list — `data/{slug}/set.json`

This file controls:
- `name` — set title
- `repImageUrl` / `thumbnailUrl` — hero and thumbnail images
- `dateCreated` — publication date
- `author` — educator author(s) and affiliations
- `about` — subject and time period tags
- The overview text (`hasPart` entry with `name: "Overview"`, `text` in Markdown)
- The list of sources (`hasPart` entries with `disambiguatingDescription: "source"`)
- Additional resources (`hasPart` entry with `name: "Resources"`, `text` in Markdown)
- Related sets (`isRelatedTo` array)

#### Editing discussion questions or classroom activities — `data/{slug}/guide.json`

This file controls the teaching guide content:
- `author` — guide author(s) and affiliations
- `hasPart[name="Questions"]` → `text` — Markdown discussion questions
- `hasPart[name="Activity"]` → `text` — Markdown classroom activities

#### Editing an individual source — `data/{slug}/items/{id}.json`

Each source file controls:
- `name` — source title
- `text` — description (Markdown; shown with "Show full" toggle at 600 chars)
- `thumbnailUrl` — thumbnail image
- `copyright` — copyright notice
- `mainEntity` — the media object (`@type`, `contentUrl`, `fileFormat`)
- `dct:provenance` — providing institution
- `dct:references` — link to original item at source institution
- `citation` — citation text and credits ("Courtesy of")

#### Adding a new source to a set

1. Create `data/{slug}/items/{newId}.json` following the schema of an existing item file
2. Add the source reference to `set.json`'s `hasPart` array:
   ```json
   {
     "@id": "https://dp.la/primary-source-sets/sources/{newId}",
     "@type": "CreativeWork",
     "disambiguatingDescription": "source",
     "name": "Source title",
     "thumbnailUrl": "https://..."
   }
   ```
3. Run `pss-merge.py` and re-index

#### Adding a completely new set

1. Create `data/{new-slug}/` with `set.json`, `guide.json`, and `items/` following existing set structures
2. Run `pss-merge.py` to generate `updated_{new-slug}.json`
3. Index the new set into Elasticsearch
4. The new set will appear on the landing page automatically (all sets are fetched on every request)

If the set's subject or time period tags don't match any existing filter options, also add them to `constants/primarySourceSets.js` in this repo (see below).

---

### Inspecting live data

To view any set's current API data:
```
https://api.dp.la/v2/pss/sets/{slug}?api_key={YOUR_KEY}
https://api.dp.la/v2/pss/sets/boston-massacre?api_key={YOUR_KEY}
```

To list all sets:
```
https://api.dp.la/v2/pss/sets?api_key={YOUR_KEY}
```

---

### What requires a change in *this* repo (dpla-frontend)

The frontend code only needs to change if you want to:
- Add a new **Subject** or **Time Period** filter option — update `constants/primarySourceSets.js`
- Change the static **Tips for Students** sidebar text — edit `Source/components/ContentAndMetadata/index.js`
- Change the static **"About This Guide"** sidebar text or external tool links — edit `SingleSet/TeachersGuide/index.js`
- Change **page layout, styling, or navigation behavior**

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `API_URL` | DPLA API base URL (e.g. `https://api-internal.dp.la/v2`) |
| `API_KEY` | DPLA API key — injected server-side, never exposed to browser |
| `BASE_URL` | Frontend base URL (e.g. `https://dp.la`) — used for share/cite URLs |

---

## Key Files

| File | Purpose |
|------|---------|
| `pages/primary-source-sets/index.js` | Landing page — fetches all sets, renders filters and grid |
| `pages/primary-source-sets/[set]/index.js` | Set page — fetches full set, renders tabs and source grid |
| `pages/primary-source-sets/[set]/teaching-guide.js` | Teaching guide page |
| `pages/primary-source-sets/[set]/teaching-guide-print.js` | Printable guide — triggers `window.print()` |
| `pages/primary-source-sets/[set]/additional-resources.js` | Additional resources page |
| `pages/primary-source-sets/[set]/sources/[source].js` | Source viewer — fetches set + source, renders media |
| `components/PrimarySourceSetsComponents/AllSets/` | Landing page components (filter bar, set cards grid) |
| `components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo/` | Set banner, overview, metadata sidebar |
| `components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs/` | Tab navigation component |
| `components/PrimarySourceSetsComponents/SingleSet/TeachersGuide/` | Teaching guide layout |
| `components/PrimarySourceSetsComponents/SingleSet/RelatedSets/` | Related sets carousel |
| `components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata/` | Source media viewer + metadata sidebar |
| `components/PrimarySourceSetsComponents/Source/components/SourceCarousel/` | Source thumbnail carousel + prev/next nav |
| `components/PrimarySourceSetsComponents/PSSFooter/` | Footer with NHD link |
| `constants/primarySourceSets.js` | Subject and time period filter options and slug mappings |
| `lib/extractSourceSetSlug.js` | Extracts set slug from API `@id` URL |
| `lib/extractSourceId.js` | Extracts source numeric ID from API `@id` URL |
