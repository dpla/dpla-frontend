import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./ResourcesTabs.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

class ResourcesTabs extends React.Component {
  render() {
    console.log("query", this.props.route.query);
    const { currentTab, route } = this.props;
    return (
      <div className={classNames.wrapper}>
        <div className={classNames.tabsWrapper}>
          <div className={[classNames.tabs, module].join(" ")}>
            <Link
              href={`/primary-source-sets/set?set=${route.query.set}`}
              as={`/primary-source-sets/${route.query.set}`}
            >
              <a
                className={[
                  classNames.tab,
                  currentTab === "sourceSet" && classNames.activeTab
                ].join(" ")}
              >
                Source Set
              </a>
            </Link>
            <Link onClick={() => this.onTabChange("additionalResources")}>
              <a
                className={[
                  classNames.tab,
                  currentTab === "additionalResources" && classNames.activeTab
                ].join(" ")}
              >
                Additional Resources
              </a>
            </Link>
            {!route.query.studentMode &&
              <Link
                href={`/primary-source-sets/set/teaching-guide?set=${route.query
                  .set}`}
                as={`/primary-source-sets/${route.query.set}/teaching-guide`}
              >
                <a
                  className={[
                    classNames.tab,
                    currentTab === "teachingGuide" && classNames.activeTab
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
