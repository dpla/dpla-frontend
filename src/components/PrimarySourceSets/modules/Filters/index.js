import React from "react";

import styles from "./Filters.css";
import { module } from "../../../../utils.css";

const Filters = () =>
  <div className={styles.filtersWrapper}>
    <div className={[module, styles.filters].join(" ")}>
      <input className={styles.textInput} placeholder="Filter by title" />
      <select className={styles.select}>
        <option value="test">Test</option>
      </select>
      <select className={styles.select}>
        <option value="test">Test</option>
      </select>
      <select className={styles.select}>
        <option value="test">Test</option>
      </select>
    </div>
  </div>;

export default Filters;
