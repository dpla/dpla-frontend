import React from "react";

import styles from "./HeaderSearchBar.css";

import dplaLogo from "../../images/dpla-logo-white.svg";
import searchIcon from "../../images/search.svg";

const HeaderSearchBar = () =>
  <div className={styles.headerSearchBar}>
    <div className={styles.flexWrapper}>
      <img alt="DPLA" src={dplaLogo} className={styles.logo} />
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Search the collection"
        />
        <button className={styles.searchButton}>
          <img alt="Search" src={searchIcon} className={styles.searchIcon} />
          <span>Search</span>
        </button>
      </div>
    </div>
  </div>;

export default HeaderSearchBar;
