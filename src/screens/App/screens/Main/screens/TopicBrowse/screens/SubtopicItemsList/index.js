import React from "react";

import styles from "./SubtopicItemsList.css";
import BreadcrumbsAndNav from "../../components/BreadcrumbsAndNav";

import mockSubtopic from "./mockSubtopic";

const SubtopicItemsList = props =>
  <div className={styles.allTopics}>
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
      prevAndNextArrows={true}
    />
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
      prevAndNextArrows={true}
    />
  </div>;

export default SubtopicItemsList;
