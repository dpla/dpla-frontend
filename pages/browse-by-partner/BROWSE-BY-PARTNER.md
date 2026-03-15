# Browse by Partner

`/browse-by-partner` is a single, fully dynamic listing page that shows every DPLA contributing partner (Hub) alongside the number of items they have contributed. Each entry is a link that runs a pre-filtered search for that partner's items.

The page is prominently linked from the main navigation and the site footer on all three site environments (user, pro, and local/hub sites that opt in).

## Route

| URL | File |
|-----|------|
| `/browse-by-partner` | `pages/browse-by-partner/index.js` |

There are no sub-routes or dynamic segments — it is always a single page.

## How the Page Is Generated

The page is **server-side rendered on every request** (`getServerSideProps`). No content comes from WordPress or any static file. The data pipeline is:

1. On each page load, the server calls the **DPLA Items API** with a `facets` parameter and `facet_size=1000`, requesting zero result items (only facet data):
   ```
   GET {API_URL}/items?api_key={API_KEY}&facets=provider.name&facet_size=1000
   ```
2. The API returns a `provider.name` facet containing every contributing partner and their current item count — **44 partners** as of March 2026.
3. The list is mapped to `{ name, facet, itemCount }` objects and passed as props to the React component.
4. Each partner is rendered as a link to `/search?partner="<Partner Name>"`, which runs a pre-filtered search.

Because the data comes live from the API, the partner list and item counts are **always up to date** — no manual editing or deploys are needed when partners are added, removed, or their counts change.

## Local/Hub Site Variant

When running in `local` site mode (`NEXT_PUBLIC_SITE_ENV=local`), the page behaves differently:

- It facets on `dataProvider` (individual contributing institutions) instead of `provider.name` (top-level Hubs).
- It applies the local site's `filters` and `tags` from `constants/local.js` to scope results to that hub's content only.
- Search links use `?provider=` instead of `?partner=`.
- The page is only shown in the navigation if the local config has `hasBrowseByPartner: true`.

This means a hub site gets a "Browse by Partner" page listing **its own contributing institutions**, not the full national partner list.

## Where to Edit Things

| What | Where |
|------|-------|
| Page title & description | `constants/browse-by-partner.js` — edit `TITLE` and `DESCRIPTION` constants |
| Partner list & item counts | Automatic — sourced live from the DPLA API; no editing needed |
| Layout / card styling | `components/PartnerBrowseComponents/PartnerBrowseContent.module.scss` |
| Card/link rendering logic | `components/PartnerBrowseComponents/index.js` |
| API endpoint / key | Environment variables `API_URL` and `API_KEY` |
| Show/hide in local hub nav | `hasBrowseByPartner: true/false` in the hub's entry in `constants/local.js` |

## Where the Page Is Linked

- **Main navigation** — `components/MainLayout/components/shared/NavigationUser.js`
- **Footer** — `components/MainLayout/components/Footer/FooterUser.js` (two locations: main footer links and secondary footer)
- **Local/hub navigation** — `components/MainLayout/components/shared/NavigationLocal.js` (only if `hasBrowseByPartner: true` in the hub config)
- **Error page links** — `components/ErrorComponents/ErrorLinksUser.js`
- **Search filter error** — `components/SearchComponents/FilterQueryError.js`

## There Is No CMS Integration

Unlike guides or other content pages, Browse by Partner has **no WordPress dependency**. The partner names, item counts, and links are all derived at runtime from the DPLA API facet response. The only things that can be edited in code are the page title and description in `constants/browse-by-partner.js`.
