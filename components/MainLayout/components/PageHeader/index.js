import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./PageHeader.css";

const dplaLogo = "/static/images/dpla-logo-white.svg";
const searchIcon = "/static/images/search.svg";

const PageHeader = () =>
  <div className={classNames.headerSearchBar}>
    <div className={`${classNames.flexWrapper} site-max-width`}>
      <Link href="/">
        <a className={classNames.logo} title="DPLA Home Page">
          <img
            alt="Logo for the Digital Public Library of America"
            src={dplaLogo}
            className={classNames.logoImg}
          />
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

export default PageHeader;
