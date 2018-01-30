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
          <ul
            role="tablist"
            className={`${classNames.tabs} ${utilClassNames.container}`}
          >
            <li
              id="tab-sourceset"
              role="tab"
              aria-selected={currentTab === "sourceSet"}
              className={[
                classNames.tab,
                currentTab === "sourceSet" && classNames.activeTab
              ].join(" ")}
            >
              <Link
                prefetch
                href={`/primary-source-sets/set?set=${route.query.set}#tabs`}
                as={`/primary-source-sets/${route.query.set}#tabs`}
              >
                <a>
                  Source Set
                </a>
              </Link>
            </li>
            <li
              id="tab-additionalresources"
              role="tab"
              aria-selected={currentTab === "additionalResources"}
              className={[
                classNames.tab,
                currentTab === "additionalResources" && classNames.activeTab
              ].join(" ")}
            >
              <Link
                prefetch
                href={`/primary-source-sets/set/additional-resources?set=${route
                  .query.set}#tabs`}
                as={`/primary-source-sets/${route.query
                  .set}/additional-resources#tabs`}
              >
                <a>
                  Additional Resources
                </a>
              </Link>
            </li>
            <li
              id="tab-teachingguide"
              role="tab"
              aria-selected={currentTab === "teachingGuide"}
              className={[
                classNames.tab,
                currentTab === "teachingGuide" && classNames.activeTab
              ].join(" ")}
            >
              <Link
                prefetch
                href={`/primary-source-sets/set/teaching-guide?set=${route.query
                  .set}#tabs`}
                as={`/primary-source-sets/${route.query
                  .set}/teaching-guide#tabs`}
              >
                <a>
                  Teaching Guide
                </a>
              </Link>
            </li>
          </ul>
        </div>
        {this.props.children}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default ResourcesTabs;
