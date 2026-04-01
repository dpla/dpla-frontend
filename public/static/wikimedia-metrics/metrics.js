// Module-level promise: resolves when the Google Charts library is fully loaded.
// Starting the load here (at script parse time, before DOMContentLoaded) gives
// the library maximum time to initialize, avoiding a race condition where the
// Wikimedia API responds before google.visualization is available.
const chartsReady = google.charts.load('current', { packages: ['corechart', 'line'] });

// In the Next.js/WordPress context, DOMContentLoaded may have already fired by
// the time this script is injected. Check readyState and call immediately if so.
function initMetrics() {

    // URL parameter contract:
    //   ?show=all        → render all categories as collapsible panels
    //   ?show=dpla       → render DPLA root + collapsible Hubs / Contributing Institutions sections
    //   ?show=<category> → render and auto-open a single specific category
    //   ?hub=<name>      → render a single hub and its child institutions
    //   (no parameter)   → show the search/browse forms
    const id       = new URLSearchParams(window.location.search).get('show') ?? 'none';
    const hubParam = new URLSearchParams(window.location.search).get('hub');

    // Target only the h1 inside the dashboard wrapper to avoid touching site-level headings.
    const dashboardH1 = document.querySelector('.wikimedia-metrics-wrapper h1');

    if (id === 'dpla') {
        const dpla_title = 'DPLA Wikimedia Page Views';
        document.title = dpla_title;
        if (dashboardH1) dashboardH1.textContent = dpla_title;
    }
    if (hubParam) {
        // Derive a display-friendly hub name from the URL parameter while the
        // full category lookup is still in progress (avoids a blank title flash).
        const hubTitle = hubParam.replaceAll('_', ' ') + ' Wikimedia Page Views';
        document.title = hubTitle;
        if (dashboardH1) dashboardH1.textContent = hubTitle;
    }

    // Fetch the live allow-list of Wikimedia Commons categories (one category per line)
    // directly from the canonical source via the GitLab REST API.
    const ALLOW_LIST_URL = 'https://gitlab.wikimedia.org/api/v4/projects/repos%2Fdata-engineering%2Fairflow-dags/repository/files/main%2Fdags%2Fcommons%2Fcommons_category_allow_list.tsv/raw?ref=main';

    // Show a loading indicator in the wrapper while the allow-list fetch is in flight.
    // This gives the user feedback and prevents interacting with uninitialized forms.
    const wrapper = document.querySelector('.wikimedia-metrics-wrapper');
    const loadingBanner = document.createElement('p');
    loadingBanner.id = 'metrics-loading-banner';
    loadingBanner.className = 'metrics-status-banner';
    loadingBanner.textContent = 'Loading category data…';
    wrapper.insertBefore(loadingBanner, wrapper.querySelector('#showDpla'));

    fetch(ALLOW_LIST_URL)
        .then(response => {
            if (!response.ok) throw new Error(`GitLab API returned HTTP ${response.status}`);
            return response.text();
        })
        .then(data => {
            loadingBanner.remove();
            const allLines = data.split('\n').filter(line => line.trim() !== '');

            // Always populate the autocomplete datalist with every available
            // category so the search form works regardless of the current view.
            const datalist = document.getElementById('showOptions');
            allLines.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                datalist.appendChild(option);
            });

            const form         = document.getElementById('showForm');
            const input        = document.getElementById('showInput');
            const errorMessage = document.getElementById('errorMessage');
            const showNow      = document.getElementById('show');
            const showDpla     = document.getElementById('showDpla');

            // "Show all" redirects to ?show=all, which re-renders all categories.
            showNow.addEventListener('submit', function (event) {
                event.preventDefault();
                const url = new URL(window.location.href);
                url.searchParams.set('show', 'all');
                window.location.href = url.toString();
            });

            // "Show DPLA institutions only" redirects to ?show=dpla.
            showDpla.addEventListener('submit', function (event) {
                event.preventDefault();
                const url = new URL(window.location.href);
                url.searchParams.set('show', 'dpla');
                window.location.href = url.toString();
            });

            // "Submit" validates the typed category then redirects to ?show=<category>.
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = input.value.trim();

                if (!allLines.some(item => item.toLowerCase() === value.toLowerCase())) {
                    errorMessage.textContent = 'Please select a valid item from the list.';
                    errorMessage.style.display = 'block';
                    return;
                }

                errorMessage.style.display = 'none';
                const url = new URL(window.location.href);
                url.searchParams.set('show', value);
                window.location.href = url.toString();
            });

            const container = document.getElementById('sections-container');

            // ── Panel helpers ────────────────────────────────────────────────────────

            // Appends the "Back" button. `href` defaults to the base URL (no params).
            // Attached once per view, outside any loop, to avoid duplicate listeners.
            function appendBackButton(href = window.location.href.split(/[?#]/)[0]) {
                const back = document.createElement('button');
                back.className    = 'back';
                back.textContent  = 'BACK';
                back.style.display = 'block';
                back.addEventListener('click', function () {
                    window.location.href = href;
                });
                container.appendChild(back);
            }

            // Creates and appends one collapsible panel into `target` (defaults to
            // the top-level container).
            //
            // options.displayName  - override the button label (default: categoryDisplayName)
            // options.extraLink    - { text, href } — a link shown to the right of the button when open
            //
            // max-height is driven by inline style because CSS transitions on max-height
            // require a concrete pixel value; setting it to null collapses to CSS default (0).
            // openPanel() sets an initial height from scrollHeight, then fetchData()
            // recalculates once the chart and list content have been rendered.
            //
            // autoOpen=true expands the panel immediately and fetches data without a click.
            // Both auto-open and click-open paths wait on chartsReady before calling
            // fetchData, guarding against google.visualization not yet being available.
            function addPanel(category, autoOpen, target = container, options = {}) {
                const { extraLink = null, displayName = null } = options;

                // When a hub drill-down link is present, wrap the button + link bubble
                // in a flex row so the link sits to the right of the panel header.
                const buttonParent = extraLink ? document.createElement('div') : target;
                if (extraLink) {
                    buttonParent.className = 'panel-row';
                    target.appendChild(buttonParent);
                }

                const button = document.createElement('button');
                button.className   = 'collapsible';
                button.textContent = displayName || categoryDisplayName(category);
                buttonParent.appendChild(button);

                // Hub drill-down link: rendered as a shaded bubble to the right of the
                // panel header. Shown only when the panel is open.
                let linkAnchor = null;
                if (extraLink) {
                    linkAnchor = document.createElement('a');
                    linkAnchor.href        = extraLink.href;
                    linkAnchor.textContent = '▾ ' + extraLink.text;
                    linkAnchor.className   = 'hub-link-bubble';
                    linkAnchor.style.display = 'none';
                    buttonParent.appendChild(linkAnchor);
                }

                const chartDiv = document.createElement('div');
                chartDiv.className = 'chart_div';
                target.appendChild(chartDiv);

                const content = document.createElement('div');
                content.className = 'content';
                content.innerHTML = '<p>Loading...</p>';
                target.appendChild(content);

                function openPanel() {
                    button.classList.add('active');
                    content.classList.add('open');
                    chartDiv.classList.add('open');
                    // Use the current scrollHeight as an initial max-height (typically
                    // just the "Loading..." placeholder). fetchData() recalculates both
                    // values after the chart and monthly list have been rendered so that
                    // panels with many years of data are never clipped.
                    content.style.maxHeight = content.scrollHeight + 'px';
                    chartDiv.style.maxHeight = chartDiv.scrollHeight + 'px';
                    if (linkAnchor) linkAnchor.style.display = 'inline-flex';
                }

                function closePanel() {
                    button.classList.remove('active');
                    content.classList.remove('open');
                    chartDiv.classList.remove('open');
                    content.style.maxHeight = null;
                    chartDiv.style.maxHeight = null;
                    if (linkAnchor) linkAnchor.style.display = 'none';
                }

                if (autoOpen) {
                    openPanel();
                    chartsReady.then(() => fetchData(content, category, chartDiv));
                }

                button.addEventListener('click', function () {
                    if (content.style.maxHeight) {
                        closePanel();
                    } else {
                        openPanel();
                        if (!content.dataset.loaded) {
                            chartsReady.then(() => fetchData(content, category, chartDiv));
                        }
                    }
                });
            }

            // Creates a collapsible section toggle button + hidden body div, appends
            // both to the container, and returns the body div for adding panels into.
            function appendSectionToggle(label) {
                const toggle = document.createElement('button');
                toggle.className   = 'section-toggle';
                toggle.textContent = label;
                container.appendChild(toggle);

                const body = document.createElement('div');
                body.className = 'section-body';
                container.appendChild(body);

                toggle.addEventListener('click', function () {
                    const isOpen = body.classList.toggle('open');
                    toggle.classList.toggle('active', isOpen);
                });

                return body;
            }

            // ── View builders ────────────────────────────────────────────────────────

            // Flat view: all categories in a simple collapsible list.
            // Used for ?show=all and single-category (?show=<category>).
            function buildPanels(lines, autoOpen) {
                appendBackButton();
                lines.forEach(line => { addPanel(line.trim(), autoOpen); });
            }

            // DPLA view: root at top, then two collapsed group sections.
            //   root         - the DPLA root category (or null)
            //   hubs         - level-1 hub categories, alphabetically sorted
            //   hubInstitutions - Map<hubName, institutionNames[]>
            //   allowSet     - Set of allowed category names for filtering institutions
            function buildDplaPanels(root, hubs, hubInstitutions, allowSet) {
                appendBackButton();

                // Root category — labeled explicitly, not auto-opened
                if (root) {
                    addPanel(root, false, container, {
                        displayName: 'All data for the Digital Public Library of America'
                    });
                }

                // "Hubs" section: one panel per hub, each with a drill-down link
                const hubsBody = appendSectionToggle('List of Hubs');
                hubs.forEach(hub => {
                    const hubDisplayName = categoryDisplayName(hub);
                    addPanel(hub, false, hubsBody, {
                        extraLink: {
                            text: `View data for all ${hubDisplayName} institutions`,
                            href: `?hub=${hubDisplayName.replaceAll(' ', '_')}`
                        }
                    });
                });

                // "Contributing Institutions" section: flat alphabetical list of all
                // level-2 categories, filtered by the allow list
                const allInstitutions = [...hubInstitutions.values()]
                    .flat()
                    .filter(n => allowSet.has(n) && n.startsWith('Media_contributed_by_'))
                    .sort((a, b) => categoryDisplayName(a).localeCompare(categoryDisplayName(b)));

                const instBody = appendSectionToggle('List of Contributing Institutions');
                allInstitutions.forEach(inst => { addPanel(inst, false, instBody); });
            }

            // Hub view: a single hub panel, then a "Contributing Institutions" label,
            // followed by child institution panels. Used for ?hub=<name>.
            function buildHubView(hubCat, institutions) {
                appendBackButton('?show=dpla');
                addPanel(hubCat, false);

                const header = document.createElement('div');
                header.className   = 'section-toggle section-header-static';
                header.textContent = 'List of Contributing Institutions';
                container.appendChild(header);

                institutions.forEach(inst => { addPanel(inst, false); });
            }

            // ── Dispatch ─────────────────────────────────────────────────────────────

            if (hubParam) {
                container.innerHTML = '<p>Loading hub data…</p>';
                fetchDplaCategories()
                    .then(({ hubs, hubInstitutions }) => {
                        const allowSet = new Set(allLines.map(l => l.trim()));

                        // Reverse-lookup: find the hub whose display name matches the param
                        const hubCat = hubs.find(
                            h => categoryDisplayName(h).replaceAll(' ', '_') === hubParam
                        );
                        if (!hubCat) {
                            container.innerHTML = '<p>Hub not found.</p>';
                            return;
                        }

                        const institutions = (hubInstitutions.get(hubCat) || [])
                            .filter(n => allowSet.has(n) && n.startsWith('Media_contributed_by_'))
                            .sort((a, b) => categoryDisplayName(a).localeCompare(categoryDisplayName(b)));

                        // Refine the page title now that we have the canonical display name
                        const hubTitle = categoryDisplayName(hubCat) + ' Wikimedia Page Views';
                        document.title = hubTitle;
                        if (dashboardH1) dashboardH1.textContent = hubTitle;

                        container.innerHTML = '';
                        buildHubView(hubCat, institutions);
                    })
                    .catch(err => {
                        container.innerHTML = '<p>Error loading hub data.</p>';
                        console.error('Error fetching hub categories:', err);
                    });

            } else if (id === 'dpla') {
                // Show a loading message while the Wikimedia Commons category tree is
                // fetched. fetchDplaCategories makes ~20-50 parallel API calls (one per
                // hub) and returns { root, hubs, hubInstitutions } grouped by depth.
                container.innerHTML = '<p>Loading DPLA institutions…</p>';
                fetchDplaCategories()
                    .then(({ root, hubs, hubInstitutions }) => {
                        const allowSet = new Set(allLines.map(l => l.trim()));

                        const filteredHubs = hubs
                            .filter(n => allowSet.has(n) && n.startsWith('Media_contributed_by_'))
                            .sort((a, b) => categoryDisplayName(a).localeCompare(categoryDisplayName(b)));

                        container.innerHTML = '';
                        buildDplaPanels(
                            allowSet.has(root) ? root : null,
                            filteredHubs,
                            hubInstitutions,
                            allowSet
                        );
                    })
                    .catch(err => {
                        container.innerHTML = '<p>Error loading DPLA category data.</p>';
                        console.error('Error fetching DPLA categories:', err);
                    });

            } else {
                // For 'all' or no param, render every category.
                // For a specific category name, render only that one and auto-open it.
                const lines = (id === 'all' || id === 'none') ? allLines : [id];
                buildPanels(lines, id !== 'all' && id !== 'none');
            }
        })
        .catch(error => {
            console.error('Error fetching allow list:', error);
            // Replace the loading banner with a visible error so users know the
            // tool is unavailable, rather than seeing unresponsive buttons.
            const banner = document.getElementById('metrics-loading-banner');
            if (banner) {
                banner.className = 'metrics-status-banner metrics-status-error';
                banner.textContent = 'Unable to load category data — the Wikimedia allow-list API is currently unreachable. Please try refreshing the page.';
            }
        });
}

