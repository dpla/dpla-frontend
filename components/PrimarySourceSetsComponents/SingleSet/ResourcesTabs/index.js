import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./ResourcesTabs.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

// import SourceSetSources from "../SourceSetSources";
// import TeachingGuide from "../TeachingGuide";

class ResourcesTabs extends React.Component {
  componentWillMount() {
    // const { location, history } = this.props.routerProps;
    // const isStudentMode = location.search.includes("student");
    // if (/\/primary-source-sets\/.+\/teaching-guide/.exec(location.pathname)) {
    //   if (isStudentMode) {
    //     history.push(`${location.pathname}`);
    //   }
    //   this.setState({ currentTab: "teachingGuide" });
    // } else if (
    //   /\/primary-source-sets\/.+\/additional-resources/.exec(location.pathname)
    // ) {
    //   this.setState({ currentTab: "additionalResources" });
    // } else {
    //   this.setState({ currentTab: "sourceSet" });
    // }

    this.setState({ studentMode: false });
  }

  onTabChange(newTab) {
    this.setState({ currentTab: newTab });
  }

  render() {
    const isStudentMode = false;

    return (
      <div className={classNames.wrapper}>
        <div className={classNames.tabsWrapper}>
          <div className={[classNames.tabs, module].join(" ")}>
            <Link onClick={() => this.onTabChange("sourceSet")}>
              <a className={[classNames.tab, classNames.activeTab].join(" ")}>
                Source Set
              </a>
            </Link>
            <Link onClick={() => this.onTabChange("additionalResources")}>
              <a
                className={[
                  classNames.tab,
                  this.state.currentTab === "additionalResources" &&
                    classNames.activeTab
                ].join(" ")}
              >
                Additional Resources
              </a>
            </Link>
            {!isStudentMode &&
              <Link onClick={() => this.onTabChange("teachingGuide")}>
                <a
                  className={[
                    classNames.tab,
                    this.state.currentTab === "teachingGuide" &&
                      classNames.activeTab
                  ].join(" ")}
                >
                  Teaching Guide
                </a>
              </Link>}
          </div>
        </div>
        {this.props.children}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default ResourcesTabs;
