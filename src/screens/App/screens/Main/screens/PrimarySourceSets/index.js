import React from "react";
import { Route, Switch } from "react-router-dom";

import AllSets from "./screens/AllSets";
import SingleSet from "./screens/SingleSet";
import PSSFooter from "./components/PSSFooter";

const PrimarySourceSets = ({ match }) =>
  <div>
    <Switch>
      <Route path={match.url} exact={true} component={AllSets} />
      <Route path={`${match.url}/:set`} component={SingleSet} />
    </Switch>
    <PSSFooter />
  </div>;

export default PrimarySourceSets;
