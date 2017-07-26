import React from "react";
import { Route, Switch } from "react-router-dom";

import TopicListing from "./screens/TopicListing";
import Topic from "./screens/Topic";

const ExploreByTopic = ({ match }) =>
  <div>
    <Switch>
      <Route path={match.url} exact={true} component={TopicListing} />
      <Route path={`${match.url}/:topic`} component={Topic} />
    </Switch>
  </div>;

export default ExploreByTopic;
