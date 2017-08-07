import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./HeaderSearchBar.css";

const dplaLogo = "/static/images/dpla-logo-white.svg";
const searchIcon = "/static/images/search.svg";

const HeaderSearchBar = () =>
  <div className={classNames.headerSearchBar}>
    <div className={classNames.flexWrapper}>
      <Link href="/">
        <a>
          <img alt="DPLA" src={dplaLogo} className={classNames.logo} />
        </a>
      </Link>
      <div className={classNames.searchBar}>
        <input
          className={classNames.searchInput}
          placeholder="Search the collection"
        />
        <button className={classNames.searchButton}>
          <img
            alt="Search"
            src={searchIcon}
            className={classNames.searchIcon}
          />
          <span>Search</span>
        </button>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default HeaderSearchBar;