// Expose initMetrics globally so the Next.js page's onReady callback can call
// it directly on client-side remounts without re-injecting this script.
window.initMetrics = initMetrics;

// Run immediately if the DOM is ready, otherwise wait for DOMContentLoaded.
// This handles both direct page loads and Next.js script injection (where
// DOMContentLoaded has already fired by the time the script runs).
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMetrics);
} else {
    initMetrics();
}

/**
 * Fetches monthly pageview data for a Wikimedia Commons category from the
 * Wikimedia Analytics REST API, then renders a Google Charts line chart and
 * a monthly breakdown list into the given panel elements.
 *
 * API endpoint docs:
 *   https://wikimedia.org/api/rest_v1/#/Commons%20Analytics%20Data/get_metrics_commons_analytics_pageviews_per_category_monthly__category__depth__access__start__end_
 *
 * @param {HTMLElement} content   - Text panel element (receives total + list)
 * @param {string}      category  - Raw category name (underscores, may be URL-encoded)
 * @param {HTMLElement} chartDiv  - Chart container element
 */
function fetchData(content, category, chartDiv) {
    // Normalize any spaces to underscores and percent-encode for the API path.
    const encodedCategory = encodeURIComponent(category.replace(/\s+/g, '_'));

    fetch(`https://wikimedia.org/api/rest_v1/metrics/commons-analytics/pageviews-per-category-monthly/${encodedCategory}/deep/all-wikis/00000101/99991231`)
        .then(response => response.json())
        .then(apiData => {
            if (apiData.items && apiData.items.length > 0) {
                // API timestamps are in YYYY-MM-DD format (e.g. "2023-11-00").
                // Extract the YYYY-MM prefix for display.
                // Each row is [displayMonth, viewCount], e.g. ["2023-11", 1234].
                const pageviews = apiData.items.map(item => [
                    item['timestamp'].substring(0, 7),
                    item['pageview-count']
                ]);

                // Sum all monthly counts for the lifetime total.
                const total = pageviews.reduce((sum, [, count]) => sum + count, 0);
                const oldest = pageviews[0][0];

                // Build a Google Charts DataTable and draw the line chart.
                const chartData = new google.visualization.DataTable();
                chartData.addColumn('string', 'Timestamp');
                chartData.addColumn('number', 'Views');
                chartData.addRows(pageviews);

                new google.visualization.LineChart(chartDiv).draw(chartData, {
                    hAxis: { title: 'Time' },
                    vAxis: { title: 'Views' }
                });

                // Build the monthly list for the text panel.
                const listItems = pageviews
                    .map(([month, count]) => `<li>${month}: ${count.toLocaleString()} views</li>`)
                    .join('');
                content.innerHTML = `<p><strong>Total (since ${oldest}): ${total.toLocaleString()}</strong></p><ul>${listItems}</ul>`;

                // Recalculate max-height now that real content has replaced "Loading...".
                // setTimeout(0) lets the browser reflow first so scrollHeight is accurate.
                if (content.classList.contains('open')) {
                    setTimeout(() => {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        chartDiv.style.maxHeight = chartDiv.scrollHeight + 'px';
                    }, 0);
                }
            } else {
                content.innerHTML = '<p>No data available.</p>';
                chartDiv.style.display = 'none';
                if (content.classList.contains('open')) {
                    setTimeout(() => {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }, 0);
                }
            }

            content.dataset.loaded = true; // Prevent redundant fetches on re-open.
        })
        .catch(error => {
            content.innerHTML = '<p>Error loading data.</p>';
            chartDiv.innerHTML = '';
            if (content.classList.contains('open')) {
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }, 0);
            }
            console.error('Error fetching data:', error);
        });
}

