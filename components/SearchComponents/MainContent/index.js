import React from "react";
import { classNames, stylesheet } from "./MainContent.css";

import GridView from "components/shared/GridView";
import ListView from "components/shared/ListView";
import Pagination from "components/shared/Pagination";
import Sidebar from "./Sidebar";
import extractItemId from "utilFunctions/extractItemId";
import { classNames as utilClassNames } from "css/utils.css";
const { container } = utilClassNames;

const addLinkInfoToResults = (results, query) =>
  results.map((item, idx) => {
    const previous = idx > 0 ? idx - 1 : "";
    const next = idx < results.length - 1 ? idx + 1 : null;
    return Object.assign({}, item, {
      linkHref: {
        pathname: "/item",
        query: { ...query, itemId: extractItemId(item["@id"]), previous, next }
      },
      linkAs: {
        pathname: `/item/${extractItemId(item["@id"])}`,
        query: Object.assign({}, query, { next, previous })
      }
    });
  });

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
                items={addLinkInfoToResults(results, route.query)}
              />
            : <ListView
                route={route}
                items={addLinkInfoToResults(results, route.query)}
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
