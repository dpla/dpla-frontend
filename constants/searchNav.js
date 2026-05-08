// Query param names written by search results and read by the item page
// for "Back to results / Previous item / Next item" navigation.
export const BACK_URI_PARAM = "back_uri";
export const PREV_PARAM = "prev";
export const NEXT_PARAM = "next";

// localStorage key prefix used to persist an ordered list of item paths for
// a given search URL so that prev/next links survive navigating between items
// and opening items in new tabs.
// Full key: SEARCH_RESULTS_STORAGE_KEY_PREFIX + searchAsPath
export const SEARCH_RESULTS_STORAGE_KEY_PREFIX = "dpla:search-results:";
