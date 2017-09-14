import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../components/MainLayout";
import TopicsList from "../../components/TopicBrowseComponents/TopicsList";
import { API_ENDPOINT_ALL_ITEMS } from "constants/topicBrowse";

const TopicBrowse = ({ url, topics }) =>
  <div>
    <MainLayout route={url}>
      <TopicsList topics={topics} />
    </MainLayout>
  </div>;

TopicBrowse.getInitialProps = async ({ query }) => {
  const res = await fetch(API_ENDPOINT_ALL_ITEMS);
  const json = await res.json();

  return { topics: json };
};

export default TopicBrowse;
