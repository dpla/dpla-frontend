import React from "react";
import { classNames, stylesheet } from "./MainContent.css";

import GridView from "components/shared/GridView";
import ListView from "components/shared/ListView";
import Pagination from "components/shared/Pagination";
import Sidebar from "./Sidebar";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const MainContent = ({ results, route, facets, paginationInfo }) =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.mainContent].join(" ")}>
      <Sidebar route={route} facets={facets} />
      <div
        className={
          route.query.list_view === "grid"
            ? classNames.gridWrapper
            : classNames.listWrapper
        }
      >
        {route.query.list_view === "grid"
          ? <GridView items={results} />
          : <ListView items={results} />}
        <Pagination
          route={route}
          itemsPerPage={paginationInfo.pageSize}
          currentPage={paginationInfo.currentPage}
          pageCount={Math.floor(
            paginationInfo.pageCount / paginationInfo.pageSize
          )}
        />
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainContent;
