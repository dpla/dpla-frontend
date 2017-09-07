import React from "react";

import { stylesheet, classNames } from "./HomeHero.css";
import Link from "next/link";

const searchIcon = "static/images/search.svg";
const dplaLogo = "static/images/dpla-logo.svg";
const chevron = "static/images/chevron-thick-dark-blue.svg";

const HomeHero = () =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.header} site-max-width`}>
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
      <form action="/search">
        <div className={classNames.search}>
          <input
            className={classNames.searchInput}
            placeholder="Search the collection"
            name="q"
            type="search"
          />
          <div className={classNames.searchOptions}>
            <select name="type" className={classNames.optionsSelect}>
              <option value="all">All types</option>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="sound">Sound</option>
              <option value="moving image">Moving Image</option>
              <option value="physical object">Physical Object</option>
            </select>
            <img alt="" className={classNames.chevron} src={chevron} />
          </div>
          <button type="submit" className={classNames.searchButton}>
            <img
              alt="search"
              className={classNames.searchIcon}
              src={searchIcon}
            />
            <span>Search</span>
          </button>
        </div>
      </form>
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

export default HomeHero;
