import { useMemo, useEffect } from "react";
import { useRouter } from "next/router";

import { addLinkInfoToResults } from "lib";
import {
  BACK_URI_PARAM,
  NEXT_PARAM,
  PREV_PARAM,
  SEARCH_RESULTS_STORAGE_KEY_PREFIX,
} from "constants/searchNav";

/**
 * Returns search results augmented with back_uri / prev / next query params so
 * the item page can render "Back to results" and neighbour navigation.
 * Memoised on [results, router.asPath] to avoid rebuilding the array on every
 * parent render.
 *
 * Also persists the ordered list of item paths to localStorage so that
 * prev/next links continue to work after the user navigates to a neighbour
 * item (which won't have its own prev/next URL params).
 */
export function useResultsWithContext(results) {
  const { asPath } = useRouter();

  const itemsWithContext = useMemo(() => {
    const base = addLinkInfoToResults(results);
    return base.map((item, i) => {
      if (!item.linkHref) return item;
      const prev = base[i - 1]?.linkHref?.pathname;
      const next = base[i + 1]?.linkHref?.pathname;
      return {
        ...item,
        linkHref: {
          ...item.linkHref,
          query: {
            [BACK_URI_PARAM]: asPath,
            ...(prev && { [PREV_PARAM]: prev }),
            ...(next && { [NEXT_PARAM]: next }),
          },
        },
      };
    });
  }, [results, asPath]);

  // Persist the ordered item paths so SearchResultsNav can derive prev/next
  // even when the user arrived via a neighbour link (which only carries back_uri).
  // A timestamp is stored alongside paths so stale entries can be evicted.
  useEffect(() => {
    const paths = itemsWithContext
      .map((item) => item.linkHref?.pathname)
      .filter(Boolean);
    if (paths.length === 0) return;
    try {
      const now = Date.now();
      const ttl = 24 * 60 * 60 * 1000; // 24 hours

      // Evict entries older than the TTL before writing the new one.
      for (const key of Object.keys(localStorage)) {
        if (!key.startsWith(SEARCH_RESULTS_STORAGE_KEY_PREFIX)) continue;
        try {
          const entry = JSON.parse(localStorage.getItem(key));
          if (now - entry.ts > ttl) localStorage.removeItem(key);
        } catch {
          localStorage.removeItem(key);
        }
      }

      localStorage.setItem(
        SEARCH_RESULTS_STORAGE_KEY_PREFIX + asPath,
        JSON.stringify({ paths, ts: now })
      );
    } catch {
      // localStorage unavailable
    }
  }, [itemsWithContext, asPath]);

  return itemsWithContext;
}
