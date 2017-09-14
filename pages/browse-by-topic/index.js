import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../components/MainLayout";
import TopicsList from "../../components/TopicBrowseComponents/TopicsList";

const TopicBrowse = ({ url }) =>
  <div>
    <MainLayout route={url}>
      <TopicsList />
    </MainLayout>
  </div>;

export default TopicBrowse;
