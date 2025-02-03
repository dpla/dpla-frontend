import React from "react";

import FeatureHeader from "shared/FeatureHeader";
import Topics from "./components/Topics";
import Callout from "./components/Callout";

import { DESCRIPTION, TITLE } from "constants/topicBrowse";

function TopicsList(props) {
  const { topics } = props;
  return (
    <div>
      <FeatureHeader title={TITLE} description={DESCRIPTION} />
      <Topics topics={topics} />
      <Callout />
    </div>
  );
}

export default TopicsList;
