import React from "react";

import styles from "./PrimarySourceSets.css";

const PrimarySourceSets = () =>
  <div className={styles.primarySourceSets}>
    <div className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerText}>
          <div>Primary</div>
          <div className={styles.nowrap}>Source Sets</div>
        </h1>
        <p className={styles.headerDescription}>
          Primary source collections exploring topics in history, literature,
          and culture developed by educators — complete with teaching guides
          for class use.
        </p>
      </div>
    </div>
  </div>;

export default PrimarySourceSets;
