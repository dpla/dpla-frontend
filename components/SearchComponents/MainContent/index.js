import React from "react";
import { classNames, stylesheet } from "./MainContent.css";

import GridView from "components/shared/GridView";
import ListView from "components/shared/ListView";
import Sidebar from "./Sidebar";
import { classNames as utilClassNames } from "css/utils.css";
import items from "components/TopicBrowseComponents/SubtopicItemsList/mockItems";
const { module } = utilClassNames;

const view = "list";

const MainContent = () =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.mainContent].join(" ")}>
      <Sidebar />
      <div className={classNames.listWrapper}>
        {view === "grid"
          ? <GridView items={items} />
          : <ListView items={items} />}
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainContent;
