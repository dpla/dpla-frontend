import React from "react";

import styles from "./Topic.css";

import BreadcrumbsAndNav from "../../components/BreadcrumbsAndNav";
import MainContent from "./components/MainContent";
import Suggestions from "./components/Suggestions";

import mockTopic from "./mockTopic";
import mockSuggestions from "./mockSuggestions";

const Topic = props =>
  <div className={styles.topic}>
    <BreadcrumbsAndNav
      breadcrumbs={[
        { title: "Browse by Topic", url: "/browse-by-topic" },
        { title: mockTopic.title, url: props.match.url }
      ]}
      routerProps={props}
    />
    <MainContent routerProps={props} topic={mockTopic} />
    <Suggestions suggestions={mockSuggestions} />
  </div>;

export default Topic;
