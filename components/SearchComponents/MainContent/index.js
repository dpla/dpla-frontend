import React from "react";
import { classNames, stylesheet } from "./MainContent.css";

import GridView from "components/shared/GridView";
import ListView from "components/shared/ListView";
import Pagination from "components/shared/Pagination";
import Sidebar from "./Sidebar";
import extractItemId from "utilFunctions/extractItemId";
import { classNames as utilClassNames } from "css/utils.css";
const { container } = utilClassNames;

const addLinkInfoToResults = (results, q) =>
  results.map(item =>
    Object.assign({}, item, {
      linkHref: {
        pathname: "/item",
        query: { q, itemId: extractItemId(item["@id"]) }
      },
      linkAs: `/item/${extractItemId(item["@id"])}?q=${q}`
    })
  );

const MainContent = ({ results, route, facets, paginationInfo, hideSidebar }) =>
  <div className={classNames.wrapper}>
    <div className={[container, classNames.mainContent].join(" ")}>
      <div className={`${hideSidebar ? classNames.hiddenSidebar : ""}`}>
        <Sidebar route={route} facets={facets} />
      </div>
      <div className={classNames.resultsAndPagination}>
        <div
          className={
            route.query.list_view === "grid"
              ? classNames.gridWrapper
              : classNames.listWrapper
          }
        >
          {route.query.list_view === "grid"
            ? <GridView
                route={route}
                items={addLinkInfoToResults(results, route.query.q)}
              />
            : <ListView
                route={route}
                items={addLinkInfoToResults(results, route.query.q)}
              />}
        </div>
        <Pagination
          route={route}
          itemsPerPage={paginationInfo.pageSize}
          currentPage={parseInt(paginationInfo.currentPage, 10)}
          pageCount={Math.floor(
            paginationInfo.pageCount / paginationInfo.pageSize
          )}
        />
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainContent;
