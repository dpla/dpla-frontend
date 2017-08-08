import React from "react";

import { stylesheet, classNames } from "./LandingSection.css";
import Link from "next/link";

const searchIcon = "static/images/search.svg";
const dplaLogo = "static/images/dpla-logo.svg";
const chevron = "static/images/chevron-thick-dark-blue.svg";

const LandingSection = () =>
  <div className={classNames.home}>
    <div className={classNames.logoAndDonate}>
      <img className={classNames.dplaLogo} alt="DPLA" src={dplaLogo} />
      <button className={classNames.donateButton}>Donate</button>
    </div>
    <div className={classNames.content}>
      <p className={classNames.text}>
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
        <Link className={classNames.link} to="">
          Browse by Topic
        </Link>
        <Link className={classNames.link} to="">
          New? Start Here
        </Link>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default LandingSection;
