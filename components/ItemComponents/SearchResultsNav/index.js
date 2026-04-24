import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Chevron from "components/svg/ChevronThickOrange";
import { DPLA_ITEM_ID_REGEX } from "constants/items";
import {
  BACK_URI_PARAM,
  NEXT_PARAM,
  PREV_PARAM,
  SEARCH_RESULTS_STORAGE_KEY_PREFIX,
} from "constants/searchNav";
import css from "./SearchResultsNav.module.scss";
import utils from "stylesheets/utils.module.scss";

const ITEM_ID_SOURCE = DPLA_ITEM_ID_REGEX.source.replace(/^\^|\$$/g, "");
const ITEM_PATH_RE = new RegExp(`^/item/${ITEM_ID_SOURCE}$`);

function validItemPath(value) {
  return typeof value === "string" && ITEM_PATH_RE.test(value) ? value : null;
}

function buildNeighborQuery(backUri, prevPath, nextPath) {
  return {
    [BACK_URI_PARAM]: backUri,
    ...(prevPath && { [PREV_PARAM]: prevPath }),
    ...(nextPath && { [NEXT_PARAM]: nextPath }),
  };
}

function SearchResultsNav() {
  const { query, asPath } = useRouter();

  const backUri =
    typeof query[BACK_URI_PARAM] === "string" &&
    query[BACK_URI_PARAM].startsWith("/search")
      ? query[BACK_URI_PARAM]
      : null;
  const prev = validItemPath(query[PREV_PARAM]);
  const next = validItemPath(query[NEXT_PARAM]);
  const currentPath = asPath.split("?")[0];

  // navContext shape: { forPath, prev, next, prevQuery, nextQuery }
  // Populated client-side from sessionStorage. Provides:
  //   - prev/next paths when not in the URL (user arrived via a neighbor link)
  //   - outgoing queries including second-level neighbors
  // Initialized to null; the effect below fills it in.
  const [navContext, setNavContext] = useState(null);

  useEffect(() => {
    if (!backUri) return;
    try {
      const stored = localStorage.getItem(
        SEARCH_RESULTS_STORAGE_KEY_PREFIX + backUri
      );
      if (!stored) return;
      const { paths } = JSON.parse(stored);
      const idx = paths.indexOf(currentPath);
      if (idx === -1) return;

      const prevPath = paths[idx - 1] ?? null;
      const nextPath = paths[idx + 1] ?? null;

      setNavContext({
        forPath: currentPath,
        prev: prevPath,
        next: nextPath,
        // Outgoing query for "Previous item": that item's prev is paths[idx-2],
        // its next is the current item.
        prevQuery: prevPath
          ? buildNeighborQuery(backUri, paths[idx - 2] ?? null, currentPath)
          : null,
        // Outgoing query for "Next item": its prev is the current item,
        // its next is paths[idx+2].
        nextQuery: nextPath
          ? buildNeighborQuery(backUri, currentPath, paths[idx + 2] ?? null)
          : null,
      });
    } catch {
      // localStorage unavailable
    }
  }, [asPath, backUri]);

  // Discard navContext if stale
  const validContext = navContext?.forPath === currentPath ? navContext : null;

  const effectivePrev = validContext?.prev ?? prev;
  const effectiveNext = validContext?.next ?? next;

  if (!backUri && !effectivePrev && !effectiveNext) return null;

  // Before the effect fires, outgoing links carry only back_uri. Once
  // navContext is populated they carry the full neighborhood.
  const fallbackQuery = backUri ? { [BACK_URI_PARAM]: backUri } : {};
  const prevLinkQuery = validContext?.prevQuery ?? fallbackQuery;
  const nextLinkQuery = validContext?.nextQuery ?? fallbackQuery;

  return (
    <div className={utils.breadcrumbsWrapper}>
      <div className={`${utils.container} ${css.searchNav}`}>
        {backUri && (
          <Link href={backUri} className={css.backLink}>
            <Chevron className={css.backArrow} aria-hidden="true" />
            Back to results
          </Link>
        )}
        {(effectivePrev || effectiveNext) && (
          <div className={css.prevNext}>
            {effectivePrev && (
              <Link
                href={{ pathname: effectivePrev, query: prevLinkQuery }}
                className={css.prevLink}
              >
                <Chevron className={css.prevArrow} aria-hidden="true" />
                Previous item
              </Link>
            )}
            {effectiveNext && (
              <Link
                href={{ pathname: effectiveNext, query: nextLinkQuery }}
                className={css.nextLink}
              >
                Next item
                <Chevron className={css.nextArrow} aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultsNav;

