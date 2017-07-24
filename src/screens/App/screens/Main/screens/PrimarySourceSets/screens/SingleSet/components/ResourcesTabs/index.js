import React from "react";
import { Route } from "react-router";
import { Link, Switch } from "react-router-dom";

import styles from "./ResourcesTabs.css";
import { module } from "../../../../../../../../css/utils.css";

import SourceSetContent from "../SourceSetContent";
import TeachingGuide from "../TeachingGuide";

class ResourcesTabs extends React.Component {
  componentWillMount() {
    const { location, history } = this.props.routerProps;
    const isStudentMode = location.search.includes("student");
    if (/\/primary-source-sets\/.+\/teaching-guide/.exec(location.pathname)) {
      if (isStudentMode) {
        history.push(`${location.pathname}`);
      }
      this.setState({ currentTab: "teachingGuide" });
    } else if (
      /\/primary-source-sets\/.+\/additional-resources/.exec(location.pathname)
    ) {
      this.setState({ currentTab: "additionalResources" });
    } else {
      this.setState({ currentTab: "sourceSet" });
    }

    this.setState({ studentMode: isStudentMode });
  }

  onTabChange(newTab) {
    this.setState({ currentTab: newTab });
  }

  render() {
    const { location, match } = this.props.routerProps;
    const { search } = location;
    const { url } = match;
    const isStudentMode = search.includes("student");

    return (
      <div className={styles.wrapper}>
        <div className={styles.tabsWrapper}>
          <div className={[styles.tabs, module].join(" ")}>
            <Link
              to={{
                pathname: url,
                search
              }}
              onClick={() => this.onTabChange("sourceSet")}
              className={[
                styles.tab,
                this.state.currentTab === "sourceSet" && styles.activeTab
              ].join(" ")}
            >
              Source Set
            </Link>
            <Link
              to={{
                pathname: `${url}/additional-resources`,
                search
              }}
              onClick={() => this.onTabChange("additionalResources")}
              className={[
                styles.tab,
                this.state.currentTab === "additionalResources" &&
                  styles.activeTab
              ].join(" ")}
            >
              Additional Resources
            </Link>
            {!isStudentMode &&
              <Link
                to={{
                  pathname: `${url}/teaching-guide`,
                  search
                }}
                onClick={() => this.onTabChange("teachingGuide")}
                className={[
                  styles.tab,
                  this.state.currentTab === "teachingGuide" && styles.activeTab
                ].join(" ")}
              >
                Teaching Guide
              </Link>}
          </div>
        </div>
        <div className={[styles.resourcesTabs, module].join(" ")}>
          <Switch>
            <Route
              path="/primary-source-sets/:set/teaching-guide"
              render={() =>
                <TeachingGuide
                  onStudentModeRedirect={() =>
                    this.props.onTabChange("source-set")}
                  routerProps={this.props.routerProps}
                />}
            />
            <Route
              path="/primary-source-sets/:set"
              component={SourceSetContent}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default ResourcesTabs;
