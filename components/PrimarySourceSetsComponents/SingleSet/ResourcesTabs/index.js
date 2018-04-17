import React from "react";
import Link from "next/link";

import utils from "stylesheets/utils.scss";
import css from "./ResourcesTabs.scss";

class ResourcesTabs extends React.Component {
  render() {
    const { currentTab, route } = this.props;
    return (
      <div id="tabs" className={`${css.wrapper}`}>
        <div className={css.tabsWrapper}>
          <ul role="tablist" className={`${css.tabs} ${utils.container}`}>
            <li
              id="tab-sourceset"
              role="tab"
              aria-selected={currentTab === "sourceSet"}
              className={[
                css.tab,
                currentTab === "sourceSet" && css.activeTab
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
                css.tab,
                currentTab === "additionalResources" && css.activeTab
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
                css.tab,
                currentTab === "teachingGuide" && css.activeTab
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
      </div>
    );
  }
}

export default ResourcesTabs;
