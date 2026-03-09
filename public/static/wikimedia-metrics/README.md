# Wikimedia Metrics Dashboard

Displays Wikimedia Commons category page view data for DPLA hubs and contributing institutions. Live at `/projects/dpla-wikimedia/metrics`.

---

## Files

| File | Purpose |
|------|---------|
| `pages/projects/dpla-wikimedia/metrics.js` | Next.js page — site layout, SSR, script loading |
| `public/static/wikimedia-metrics/metrics.js` | Dashboard logic — API calls, panel rendering, charts |
| `public/static/wikimedia-metrics/wikimedia-metrics.css` | Dashboard styles, scoped to `.wikimedia-metrics-wrapper` |

The static assets (`metrics.js`, `wikimedia-metrics.css`) are loaded client-side at runtime rather than bundled, so changes to them take effect as soon as the files are deployed without requiring a Next.js rebuild.

---

## URL parameters

The dashboard behavior is entirely driven by query parameters. All views are shareable/linkable.

| Parameter | Value | Behavior |
|-----------|-------|----------|
| *(none)* | — | Shows the three search/browse forms |
| `?show=all` | — | Renders every category in the allow list as collapsible panels |
| `?show=dpla` | — | Renders the DPLA root category + two grouped sections (List of Hubs, List of Contributing Institutions) |
| `?show=<category>` | Any allowed category name | Renders and auto-opens a single category panel |
| `?hub=<name>` | Hub display name with spaces as underscores (e.g. `Digital_Commonwealth`) | Renders a single hub and its child institutions |

The `show` and `hub` parameters are also read server-side (in `getServerSideProps`) to apply the `filter-view` CSS class before the page is sent to the browser, preventing a flash of the form UI on direct loads of filtered URLs.

---

## External APIs

### Wikimedia GitLab — allow list
```text
https://gitlab.wikimedia.org/api/v4/projects/repos%2Fdata-engineering%2Fairflow-dags/repository/files/main%2Fdags%2Fcommons%2Fcommons_category_allow_list.tsv/raw?ref=main
```
A plain-text TSV file (one category name per line) listing all categories for which pageview data is available. Fetched on every page load. The dashboard only renders categories that appear in this list.

### Wikimedia Analytics REST API — pageview data
```text
https://wikimedia.org/api/rest_v1/metrics/commons-analytics/pageviews-per-category-monthly/{category}/deep/all-wikis/00000101/99991231
```
Returns monthly pageview counts for a single category, from the earliest available date to the present. The `deep` parameter includes pageviews from subcategories. Called once per panel when it is first opened (results cached in `content.dataset.loaded` to prevent redundant fetches on re-open).

[API docs](https://wikimedia.org/api/rest_v1/#/Commons%20Analytics%20Data/get_metrics_commons_analytics_pageviews_per_category_monthly__category__depth__access__start__end_)

### Wikimedia Commons MediaWiki API — category tree
```text
https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtype=subcat&...
```
Used only for the `?show=dpla` and `?hub=` views to walk two levels of the Commons subcategory tree under the DPLA root (`Category:Media contributed by the Digital Public Library of America`). All hub-level fetches are made in parallel (`Promise.all`). Pagination is handled automatically via `cmcontinue` tokens.

---

## Architecture

### Script loading order

`metrics.js` depends on `google.visualization`, which is loaded asynchronously by the Google Charts loader. To guarantee the correct order, the Next.js page uses `onReady` (not `onLoad`) on the Charts `<Script>` tag:

```jsx
<Script
  src="https://www.gstatic.com/charts/loader.js"
  strategy="afterInteractive"
  onReady={() => {
    if (typeof window.initMetrics === "function") {
      window.initMetrics();   // remount: script already loaded, call directly
    } else {
      const s = document.createElement("script");
      s.src = "/static/wikimedia-metrics/metrics.js";
      document.body.appendChild(s);  // first visit: inject and auto-run
    }
  }}
/>
```

`onReady` fires on both the initial load **and** every subsequent client-side remount (e.g. navigating away and back), unlike `onLoad` which fires only once. On the first visit, `metrics.js` is injected and calls `initMetrics()` automatically at the bottom of the script; on remounts, `window.initMetrics` is already defined and is called directly.

`metrics.js` calls `google.charts.load(...)` at parse time, storing the returned promise in `chartsReady`. All panel open paths (auto-open and click) wait on `chartsReady` before calling `fetchData`, guarding against `google.visualization` not yet being available.

### Filter-view flash prevention

Filtered URLs (`?show=`, `?hub=`) should display the dashboard immediately without briefly showing the empty forms. This is handled server-side:

1. `getServerSideProps` reads `context.query.show` and `context.query.hub`.
2. If either is present, `isFilterView: true` is passed as a prop.
3. The wrapper div renders with `class="wikimedia-metrics-wrapper filter-view"` in the initial HTML.
4. CSS rules hide the forms and show the dashboard container from the very first paint:
   ```css
   .wikimedia-metrics-wrapper.filter-view form              { display: none; }
   .wikimedia-metrics-wrapper.filter-view #sections-container { display: block; }
   ```

### CSS scoping

All dashboard styles are prefixed with `.wikimedia-metrics-wrapper` to prevent conflicts with the surrounding pro.dp.la site styles. The wrapper itself is a flex column, which is required for the "BACK" button's `margin-left: auto` right-alignment to work.

---

## Category display names

The `categoryDisplayName()` function in `metrics.js` converts raw category names (underscores, "Media contributed by" prefix) to human-readable labels:

- `Media_contributed_by_the_Foo_Library` → `Foo Library`
- `Media_contributed_by_The_Foo_Library` → `The Foo Library` (uppercase "The" preserved)
- `Some_Other_Category` → `Some Other Category`

---

## Updating the dashboard

**To add or remove categories:** Edit the allow list TSV in the Wikimedia GitLab repo linked above. Changes take effect immediately on the next page load — no code changes required.

**To change the DPLA root category:** Update the `DPLA_ROOT` constant in `metrics.js`:
```js
const DPLA_ROOT = 'Category:Media contributed by the Digital Public Library of America';
```

**To change styles:** Edit `wikimedia-metrics.css`. Because it is loaded as a static file, changes are live after deployment without a Next.js rebuild.

**To change the page layout, breadcrumbs, or sidebar:** Edit `pages/projects/dpla-wikimedia/metrics.js`. This file requires a Next.js build and deploy to take effect.
