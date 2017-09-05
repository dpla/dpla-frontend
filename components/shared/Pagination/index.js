import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Pagination.css";

const PageLink = ({ route, page, className }) =>
  <Link
    href={{
      pathname: route.pathname,
      query: Object.assign({}, route.query, {
        page: page
      })
    }}
  >
    <a className={className}>{page}</a>
  </Link>;

const NextOrPrevButton = ({ route, currentPage, type = "next" }) =>
  <Link
    href={{
      pathname: route.pathname,
      query: Object.assign({}, route.query, {
        page: type === "next"
          ? parseInt(currentPage, 10) + 1
          : parseInt(currentPage, 10) - 1
      })
    }}
  >
    <a
      className={
        type === "next" ? classNames.nextButton : classNames.previousButton
      }
    >
      {type === "next" ? "Next" : "Previous"}
    </a>
  </Link>;

const Pagination = ({ route, pageCount, currentPage }) =>
  <div className={classNames.pagination}>
    {currentPage > 1 &&
      pageCount > 1 &&
      <NextOrPrevButton type="prev" route={route} currentPage={currentPage} />}
    {pageCount > 1 &&
      <PageLink
        className={[
          classNames.link,
          parseInt(currentPage, 10) === 1 && classNames.activeLink
        ].join(" ")}
        route={route}
        page={1}
      />}
    {currentPage >= 5 &&
      pageCount > 5 &&
      <span className={classNames.ellipses}>...</span>}
    {/* TODO: this seems sloppy, should refactor */}
    {[
      currentPage + 4 <= 5 ? currentPage + 4 : currentPage - 2,
      currentPage + 3 <= 5 ? currentPage + 3 : currentPage - 1,
      currentPage,
      currentPage - 4 >= pageCount - 5 && pageCount > 5
        ? currentPage - 4
        : currentPage + 2,
      currentPage - 3 >= pageCount - 5 && pageCount > 5
        ? currentPage - 3
        : currentPage + 1
    ]
      .sort((a, b) => a - b)
      .map(
        page =>
          page > 1 && page < pageCount
            ? <PageLink
                className={[
                  classNames.link,
                  page === parseInt(currentPage, 10) && classNames.activeLink
                ].join(" ")}
                route={route}
                page={page}
              />
            : null
      )}

    {currentPage <= pageCount - 4 &&
      pageCount > 5 &&
      <span className={classNames.ellipses}>...</span>}
    {pageCount > 1 &&
      <PageLink
        className={[
          classNames.link,
          pageCount === parseInt(currentPage, 10) && classNames.activeLink
        ].join(" ")}
        route={route}
        page={pageCount}
      />}
    {currentPage < pageCount &&
      pageCount > 1 &&
      <NextOrPrevButton route={route} currentPage={currentPage} type="next" />}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Pagination;
