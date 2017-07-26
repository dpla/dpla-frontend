import React from "react";
import { Route, Switch } from "react-router-dom";

import TopicListing from "./screens/TopicListing";

const ExploreByTopic = ({ match }) =>
  <div>
    <Switch>
      <Route path={match.url} exact={true} component={TopicListing} />
    </Switch>
  </div>;

export default ExploreByTopic;
