import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

import DplaLogoWhite from "components/svg/DplaLogoWhite";

import {LOCAL_ID, SITE_ENV} from "constants/env";
import {LOCALS} from "constants/local";

import css from "./PageHeader.module.scss";
import utils from "stylesheets/utils.module.scss";

function PageHeader({hideSearchBar}) {
  const router = useRouter();
  const searchQuery =
    router && router.pathname === "/search" && router.query && router.query.q
      ? router.query.q
      : "";
  return (
    <div
      className={`${css.headerSearchBar} ${SITE_ENV === "pro" ? css.pro : ""}`}
    >
      <div
        className={`${css.flexWrapper}  ${
          SITE_ENV === "pro" ? css.pro : ""
        } ${utils.siteMaxWidth}`}
      >
        {(SITE_ENV === "user" || SITE_ENV === "pro") && (
          <Link
            as="/"
            href={SITE_ENV === "user" ? "/" : "/pro"}
            className={css.logo}
            title="Home Page"
          >
            <DplaLogoWhite className={css.logoImg}/>
          </Link>
        )}
        {SITE_ENV === "local" && (
          <Link
            href="/local"
            as="/"
            className={`${css.logo} ${css.local}`}
            title="Home Page"
          >
            <img
              className={css.localLogo}
              alt={`${LOCALS[LOCAL_ID].name} Home`}
              src={`/static/local/${LOCALS[LOCAL_ID].theme}/${
                LOCALS[LOCAL_ID].logo
              }`}
            />
            <span className={css.localText}>{LOCALS[LOCAL_ID].name}</span>
          </Link>
        )}
        {!hideSearchBar && SITE_ENV !== "pro" && (
          <form action="/search" className={css.searchBar}>
            <input
              key={searchQuery}
              className={css.searchInput}
              name="q"
              type="search"
              placeholder="Search the collection"
              aria-label="Search the collection"
              autoComplete="off"
              defaultValue={searchQuery}
            />
            {router &&
              router.pathname === "/search" &&
              router.query &&
              Object.keys(router.query).map((key, index) => {
                if (key !== "q" && key !== "page") {
                  return (
                    <input
                      type="hidden"
                      key={`k_${key}`}
                      name={key}
                      value={router.query[key]}
                    />
                  );
                }
              })}
            <button type="submit" className={css.searchButton}>
              Search
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
