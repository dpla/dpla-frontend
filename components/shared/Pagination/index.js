import React from "react";
import Link from "next/link";

import Chevron from "../../../static/images/chevron-thick.svg";

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
  for (var i = 1; i <= windowSize; i++) {
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

const PageLink = ({ route, page, className }) =>
  <Link
    prefetch
    href={{
      pathname: route.pathname,
      query: Object.assign({}, route.query, {
        page: page
      })
    }}
  >
    <a className={className}>{addCommasToNumber(page)}</a>
  </Link>;

const NextOrPrevButton = ({ route, currentPage, disabled, type = "next" }) =>
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
        prefetch
        href={{
          pathname: route.pathname,
          query: Object.assign({}, route.query, {
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
      </Link>;

const Pagination = ({ route, pageCount, currentPage }) =>
  <div className={css.pagination}>
    <NextOrPrevButton
      disabled={!(currentPage > 1 && pageCount > 1)}
      type="prev"
      route={route}
      currentPage={currentPage}
    />
    {pageCount > 1 &&
      <PageLink
        className={[
          css.link,
          parseInt(currentPage, 10) === 1 ? css.activeLink : ""
        ].join(" ")}
        route={route}
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
              className={[
                css.link,
                page === parseInt(currentPage, 10) ? css.activeLink : ""
              ].join(" ")}
              route={route}
              page={page}
            />
          : null
    )}

    {currentPage <= pageCount - 4 &&
      pageCount > 5 &&
      <span className={css.ellipses}>...</span>}
    {pageCount > 1 &&
      <PageLink
        className={[
          css.link,
          pageCount === parseInt(currentPage, 10) ? css.activeLink : ""
        ].join(" ")}
        route={route}
        page={pageCount}
      />}
    <NextOrPrevButton
      disabled={!(currentPage < pageCount && pageCount > 1)}
      route={route}
      currentPage={currentPage}
      type="next"
    />
  </div>;

export default Pagination;
