import React from "react";
import Link from "next/link";

import DPLALogoWide from "../../../../static/images/dpla-logo-white.svg";

import { SITE_ENV } from "constants/env";

import { stylesheet, classNames } from "./PageHeader.css";

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
      <Link prefetch as="/" href={SITE_ENV === "user" ? "/" : "/pro"}>
        <a className={classNames.logo} title="Home Page">
          <DPLALogoWide className={classNames.logoImg} />
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
