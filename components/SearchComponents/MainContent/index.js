import React from "react";
import { classNames, stylesheet } from "./MainContent.css";

import GridView from "components/shared/GridView";
import ListView from "components/shared/ListView";
import Sidebar from "./Sidebar";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const MainContent = ({ results, route, facets }) =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.mainContent].join(" ")}>
      <Sidebar route={route} facets={facets} />
      <div className={classNames.listWrapper}>
        {route.query.list_view === "grid"
          ? <GridView items={results} />
          : <ListView items={results} />}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainContent;
