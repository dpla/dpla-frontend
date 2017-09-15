import React from "react";
import fetch from "isomorphic-fetch";

import BreadcrumbsAndNav from "../../../components/TopicBrowseComponents/BreadcrumbsAndNav";
import MainContent from "../../../components/TopicBrowseComponents/Topic/MainContent";
import MainLayout from "../../../components/MainLayout";
import { API_ENDPOINT_SINGLE_TOPIC } from "constants/topicBrowse";

import mockTopic from "../../../components/TopicBrowseComponents/Topic/mockTopic";
import mockSuggestions from "../../../components/TopicBrowseComponents/Topic/mockSuggestions";

const Topic = ({ url }) =>
  <MainLayout route={url}>
    <BreadcrumbsAndNav
      breadcrumbs={[
        {
          title: "Browse by Topic",
          url: "/browse-by-topic"
        },
        {
          title: mockTopic.title
        }
      ]}
    />
    <MainContent topic={mockTopic} />
  </MainLayout>;

Topic.getInitialProps = async ({ query }) => {
  // const res = await fetch(API_ENDPOINT_ALL_TOPICS);
  // const json = await res.json();
  // const topics = json.filter(topic => !topic.parent);
  //
  return {};
};

export default Topic;
