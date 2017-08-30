import React from "react";

import FiltersBar from "./components/FiltersBar";
import FeatureHeader from "../../shared/FeatureHeader";
import Topics from "./components/Topics";
import Callout from "./components/Callout";
import mockTopics from "./mockTopics";

import { TITLE, DESCRIPTION } from "../../../constants/topicBrowse.js";

const TopicsList = props =>
  <div>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <FiltersBar />
    <Topics topics={mockTopics} />
    <Callout />
  </div>;

export default TopicsList;
