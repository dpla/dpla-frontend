# About Pages

`/pages/about` handles the CMS-driven "About Us" section of the site — a family of informational pages whose content and navigation structure are managed entirely in WordPress via the **About Us menu**.

## Routes

| URL pattern | File | Notes |
|-------------|------|-------|
| `/about` | `pages/about/index.js` | Legacy entry point; accepts `?section=` and `?subsection=` query params |
| `/about/[slug]` | `pages/about/[...sections].js` | Top-level About page (e.g. `/about/about-us`) |
| `/about/[parent]/[child]` | `pages/about/[...sections].js` | Sub-page (e.g. `/about/about-us/funders`) |

Both files render the same `AboutMenuPage` class component. The index route exists as a legacy fallback for older query-param-style links; all new links use the clean-URL `[...sections]` route.

## How Pages Are Generated

All pages are **server-side rendered on every request** using `getServerSideProps`. On each load:

1. The WordPress **site settings** ACF field (`guides_endpoint`) is fetched to identify the Guides parent menu item — that item and all its children are **excluded** from this section (they belong to `/guides`).
2. The full **About Us menu** is fetched from the WP REST API (`/wp-json/menus/v1/menus/about-us`).
3. The page slug is resolved from the URL (or query params on the index route).
4. The matching menu item's WordPress page content is fetched by its page ID or URL.
5. Breadcrumbs are built from the menu hierarchy for sub-pages.

**External links** in WordPress page content are automatically processed client-side by `wordpressLinks()` (adds `target="_blank"` and `rel` attributes).

## Layout

- **Top-level pages** (no parent in the menu) render a `FeatureHeader` with the page title and no breadcrumbs.
- **Sub-pages** render a `BreadcrumbsModule` and a page `<h1>` injected from WordPress.
- All pages show a **`ContentPagesSidebar`** on the left, populated from the full About Us menu.

## Where Content Is Managed

All page content lives in **WordPress** (`dpla.wpengine.com/wp-admin`):

- **Page text**: standard WordPress page content editor (`Pages` → edit the relevant page)
- **Navigation structure** (what appears in the sidebar, what URLs exist): `Appearance → Menus → About Us`
- Adding a new top-level section: add it as a top-level item in the About Us menu
- Adding a sub-page: add it as a child item in the About Us menu

No code changes are needed to add, remove, or reorder pages — only the WP menu needs updating.

## Current Pages

These are the pages currently in the About Us menu that are rendered by this route (guides excluded):

| Title | Slug | URL |
|-------|------|-----|
| About Us | `about-us` | `/about/about-us` |
| → Board of Directors | `board` | `/about/about-us/board` |
| → Staff | `dpla-staff` | `/about/about-us/dpla-staff` |
| → Funders | `funders` | `/about/about-us/funders` |
| → Credits | `credits` | `/about/about-us/credits` |
| Frequently Asked Questions | `frequently-asked-questions` | `/about/frequently-asked-questions` |
| → Statement on Potentially Harmful Content | `harmful-language-statement` | `/about/frequently-asked-questions/harmful-language-statement` |
| → Search Tips | `search-tips` | `/about/frequently-asked-questions/search-tips` |
| → Copyright Status Filter | `rights-categories` | `/about/frequently-asked-questions/rights-categories` |
| Terms & Conditions | `terms-conditions` | `/about/terms-conditions` |
| → Privacy Policy | `privacy-policy` | `/about/terms-conditions/privacy-policy` |
| Cultural Heritage Transition | `a-new-home-for-americas-digital-heritage` | `/about/a-new-home-for-americas-digital-heritage` |
| News | `news-2` | `/about/news-2` |

> **Note:** The About Us menu also contains the **Guides** parent item ("How Can I Use DPLA?") and its children. Those are explicitly excluded from this route — any request matching a guides item returns a 404 here, as guides are handled by `/pages/guides`.
