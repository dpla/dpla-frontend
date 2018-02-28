import React from "react";

import FeatureHeader from "shared/FeatureHeader";
import Topics from "./components/Topics";
import Callout from "./components/Callout";

import { TITLE, DESCRIPTION } from "constants/topicBrowse.js";

// NB: a FiltersBar component already exists in this directory,
// but we don't need it yet—there aren't enough topics to warrant filtering
const TopicsList = ({ topics }) =>
  <div>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <Topics topics={topics} />
    <Callout />
  </div>;

export default TopicsList;
