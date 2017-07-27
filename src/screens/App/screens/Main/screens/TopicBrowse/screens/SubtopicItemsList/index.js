import React from "react";

import styles from "./SubtopicItemsList.css";
import BreadcrumbsModule from "../../../../../../components/BreadcrumbsModule";

import mockSubtopic from "./mockSubtopic";

const SubtopicItemsList = props =>
  <div className={styles.allTopics}>
    <BreadcrumbsModule
      breadcrumbs={[
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: mockSubtopic.topicTitle,
          url: `/browse-by-topic/${mockSubtopic.topicSlug}`
        },
        { title: mockSubtopic.title, url: "" }
      ]}
      routerProps={props}
      prevAndNextArrows={true}
    />
    <BreadcrumbsModule
      breadcrumbs={[
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: mockSubtopic.topicTitle,
          url: `/browse-by-topic/${mockSubtopic.topicSlug}`
        },
        { title: mockSubtopic.title, url: "" }
      ]}
      routerProps={props}
      prevAndNextArrows={true}
    />
  </div>;

export default SubtopicItemsList;
