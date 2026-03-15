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

> **Primary Source Sets data is served entirely from the DPLA Search API.** It is not stored in WordPress, and it is not in JSON files in this repository.

All PSS data is fetched at request time from:

```
https://api.dp.la/v2/pss/sets              — list of all sets
https://api.dp.la/v2/pss/sets/{slug}       — full data for one set
https://api.dp.la/v2/pss/sources/{id}      — individual source item
```

(In production the frontend uses the internal API URL `https://api-internal.dp.la/v2` via the `API_URL` environment variable, but the public `https://api.dp.la/v2` endpoints are identical and publicly accessible with an API key.)

### Historical note: pss-json and WordPress CPT

- **pss-json** was a separate micro-service that previously served PSS data in this same JSON-LD format. It no longer exists. As of February 2023, the frontend was migrated to consume PSS data directly from the main DPLA API (`/v2/pss/`).
- **WordPress** has a `primary_source_set` custom post type registered (with ACF support), but it contains zero posts and is not used. PSS content is not managed through the WordPress CMS.

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

Because PSS content lives in the DPLA API (not in this repository), **adding or editing a set requires changes to the DPLA platform's data layer, not to dpla-frontend**. No code change or redeployment of this frontend is needed for content updates — the site fetches live data on every request.

The workflow for curating PSS content is:

### What content editors control (via DPLA platform/ingestion pipeline)

- **Set metadata**: title, representative image, thumbnail, date created, author(s) and affiliations, subject tags, time period tags
- **Overview text**: Markdown displayed with "Show more/less" on the set page
- **Sources**: The list of primary source items in the set — each with title, description (Markdown), media file URL, thumbnail, provenance, copyright, and citation
- **Teaching Guide**: Discussion questions and classroom activities (both Markdown); guide author(s)
- **Additional Resources**: Markdown text with links to supplementary materials
- **Related Sets**: Cross-references to other PSS sets

### What the data looks like at the API level

To inspect any live set's full data structure:
```
https://api.dp.la/v2/pss/sets/{slug}?api_key={YOUR_KEY}
```
For example:
```
https://api.dp.la/v2/pss/sets/boston-massacre?api_key={YOUR_KEY}
```

To see all sets:
```
https://api.dp.la/v2/pss/sets?api_key={YOUR_KEY}
```

### What requires a frontend code change

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
