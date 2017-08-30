import React from "react";

import styles from "./TopicsList.css";

import Filters from "./components/Filters";
import FeatureHeader from "../../shared/FeatureHeader";
import Topics from "./components/Topics";
import Callout from "./components/Callout";
import mockTopics from "./mockTopics";

import { TITLE, DESCRIPTION } from "../../../constants/topicBrowse.js";

const TopicsList = props =>
  <div className={styles.allTopics}>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <Filters />
    <Topics topics={mockTopics} />
    <Callout />
  </div>;

export default TopicsList;
