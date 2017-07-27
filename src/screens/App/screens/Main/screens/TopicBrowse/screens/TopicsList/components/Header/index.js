import React from "react";

import styles from "./Header.css";
import { module } from "../../../../../../../../css/utils.css";

const Header = () =>
  <div className={styles.headerWrapper}>
    <div className={[module, styles.headerContent].join(" ")}>
      <h1 className={styles.headerText}>Browse By Topic</h1>
      <p className={styles.headerDescription}>
        Materials from libraries, archives and museums across the United States,
        organized by DPLA's content curation staff into easy to navigate
        sub-topics.
      </p>
    </div>
  </div>;

export default Header;
