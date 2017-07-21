import React from "react";
import { Route, Switch } from "react-router-dom";

import AllSets from "./screens/AllSets";
import PSSFooter from "./components/PSSFooter";

const PrimarySourceSets = ({ match }) =>
  <div>
    <Switch>
      <Route path={match.url} exact={true} component={AllSets} />
    </Switch>
    <PSSFooter />
  </div>;

export default PrimarySourceSets;
