import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import styles from "./ResourcesTabs.css";
import { module } from "../../../../utils.css";

import SourceSetContent from "../SourceSetContent";

const ResourcesTabs = ({ routerProps }) =>
  <div className={styles.wrapper}>
    <div className={styles.tabsWrapper}>
      <div className={[styles.tabs, module].join(" ")}>
        <Link to={`${routerProps.match.url}/source-set`} className={styles.tab}>
          Source Set
        </Link>
        <Link
          to={`${routerProps.match.url}/additional-resources`}
          className={styles.tab}
        >
          Additional Resources
        </Link>
        <Link
          to={`${routerProps.match.url}/teaching-guide`}
          className={styles.tab}
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
    </div>
  </div>;

export default ResourcesTabs;