/**
 * Walks two levels of the Wikimedia Commons subcategory tree under the DPLA
 * root category and returns names grouped by depth.
 *
 * Returns:
 *   root            - normalized name of the DPLA root category
 *   hubs            - level-1 subcategory names (direct children of root)
 *   hubInstitutions - Map from each hub name to its level-2 institution names
 *
 * All names: "Category:" prefix stripped, spaces replaced with underscores.
 *
 * @returns {Promise<{ root: string, hubs: string[], hubInstitutions: Map<string, string[]> }>}
 */
async function fetchDplaCategories() {
    const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
    const DPLA_ROOT   = 'Category:Media contributed by the Digital Public Library of America';

    function normalize(title) {
        return title.replace(/^Category:/, '').replaceAll(' ', '_');
    }

    // Level 1: direct subcategories of the DPLA root (the "hub" categories).
    const level1 = await fetchSubcategories(COMMONS_API, DPLA_ROOT);

    // Level 2: subcategories of each hub, fetched in parallel.
    // These are the individual partner/collection categories (~300-400 total).
    const level2Arrays = await Promise.all(
        level1.map(cat => fetchSubcategories(COMMONS_API, cat))
    );

    // Build a Map from each hub name to its list of institution names.
    // Preserves the hub→institution relationship for the ?hub= drill-down view.
    const hubInstitutions = new Map();
    level1.forEach((hub, i) => {
        hubInstitutions.set(normalize(hub), level2Arrays[i].map(normalize));
    });

    return {
        root:            normalize(DPLA_ROOT),
        hubs:            level1.map(normalize),
        hubInstitutions,
    };
}

