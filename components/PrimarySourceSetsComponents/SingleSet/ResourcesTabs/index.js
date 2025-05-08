import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import css from "./ResourcesTabs.module.scss";
import utils from "stylesheets/utils.module.scss";

function ResourcesTabs({ currentTab, children }) {
  const router = useRouter();
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
            <Link href={`/primary-source-sets/${router.query.set}#tabs`}>
              Source Set
            </Link>
          </li>
          <li
            id="tab-additionalresources"
            role="tab"
            aria-selected={currentTab === "additionalResources"}
            className={[
              css.tab,
              currentTab === "additionalResources" && css.activeTab,
            ].join(" ")}
          >
            <Link
              href={`/primary-source-sets/${
                router.query.set
              }/additional-resources#tabs`}
            >
              Additional Resources
            </Link>
          </li>
          <li
            id="tab-teachingguide"
            role="tab"
            aria-selected={currentTab === "teachingGuide"}
            className={[
              css.tab,
              currentTab === "teachingGuide" && css.activeTab,
            ].join(" ")}
          >
            <Link
              href={`/primary-source-sets/${
                router.query.set
              }/teaching-guide#tabs`}
            >
              Teaching Guide
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}

export default ResourcesTabs;
