import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Chevron from "components/svg/ChevronThickOrange";
import { DPLA_ITEM_ID_REGEX } from "constants/items";
import { BACK_URI_PARAM, NEXT_PARAM, PREV_PARAM } from "constants/searchNav";
import css from "./SearchResultsNav.module.scss";
import utils from "stylesheets/utils.module.scss";

const ITEM_PATH_RE = new RegExp(`^/item/${DPLA_ITEM_ID_REGEX.source}$`);

function SearchResultsNav() {
  const { query } = useRouter();

  const backUri =
    typeof query[BACK_URI_PARAM] === "string" &&
    query[BACK_URI_PARAM].startsWith("/search")
      ? query[BACK_URI_PARAM]
      : null;
  const prev =
    typeof query[PREV_PARAM] === "string" && ITEM_PATH_RE.test(query[PREV_PARAM])
      ? query[PREV_PARAM]
      : null;
  const next =
    typeof query[NEXT_PARAM] === "string" && ITEM_PATH_RE.test(query[NEXT_PARAM])
      ? query[NEXT_PARAM]
      : null;

  if (!backUri && !prev && !next) return null;

  // Forward back_uri into neighbour links so the user can return to search
  // results after navigating prev/next (neighbour pages won't have their own
  // prev/next context, but the back link will still work).
  const neighborQuery = backUri ? { [BACK_URI_PARAM]: backUri } : {};

  return (
    <div className={utils.breadcrumbsWrapper}>
      <div className={`${utils.container} ${css.searchNav}`}>
        {backUri && (
          <Link href={backUri} className={css.backLink}>
            <Chevron className={css.backArrow} aria-hidden="true" />
            Back to results
          </Link>
        )}
        {(prev || next) && (
          <div className={css.prevNext}>
            {prev && (
              <Link
                href={{ pathname: prev, query: neighborQuery }}
                className={css.prevLink}
              >
                <Chevron className={css.prevArrow} aria-hidden="true" />
                Previous item
              </Link>
            )}
            {next && (
              <Link
                href={{ pathname: next, query: neighborQuery }}
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
