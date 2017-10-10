import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Pagination.css";
import addCommasToNumber from "utilFunctions/addCommasToNumber";

const Chevron = ({ className }) =>
  <svg
    className={className}
    width="15px"
    height="24px"
    viewBox="0 0 15 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Styles" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="Artboard"
        transform="translate(-183.000000, -205.000000)"
        fill="#000000"
      >
        <path
          d="M201.948629,212.831277 L190.307237,224.272727 L178.598137,212.760526 C178.389045,212.55631 178.272727,212.279942 178.272727,211.991326 C178.272727,211.701341 178.389042,211.42497 178.598137,211.220767 L179.791769,210.047207 L179.791769,210.045847 C179.999478,209.841631 180.280573,209.727273 180.575507,209.727273 C180.869066,209.727273 181.150168,209.841635 181.357863,210.045847 L190.307272,218.843371 L199.187556,210.116599 C199.619606,209.691814 200.321635,209.691814 200.753685,210.116599 L201.947318,211.290159 L201.948704,211.290159 C202.156413,211.494375 202.272727,211.772103 202.272727,212.060718 C202.272727,212.349333 202.156413,212.627075 201.948704,212.831277 L201.948629,212.831277 Z"
          id="Chevron-Thick"
          transform="translate(190.272727, 217.000000) rotate(-90.000000) translate(-190.272727, -217.000000) "
        />
      </g>
    </g>
  </svg>;

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
          ? classNames.nextButton
          : classNames.previousButton} ${classNames.hideOnLargeScreens}`}
      >
        {type === "prev" && <Chevron className={classNames.prevChevron} />}
        {type === "next" ? "Next" : "Previous"}
        {type === "next" && <Chevron className={classNames.nextChevron} />}
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
        <a
          className={
            type === "next" ? classNames.nextButton : classNames.previousButton
          }
        >
          {type === "prev" && <Chevron className={classNames.prevChevron} />}
          {type === "next" ? "Next" : "Previous"}
          {type === "next" && <Chevron className={classNames.nextChevron} />}
        </a>
      </Link>;

const Pagination = ({ route, pageCount, currentPage }) =>
  <div className={classNames.pagination}>
    <NextOrPrevButton
      disabled={!(currentPage > 1 && pageCount > 1)}
      type="prev"
      route={route}
      currentPage={currentPage}
    />
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
    {/* TODO: this is sloppy, should refactor */}
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
                key={page}
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
    <NextOrPrevButton
      disabled={!(currentPage < pageCount && pageCount > 1)}
      route={route}
      currentPage={currentPage}
      type="next"
    />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Pagination;
