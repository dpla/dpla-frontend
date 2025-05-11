import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ChevronThick from "components/svg/ChevronThick";

import addCommasToNumber from "lib/addCommasToNumber";

import css from "./Pagination.module.scss";

/**
 * @param current current page number
 * @param pageCount total pages
 * @return array sorted with page numbers to show
 */
function centerWindow(current, pageCount) {
  const windowSize = 2;
  const windowArray = [];
  for (let i = 1; i <= windowSize; i++) {
    if (current + i < pageCount) {
      windowArray.push(current + i);
    }

    if (current - i > 1) {
      windowArray.push(current - i);
    }
  }
  windowArray.push(current);
  return windowArray.sort((a, b) => a - b);
}

function PageLink({ page, className }) {
  const router = useRouter();
  return (
    <Link
      key={"page " + page}
      href={{
        pathname: router.pathname,
        query: { ...router.query, page: page },
      }}
      className={className}
    >
      {addCommasToNumber(page)}
    </Link>
  );
}

function NextOrPrevButton({ currentPage, disabled, type = "next" }) {
  const router = useRouter();
  if (disabled) {
    return (
      <button
        disabled
        className={`${
          type === "next" ? css.nextButton : css.previousButton
        } ${css.hideOnLargeScreens}`}
      >
        {type === "prev" && <ChevronThick className={css.prevChevron} />}
        {type === "next" ? "Next" : "Previous"}
        {type === "next" && <ChevronThick className={css.nextChevron} />}
      </button>
    );
  } else {
    return (
      <Link
        href={{
          pathname: router.pathname,
          query: {
            ...router.query,
            page:
              type === "next"
                ? parseInt(currentPage, 10) + 1
                : parseInt(currentPage, 10) - 1,
          },
        }}
        className={type === "next" ? css.nextButton : css.previousButton}
      >
        {type === "prev" && <ChevronThick className={css.prevChevron} />}
        {type === "next" ? "Next" : "Previous"}
        {type === "next" && <ChevronThick className={css.nextChevron} />}
      </Link>
    );
  }
}

export default function Pagination({ pageCount, currentPage }) {
  const router = useRouter();
  return (
    <div className={css.pagination}>
      <NextOrPrevButton
        disabled={!(currentPage > 1 && pageCount > 1)}
        type="prev"
        currentPage={currentPage}
        router={router}
        key={"prev"}
      />

      {pageCount > 1 && (
        <PageLink
          key={1}
          className={`${css.link} ${parseInt(currentPage, 10) === 1 ? css.activeLink : ""}`}
          page={1}
          router={router}
        />
      )}

      {currentPage >= 5 && pageCount > 5 && (
        <span className={css.ellipses}>...</span>
      )}

      {centerWindow(currentPage, pageCount)
        .map((page) =>
          page > 1 && page < pageCount ? (
            <PageLink
              key={page}
              className={`${css.link} ${page === parseInt(currentPage, 10) ? css.activeLink : ""}`}
              page={page}
              router={router}
            />
          ) : null,
        )
        .filter((x) => x !== null)}

      {currentPage <= pageCount - 4 && pageCount > 5 && (
        <span key="ellipses" className={css.ellipses}>
          ...
        </span>
      )}

      {pageCount > 1 && (
        <PageLink
          className={`${css.link} ${pageCount === parseInt(currentPage, 10) ? css.activeLink : ""}`}
          page={pageCount}
          key={pageCount}
        />
      )}

      <NextOrPrevButton
        disabled={!(currentPage < pageCount && pageCount > 1)}
        currentPage={currentPage}
        type="next"
        key={"next"}
      />
    </div>
  );
}
