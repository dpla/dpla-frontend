import React from "react";

import MainLayout from "components/MainLayout";
import TopicsList from "components/TopicBrowseComponents/TopicsList";
import {
  API_ENDPOINT_ALL_TOPICS_100_PER_PAGE,
  TITLE,
} from "constants/topicBrowse";
import { washObject } from "lib/washObject";

function TopicBrowse(props) {
  const { topics } = props;
  return (
    <div>
      <MainLayout pageTitle={TITLE}>
        <div id="main" role="main" data-cy={"topics-home"}>
          <TopicsList topics={topics} />
        </div>
      </MainLayout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(API_ENDPOINT_ALL_TOPICS_100_PER_PAGE);
  const json = await res.json();
  const topics = washObject(
    json.filter((topic) => !topic.parent && topic.name !== "Uncategorized"),
  );

  return {
    props: {
      topics,
    },
  };
};

export default TopicBrowse;
