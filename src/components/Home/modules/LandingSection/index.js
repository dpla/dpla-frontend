import React from "react";

import styles from "./LandingSection.css";
import { Link } from "react-router-dom";

import dplaLogo from "../../../../images/dpla-logo.svg";

const LandingSection = () =>
  <div className={styles.home}>
    <div className={styles.logoAndDonate}>
      <img className={styles.dplaLogo} alt="DPLA" src={dplaLogo} />
      <button className={styles.donateButton}>Donate</button>
    </div>
    <div className={styles.content}>
      <p className={styles.text}>
        A collection of 16,340,976 free digital artifacts from
        over 120 libraries, archives and museums
      </p>
      <div className={styles.search}>
        <input
          className={styles.searchInput}
          placeholder="Search the collection"
        />
        <div className={styles.searchOptions}>
          All types
        </div>
        <button className={styles.searchButton}>
          Search
        </button>
      </div>
      <div className={styles.links}>
        <Link className={styles.link} to="">Browse by Topic</Link>
        <Link className={styles.link} to="">New? Start Here</Link>
      </div>
    </div>
  </div>;

export default LandingSection;
