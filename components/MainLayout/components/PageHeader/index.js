import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import DplaLogoWhite from "components/svg/DplaLogoWhite";

import { LOCALS } from "constants/local";

import css from "./PageHeader.module.scss";
import utils from "stylesheets/utils.module.scss";

function PageHeader({ hideSearchBar }) {
  const router = useRouter();
  const searchQuery =
    router && router.pathname === "/search" && router.query && router.query.q
      ? router.query.q
      : "";

  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;

  return (
    <div
      className={`${css.headerSearchBar} ${siteEnv === "pro" ? css.pro : ""}`}
    >
      <div
        className={`${css.flexWrapper}  ${
          siteEnv === "pro" ? css.pro : ""
        } ${utils.siteMaxWidth}`}
      >
        {(siteEnv === "user" || siteEnv === "pro") && (
          <Link href="/" className={css.logo} title="Home Page">
            <DplaLogoWhite className={css.logoImg} />
          </Link>
        )}
        {siteEnv === "local" && (
          <Link
            href="/"
            className={`${css.logo} ${css.local}`}
            title="Home Page"
          >
            <img
              className={css.localLogo}
              alt={`${LOCALS[localId].name} Home`}
              src={`/static/local/${LOCALS[localId].theme}/${
                LOCALS[localId].logo
              }`}
            />
            <span className={css.localText}>{LOCALS[localId].name}</span>
          </Link>
        )}
        {!hideSearchBar && siteEnv !== "pro" && (
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
              Object.keys(router.query).map((key) => {
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
