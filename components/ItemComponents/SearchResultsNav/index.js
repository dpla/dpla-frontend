import React, { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Chevron from "components/svg/ChevronThickOrange";
import { findSearchNav, keepSearchContext } from "lib/searchNav";
import css from "./SearchResultsNav.module.css";
import utils from "stylesheets/utils.module.css";

const subscribe = () => () => {};

function SearchResultsNav() {
  const { query } = useRouter();
  const itemPath = `/item/${query.itemId}`;

  // Nav passed as JSON string
  const navJson = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(findSearchNav(itemPath)),
    () => "null",
  );
  const nav = JSON.parse(navJson);

  useEffect(() => {
    keepSearchContext(itemPath);
  }, [itemPath]);

  if (!nav) return null;

  return (
    <div className={utils.breadcrumbsWrapper}>
      <div className={`${utils.container} ${css.searchNav}`}>
        <Link href={nav.backUri} className={css.backLink}>
          <Chevron className={css.backArrow} aria-hidden="true" />
          Back to results
        </Link>
        {(nav.prev || nav.next) && (
          <div className={css.prevNext}>
            {nav.prev && (
              <Link href={nav.prev} className={css.prevLink}>
                <Chevron className={css.prevArrow} aria-hidden="true" />
                Previous item
              </Link>
            )}
            {nav.next && (
              <Link href={nav.next} className={css.nextLink}>
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