/**
 * Fetches all subcategory titles (cmtype=subcat) of the given category from
 * the Wikimedia Commons API, following continuation tokens to retrieve all pages.
 *
 * @param {string} apiUrl        - Wikimedia Commons API base URL
 * @param {string} categoryTitle - Full category title including "Category:" prefix
 * @returns {Promise<string[]>}  - Array of subcategory title strings
 */
async function fetchSubcategories(apiUrl, categoryTitle) {
    const results = [];
    let cmcontinue = null;

    do {
        const params = new URLSearchParams({
            action:   'query',
            list:     'categorymembers',
            cmtitle:  categoryTitle,
            cmtype:   'subcat',   // namespace 14 only — skips files and pages
            cmlimit:  'max',      // up to 500 per request
            format:   'json',
            origin:   '*',        // required for cross-origin browser requests
        });
        if (cmcontinue) params.set('cmcontinue', cmcontinue);

        const response = await fetch(`${apiUrl}?${params}`);
        if (!response.ok) throw new Error(`Commons API returned HTTP ${response.status} for "${categoryTitle}"`);
        const data = await response.json();

        if (data.query?.categorymembers) {
            results.push(...data.query.categorymembers.map(m => m.title));
        }

        // The API returns a `continue` object when there are more results to fetch.
        cmcontinue = data.continue?.cmcontinue ?? null;
    } while (cmcontinue);

    return results;
}

/**
 * Returns the human-readable display name for a category.
 *
 * For "Media contributed by [the] X" categories, strips the common prefix so
 * only the institution name is shown. The word "the" (lowercase only) immediately
 * after the prefix is also stripped; uppercase "The" is treated as part of the
 * institution name and kept.
 *
 * Examples:
 *   "Media_contributed_by_the_Foo_Library" → "Foo Library"
 *   "Media_contributed_by_The_Foo_Library" → "The Foo Library"
 *   "Media_contributed_by_the_Digital_Public_Library_of_America" → "Digital Public Library of America"
 *   "Some_Other_Category"                  → "Some Other Category"
 *
 * @param {string} category - Raw category name (underscores, may be URL-encoded)
 * @returns {string}
 */
function categoryDisplayName(category) {
    let name = decodeURI(category).replaceAll('_', ' ');
    const prefix = 'Media contributed by ';
    if (name.startsWith(prefix)) {
        name = name.slice(prefix.length);
        // Strip lowercase "the " but preserve uppercase "The" as part of the name.
        if (name.startsWith('the ')) {
            name = name.slice(4);
        }
    }
    return name;
}
