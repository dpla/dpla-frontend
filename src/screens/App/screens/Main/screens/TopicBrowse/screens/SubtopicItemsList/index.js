import React from "react";

import styles from "./SubtopicItemsList.css";
import BreadcrumbsAndNav from "../../components/BreadcrumbsAndNav";
import Sidebar from "./components/Sidebar";
import ItemList from "./components/ItemList";

import { module } from "../../../../../../css/utils.css";

import mockSubtopic from "./mockSubtopic";
import mockItems from "./mockItems";

const SubtopicItemsList = props =>
  <div className={styles.ubtopicItemsList}>
    <BreadcrumbsAndNav
      breadcrumbs={[
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: mockSubtopic.topicTitle,
          url: `/browse-by-topic/${mockSubtopic.topicSlug}`
        },
        { title: mockSubtopic.title, url: "" }
      ]}
      routerProps={props}
      showNavLinks={true}
    />
    <div className={[styles.sidebarAndItemList, module].join(" ")}>
      <Sidebar
        title={mockSubtopic.title}
        description={mockSubtopic.description}
        image="http://lorempixel.com/300/200/food"
      />
      <ItemList items={mockItems} />
    </div>
    <BreadcrumbsAndNav
      breadcrumbs={[
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: mockSubtopic.topicTitle,
          url: `/browse-by-topic/${mockSubtopic.topicSlug}`
        },
        { title: mockSubtopic.title, url: "" }
      ]}
      routerProps={props}
      showNavLinks={true}
      prevAndNextArrows={true}
    />
  </div>;

export default SubtopicItemsList;
