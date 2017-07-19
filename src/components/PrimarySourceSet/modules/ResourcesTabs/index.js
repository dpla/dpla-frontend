import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import styles from "./ResourcesTabs.css";
import { module } from "../../../../utils.css";

import SourceSetContent from "../SourceSetContent";
import TeachingGuide from "../TeachingGuide";

class ResourcesTabs extends React.Component {
  componentWillMount() {
    this.setState({ currentTab: "sourceSet" });
  }

  onTabChange(newTab) {
    this.setState({ currentTab: newTab });
  }

  render() {
    const { routerProps } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.tabsWrapper}>
          <div className={[styles.tabs, module].join(" ")}>
            <Link
              to={`${routerProps.match.url}/source-set`}
              onClick={() => this.onTabChange("sourceSet")}
              className={[
                styles.tab,
                this.state.currentTab === "sourceSet" && styles.activeTab
              ].join(" ")}
            >
              Source Set
            </Link>
            <Link
              to={`${routerProps.match.url}/additional-resources`}
              onClick={() => this.onTabChange("additionalResources")}
              className={[
                styles.tab,
                this.state.currentTab === "additionalResources" &&
                  styles.activeTab
              ].join(" ")}
            >
              Additional Resources
            </Link>
            <Link
              to={`${routerProps.match.url}/teaching-guide`}
              onClick={() => this.onTabChange("teachingGuide")}
              className={[
                styles.tab,
                this.state.currentTab === "teachingGuide" && styles.activeTab
              ].join(" ")}
            >
              Teaching Guide
            </Link>
          </div>
        </div>
        <div className={[styles.resourcesTabs, module].join(" ")}>
          <Route
            path="/primary-source-sets/:id/"
            exact={true}
            component={SourceSetContent}
          />
          <Route
            path="/primary-source-sets/:id/source-set"
            exact={true}
            component={SourceSetContent}
          />
          <Route
            path="/primary-source-sets/:id/teaching-guide"
            exact={true}
            component={TeachingGuide}
          />
        </div>
      </div>
    );
  }
}

export default ResourcesTabs;
