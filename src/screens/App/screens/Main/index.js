import React from "react";
import { Route } from "react-router-dom";

import HeaderSearchBar from "./components/HeaderSearchBar";
import PrimarySourceSets from "./screens/PrimarySourceSets";

const Main = () =>
  <div>
    <HeaderSearchBar />
    <Route
      path="/primary-source-sets"
      exact={true}
      component={PrimarySourceSets}
    />
  </div>;

export default Main;
