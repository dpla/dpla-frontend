import React from "react";
import Link from "next/link";
import { withRouter } from "next/router"

import css from "./ResourcesTabs.module.scss";
import utils from "stylesheets/utils.module.scss"

class ResourcesTabs extends React.Component {
  render() {
    const { currentTab, router } = this.props;
    return (
      <div id="tabs" className={css.wrapper} data-cy={"pss-tabs"}>
        <div className={css.tabsWrapper}>
          <ul role="tablist" className={`${css.tabs} ${utils.container}`}>
            <li
              id="tab-sourceset"
              role="tab"
              aria-selected={currentTab === "sourceSet"}
              className={`${css.tab} ${currentTab === "sourceSet" && css.activeTab}`}
            >
              <Link
                href={`/primary-source-sets/set?set=${router.query.set}#tabs`}
                as={`/primary-source-sets/${router.query.set}#tabs`}
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
                href={`/primary-source-sets/set/additional-resources?set=${router
                  .query.set}#tabs`}
                as={`/primary-source-sets/${router.query
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
                href={`/primary-source-sets/set/teaching-guide?set=${router.query
                  .set}#tabs`}
                as={`/primary-source-sets/${router.query
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

export default withRouter(ResourcesTabs);
