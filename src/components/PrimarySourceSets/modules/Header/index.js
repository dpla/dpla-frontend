import React from "react";

import styles from "./Header.css";
import { module } from "../../../../utils.css";

const Header = () =>
  <div className={styles.headerWrapper}>
    <div className={[module, styles.headerContent].join(" ")}>
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
  </div>;

export default Header;
