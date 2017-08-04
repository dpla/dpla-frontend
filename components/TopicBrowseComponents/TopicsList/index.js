import React from "react";

import styles from "./TopicsList.css";

import Filters from "./components/Filters";
import Header from "./components/Header";
import Topics from "./components/Topics";
import Callout from "./components/Callout";

import mockTopics from "./mockTopics";

const TopicsList = props =>
  <div className={styles.allTopics}>
    <Header />
    <Filters />
    <Topics topics={mockTopics} />
    <Callout />
  </div>;

export default TopicsList;
