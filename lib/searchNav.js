// Storage for item page search navigation
// ("Back to results", "Previous item", "Next item")
// - localStorage: item paths of recent results pages, shared across tabs.
// - sessionStorage: the search this tab is browsing.

// Key is this prefix + search URL
const RESULTS_KEY_PREFIX = "dpla:search-results:";
const CONTEXT_KEY = "dpla:search-context";

const TTL = 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 10;

export function saveSearchResults(searchUri, paths) {
  try {
    const now = Date.now();
    const ownKey = RESULTS_KEY_PREFIX + searchUri;

    // Skip this search's own entry, so re-saving doesn't evict another
    const surviving = [];
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith(RESULTS_KEY_PREFIX) || key === ownKey) continue;
      try {
        const entry = JSON.parse(localStorage.getItem(key));
        if (now - entry.ts > TTL) {
          localStorage.removeItem(key);
        } else {
          surviving.push({ key, ts: entry.ts });
        }
      } catch {
        localStorage.removeItem(key);
      }
    }

    if (surviving.length >= MAX_ENTRIES) {
      surviving.sort((a, b) => a.ts - b.ts);
      const toEvict = surviving.length - MAX_ENTRIES + 1;
      for (let i = 0; i < toEvict; i++) {
        localStorage.removeItem(surviving[i].key);
      }
    }

    localStorage.setItem(ownKey, JSON.stringify({ paths, ts: now }));
  } catch {
    // localStorage unavailable
  }
}

export function setSearchContext(backUri, paths) {
  try {
    sessionStorage.setItem(CONTEXT_KEY, JSON.stringify({ backUri, paths }));
  } catch {
    // sessionStorage unavailable
  }
}

function newestSavedSearch(itemPath) {
  const now = Date.now();
  let newest = null;

  for (const key of Object.keys(localStorage)) {
    if (!key.startsWith(RESULTS_KEY_PREFIX)) continue;
    const { paths, ts } = JSON.parse(localStorage.getItem(key));
    if (now - ts > TTL || !paths.includes(itemPath)) continue;
    if (!newest || ts > newest.ts) {
      newest = { backUri: key.slice(RESULTS_KEY_PREFIX.length), paths, ts };
    }
  }

  return newest;
}

// Prefers the tab's own search,
// then the newest saved search with the item
function findSearchContext(itemPath) {
  const context = JSON.parse(sessionStorage.getItem(CONTEXT_KEY));
  if (context?.paths.includes(itemPath)) return context;
  return newestSavedSearch(itemPath);
}

// Returns { backUri, prev, next } for the item,
// or null if no search has it
export function findSearchNav(itemPath) {
  try {
    const context = findSearchContext(itemPath);
    if (!context) return null;

    const index = context.paths.indexOf(itemPath);
    return {
      backUri: context.backUri,
      prev: context.paths[index - 1] ?? null,
      next: context.paths[index + 1] ?? null,
    };
  } catch {
    // Storage unavailable
    return null;
  }
}

// Pins the item's search to this tab
export function keepSearchContext(itemPath) {
  try {
    const context = findSearchContext(itemPath);
    if (context) setSearchContext(context.backUri, context.paths);
  } catch {
    // Storage unavailable
  }
}
