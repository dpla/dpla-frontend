import React from "react";
import { Route } from "react-router-dom";

import HeaderSearchBar from "./components/HeaderSearchBar";
import PrimarySourceSets from "./screens/PrimarySourceSets";
import TopicBrowse from "./screens/TopicBrowse";

const Main = () =>
  <div>
    <HeaderSearchBar />
    <Route path="/primary-source-sets" component={PrimarySourceSets} />
    <Route path="/browse-by-topic" component={TopicBrowse} />
  </div>;

export default Main;
