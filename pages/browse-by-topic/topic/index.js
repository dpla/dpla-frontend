import React from "react";
import fetch from "isomorphic-fetch";

import BreadcrumbsAndNav from "../../../components/TopicBrowseComponents/BreadcrumbsAndNav";
import MainContent from "../../../components/TopicBrowseComponents/Topic/MainContent";
import MainLayout from "../../../components/MainLayout";
import { API_ENDPOINT_ALL_TOPICS_100_PER_PAGE } from "constants/topicBrowse";

const Topic = ({ url, topic, subtopics }) =>
  <MainLayout route={url}>
    <BreadcrumbsAndNav
      breadcrumbs={[
        {
          title: "Browse by Topic",
          url: "/browse-by-topic"
        },
        {
          title: topic.name
        }
      ]}
    />
    <MainContent topic={topic} />
  </MainLayout>;

Topic.getInitialProps = async ({ query }) => {
  const topicsRes = await fetch(API_ENDPOINT_ALL_TOPICS_100_PER_PAGE);
  const topicsJson = await topicsRes.json();
  const currentTopic = topicsJson.find(topic => topic.slug === query.topic);
  const subtopics = topicsJson
    .filter(topic => topic.parent === currentTopic.id)
    .map(subtopic =>
      Object.assign({}, subtopic, { thumbnailUrl: subtopic.acf.category_image })
    );
  return { topic: Object.assign({}, currentTopic, { subtopics }) };
};

export default Topic;
