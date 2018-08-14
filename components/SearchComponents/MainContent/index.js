import React from "react";

import ListView from "shared/ListView";
import Pagination from "shared/Pagination";
import Sidebar from "./Sidebar";

import { addLinkInfoToResults, removeQueryParams, extractItemId } from "lib";

import utils from "stylesheets/utils.scss";
import css from "./MainContent.scss";

const MainContent = ({ results, route, facets, paginationInfo, hideSidebar }) =>
  <div className={css.wrapper}>
    <div className={[utils.container, css.mainContent].join(" ")}>
      <div className={`${!hideSidebar ? css.isOpen : ""} ${css.sidebar}`}>
        <Sidebar route={route} facets={facets} />
      </div>
      <div id="main" role="main" className={css.resultsAndPagination}>
        <ListView
          route={route}
          items={addLinkInfoToResults(results, route.query)}
          viewMode={route.query.list_view}
        />
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
    </div>
  </div>;

export default MainContent;
