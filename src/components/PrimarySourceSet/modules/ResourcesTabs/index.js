import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import styles from "./ResourcesTabs.css";
import { module } from "../../../../utils.css";

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

  // onToggleStudentMode() {
  //   const { history, location } = this.props.routerProps;
  //   if (!this.state.studentMode) {
  //     const newPath = this.state.currentTab === "teachingGuide"
  //       ? `${location.pathname.replace(
  //           "teaching-guide",
  //           "source-set"
  //         )}/?student`
  //       : `${location.pathname}/?student`;
  //     history.push(newPath);
  //   } else {
  //     history.push(location.pathname);
  //   }
  //   this.setState({ studentMode: !this.state.studentMode });

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
              to={`${url}/source-set/${search}`}
              onClick={() => this.onTabChange("sourceSet")}
              className={[
                styles.tab,
                this.state.currentTab === "sourceSet" && styles.activeTab
              ].join(" ")}
            >
              Source Set
            </Link>
            <Link
              to={`${url}/additional-resources/${search}`}
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
                to={`${url}/teaching-guide/${search}`}
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
            render={() =>
              <TeachingGuide
                onStudentModeRedirect={() =>
                  this.props.onTabChange("source-set")}
                routerProps={this.props.routerProps}
              />}
          />
        </div>
      </div>
    );
  }
}

export default ResourcesTabs;
