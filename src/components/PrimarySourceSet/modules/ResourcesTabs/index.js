import React from "react";
import { Route } from "react-router";

import styles from "./ResourcesTabs.css";
import { module } from "../../../../utils.css";

import SourceSetContent from "../SourceSetContent";

const ResourcesTabs = () =>
  <div className={styles.wrapper}>
    <div className={styles.tabsWrapper}>
      <div className={[styles.tabs, module].join(" ")}>
        <button className={styles.tab}>Source Set</button>
        <button className={styles.tab}>Additional Resources</button>
        <button className={styles.tab}>Teaching Guide</button>
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
    </div>
  </div>;

export default ResourcesTabs;
