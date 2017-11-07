import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./ResourcesTabs.css";
import { classNames as utilClassNames } from "css/utils.css";

class ResourcesTabs extends React.Component {
  render() {
    const { currentTab, route } = this.props;
    return (
      <div id="tabs" className={`${classNames.wrapper}`}>
        <div className={`${classNames.tabsWrapper} sourceSetTabsWrapper`}>
          <div className={`${classNames.tabs} ${utilClassNames.container}`}>
            <Link
              prefetch
              href={`/primary-source-sets/set?set=${route.query.set}#tabs`}
              as={`/primary-source-sets/${route.query.set}#tabs`}
            >
              <a
                className={[
                  classNames.tab,
                  currentTab === "sourceSet" && classNames.activeTab
                ].join(" ")}
              >
                <span className={classNames.hideOnSmallScreen}>
                  Source{" "}
                </span>{" "}
                Set
              </a>
            </Link>
            <Link
              prefetch
              href={`/primary-source-sets/set/additional-resources?set=${route
                .query.set}#tabs`}
              as={`/primary-source-sets/${route.query
                .set}/additional-resources#tabs`}
            >
              <a
                className={[
                  classNames.tab,
                  currentTab === "additionalResources" && classNames.activeTab
                ].join(" ")}
              >
                <span className={classNames.hideOnSmallScreen}>
                  Additional
                </span>{" "}
                Resources
              </a>
            </Link>
            {!route.query.studentMode &&
              <Link
                prefetch
                href={`/primary-source-sets/set/teaching-guide?set=${route.query
                  .set}#tabs`}
                as={`/primary-source-sets/${route.query
                  .set}/teaching-guide#tabs`}
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
