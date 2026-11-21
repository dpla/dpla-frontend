import { useMemo, useEffect } from "react";
import { useRouter } from "next/router";

import { addLinkInfoToResults } from "lib";
import { saveSearchResults, setSearchContext } from "lib/searchNav";

/**
 * Adds item links to search results,
 * and saves the results to browser storage
 * for the item page's search navigation.
 * Pass `rememberSearch` as the click handler for result links.
 */
export function useResultsWithContext(results) {
  const { asPath } = useRouter();

  const items = useMemo(() => addLinkInfoToResults(results), [results]);
  const paths = useMemo(
    () => items.map((item) => item.linkHref?.pathname).filter(Boolean),
    [items],
  );

  // Saved on load too: "Open in new tab" from the context menu fires no click.
  useEffect(() => {
    if (paths.length === 0) return;
    saveSearchResults(asPath, paths);
  }, [asPath, paths]);

  // Re-saved on-click.
  const rememberSearch = () => {
    setSearchContext(asPath, paths);
    saveSearchResults(asPath, paths);
  };

  return { items, rememberSearch };
}
