import React from "react";

import ListView from "shared/ListView";
import Pagination from "shared/Pagination";
import Sidebar from "./Sidebar";

import { addLinkInfoToResults } from "lib";

import utils from "stylesheets/utils.scss";
import css from "./MainContent.scss";

const MainContent = ({ results, route, facets, paginationInfo, hideSidebar }) =>
  <div className={[utils.container, css.mainContent].join(" ")}>
    {results.length > 0 &&
      <div className={`${!hideSidebar ? css.isOpen : ""} ${css.sidebar}`}>
        <Sidebar route={route} facets={facets} />
      </div>}
    <div id="main" role="main" className={css.resultsAndPagination}>
      {results.length > 0 &&
        <ListView
          route={route}
          items={addLinkInfoToResults(results, route.query)}
          viewMode={route.query.list_view}
        />}
      {results.length === 0 &&
        <div className={css.noResults}>
          Your search did not match any items. Try different or more general
          keywords or removing filters.
        </div>}
      <Pagination
        route={route}
        itemsPerPage={paginationInfo.pageSize}
        currentPage={parseInt(paginationInfo.currentPage, 10)}
        totalItems={paginationInfo.pageCount}
        pageCount={Math.ceil(
          paginationInfo.pageCount / paginationInfo.pageSize
        )}
      />
    </div>
  </div>;

export default MainContent;
