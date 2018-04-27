import React from "react";
import Link from "next/link";

import DPLALogoWide from "../../../../static/images/dpla-logo-white.svg";

import { SITE_ENV, LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

import css from "./PageHeader.scss";

const PageHeader = ({ searchQuery, hideSearchBar }) =>
  <div
    className={`${css.headerSearchBar} ${SITE_ENV === "pro" ? css.pro : ""}`}
  >
    <div
      className={`${css.flexWrapper}  ${SITE_ENV === "pro"
        ? css.pro
        : ""} site-max-width`}
    >
      {(SITE_ENV === "user" || SITE_ENV === "pro") &&
        <Link prefetch as="/" href={SITE_ENV === "user" ? "/" : "/pro"}>
          <a className={css.logo} title="Home Page">
            <DPLALogoWide className={css.logoImg} />
          </a>
        </Link>}
      {SITE_ENV === "local" &&
        <Link prefetch href="/search">
          <a className={`${css.logo} ${css.local}`} title="Home Page">
            <img
              className={css.localLogo}
              alt={`${LOCALS[LOCAL_ID].name} Home`}
              src={`/static/local/${LOCALS[LOCAL_ID].theme}/logo.jpg`}
            />
            <span className={css.localText}>{LOCALS[LOCAL_ID].name}</span>
          </a>
        </Link>}
      {!hideSearchBar &&
        SITE_ENV !== "pro" &&
        <form action="/search" className={css.searchBar}>
          <input
            className={css.searchInput}
            name="q"
            type="search"
            placeholder="Search the collection"
            aria-label="Search the collection"
            autoComplete="off"
            defaultValue={searchQuery}
          />
          <button type="submit" className={css.searchButton}>
            Search
          </button>
        </form>}
    </div>
  </div>;

export default PageHeader;
