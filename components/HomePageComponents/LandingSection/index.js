import React from "react";

import { stylesheet, classNames } from "./LandingSection.css";
import Link from "next/link";

const searchIcon = "static/images/search.svg";
const dplaLogo = "static/images/dpla-logo.svg";
const chevron = "static/images/chevron-thick-dark-blue.svg";

const LandingSection = () =>
  <div className={classNames.wrapper}>
    <div className={classNames.header}>
      <div>
        <img className={classNames.dplaLogo} alt="DPLA" src={dplaLogo} />
      </div>
      <button className={classNames.donateButton}>Donate</button>
    </div>
    <div className={classNames.content}>
      <p className={classNames.headline}>
        A collection of 16,340,976 free digital artifacts from over 120
        libraries, archives and museums
      </p>
      <div className={classNames.search}>
        <input
          className={classNames.searchInput}
          placeholder="Search the collection"
        />
        <div className={classNames.searchOptions}>
          <span>All types</span>
          <img
            alt="select types"
            className={classNames.chevron}
            src={chevron}
          />
        </div>
        <button className={classNames.searchButton}>
          <img
            alt="search"
            className={classNames.searchIcon}
            src={searchIcon}
          />
          <span>Search</span>
        </button>
      </div>
      <div className={classNames.links}>
        <Link href="/browse-by-topic">
          <a title="Browse DPLA by a curated set of topics">Browse by Topic</a>
        </Link>
        <Link href="/guides">
          <a title="View our Getting Started Guides">New? Start Here</a>
        </Link>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default LandingSection;
