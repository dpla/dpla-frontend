import React from "react";

import BreadcrumbsAndNav from "../../../components/TopicBrowseComponents/BreadcrumbsAndNav";
import MainContent from "../../../components/TopicBrowseComponents/Topic/MainContent";
import MainLayout from "../../../components/MainLayout";
import Suggestions from "../../../components/TopicBrowseComponents/Topic/Suggestions";

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
    <Suggestions suggestions={mockSuggestions} />
  </MainLayout>;

export default Topic;
