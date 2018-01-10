import React from "react";
import Link from "next/link";

import { SITE_ENV } from "constants/env";

import { stylesheet, classNames } from "./PageHeader.css";

const dplaLogo = "/static/images/dpla-logo-white.svg";

const PageHeader = ({ searchQuery, hideSearchBar }) =>
  <div
    className={`${classNames.headerSearchBar} ${SITE_ENV === "pro"
      ? classNames.pro
      : ""}`}
  >
    <div
      className={`${classNames.flexWrapper}  ${SITE_ENV === "pro"
        ? classNames.pro
        : ""} site-max-width`}
    >
      <Link prefetch href="/">
        <a className={classNames.logo} title="DPLA Home Page">
          <img
            alt="Logo for the Digital Public Library of America"
            src={dplaLogo}
            className={classNames.logoImg}
          />
        </a>
      </Link>
      {!hideSearchBar &&
        SITE_ENV !== "pro" &&
        <form action="/search" className={classNames.searchBar}>
          <input
            className={classNames.searchInput}
            name="q"
            type="search"
            placeholder="Search the collection"
            aria-label="Search the collection"
            autoComplete="off"
            defaultValue={searchQuery}
          />
          <button type="submit" className={classNames.searchButton}>
            Search
          </button>
        </form>}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default PageHeader;
