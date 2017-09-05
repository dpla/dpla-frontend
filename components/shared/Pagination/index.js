import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Pagination.css";

const PageLink = ({ route, page }) =>
  <Link
    href={{
      pathname: route.pathname,
      query: Object.assign({}, route.query, {
        page: page
      })
    }}
  >
    <a>{page}</a>
  </Link>;

const Pagination = ({ route, pageCount, currentPage, itemsPerPage }) =>
  <div className={classNames.listView}>
    <PageLink route={route} page={1} />
    {currentPage >= 5 && <span className={classNames.ellipses}>...</span>}
    {/* TODO: this is sloppy, should refactor */}
    {[
      parseInt(currentPage, 10) - 4,
      parseInt(currentPage, 10) - 3,
      parseInt(currentPage, 10) - 2,
      parseInt(currentPage, 10) - 1,
      parseInt(currentPage, 10),
      parseInt(currentPage, 10) + 1,
      parseInt(currentPage, 10) + 2,
      parseInt(currentPage, 10) + 3,
      parseInt(currentPage, 10) + 4
    ].map(page => {
      if (page > 1 && page < pageCount) {
        return <PageLink route={route} page={page} />;
      } else {
        return null;
      }
    })}

    {currentPage < pageCount - 5 &&
      <span className={classNames.ellipses}>...</span>}
    <PageLink route={route} page={pageCount} />
  </div>;

export default Pagination;
