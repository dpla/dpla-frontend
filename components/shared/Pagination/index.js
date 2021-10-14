import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import Chevron from "public/static/images/chevron-thick.svg";

import addCommasToNumber from "lib/addCommasToNumber";

import css from "./Pagination.module.scss";

/**
  * @param current, current page number
  * @param pageCount, total pages
  * @return array sorted with page numbers to show
  */
const centerWindow = (current, pageCount) => {
  const windowSize = 2;
  let windowArray = [];
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
};

const PageLink = withRouter(({ router, page, className }) =>
  <Link
    href={{
      pathname: router.pathname,
      query: Object.assign({}, router.query, {
        page: page
      })
    }}
  >
    <a className={className}>{addCommasToNumber(page)}</a>
  </Link>);

const NextOrPrevButton = withRouter(({ router, currentPage, disabled, type = "next" }) =>
  disabled
    ? <button
        disabled
        className={`${type === "next"
          ? css.nextButton
          : css.previousButton} ${css.hideOnLargeScreens}`}
      >
        {type === "prev" && <Chevron className={css.prevChevron} />}
        {type === "next" ? "Next" : "Previous"}
        {type === "next" && <Chevron className={css.nextChevron} />}
      </button>
    : <Link
        href={{
          pathname: router.pathname,
          query: Object.assign({}, router.query, {
            page: type === "next"
              ? parseInt(currentPage, 10) + 1
              : parseInt(currentPage, 10) - 1
          })
        }}
      >
        <a className={type === "next" ? css.nextButton : css.previousButton}>
          {type === "prev" && <Chevron className={css.prevChevron} />}
          {type === "next" ? "Next" : "Previous"}
          {type === "next" && <Chevron className={css.nextChevron} />}
        </a>
      </Link>);

const Pagination = ({ pageCount, currentPage }) =>
  <div className={css.pagination}>
    <NextOrPrevButton
      disabled={!(currentPage > 1 && pageCount > 1)}
      type="prev"
      currentPage={currentPage}
    />
    {pageCount > 1 &&
      <PageLink
        className={`${css.link} ${parseInt(currentPage, 10) === 1 ? css.activeLink : ""}`}
        page={1}
      />}
    {currentPage >= 5 &&
      pageCount > 5 &&
      <span className={css.ellipses}>...</span>}
    {centerWindow(currentPage, pageCount).map(
      page =>
        page > 1 && page < pageCount
          ? <PageLink
              key={page}
              className={`${css.link} ${page === parseInt(currentPage, 10) ? css.activeLink : ""}`}
              page={page}
            />
          : null
    )}

    {currentPage <= pageCount - 4 &&
      pageCount > 5 &&
      <span className={css.ellipses}>...</span>}
    {pageCount > 1 &&
      <PageLink
        className={`${css.link} ${pageCount === parseInt(currentPage, 10) ? css.activeLink : ""}`}
        page={pageCount}
      />}
    <NextOrPrevButton
      disabled={!(currentPage < pageCount && pageCount > 1)}
      currentPage={currentPage}
      type="next"
    />
  </div>;

export default Pagination;
