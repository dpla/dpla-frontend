import { useMemo } from "react";
import { useRouter } from "next/router";

import { addLinkInfoToResults } from "lib";
import { BACK_URI_PARAM, NEXT_PARAM, PREV_PARAM } from "constants/searchNav";

/**
 * Returns search results augmented with back_uri / prev / next query params so
 * the item page can render "Back to results" and neighbour navigation.
 * Memoised on [results, router.asPath] to avoid rebuilding the array on every
 * parent render.
 */
export function useResultsWithContext(results) {
  const { asPath } = useRouter();
  return useMemo(() => {
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
}
