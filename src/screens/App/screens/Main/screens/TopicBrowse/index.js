import React from "react";
import { Route, Switch } from "react-router-dom";

import TopicsList from "./screens/TopicsList";
import Topic from "./screens/Topic";
import SubtopicItemsList from "./screens/SubtopicItemsList";

const TopicBrowse = ({ match }) =>
  <div>
    <Switch>
      <Route path={match.url} exact={true} component={TopicsList} />
      <Route
        path={`${match.url}/:topic/:topicItem`}
        component={SubtopicItemsList}
      />
      <Route path={`${match.url}/:topic`} component={Topic} />
    </Switch>
  </div>;

export default TopicBrowse;
