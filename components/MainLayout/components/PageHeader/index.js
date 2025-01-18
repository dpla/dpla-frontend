import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import Image from "next/image";

const dplaLogoWide  = "public/static/images/dpla-logo-white.svg";

import { SITE_ENV, LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

import css from "./PageHeader.module.scss";
import utils from "stylesheets/utils.module.scss"

class PageHeader extends React.Component {
  render() {
    const { hideSearchBar, router } = this.props;
    const searchQuery = (router && router.pathname === "/search" && router.query && router.query.q)
        ? router.query.q : ""
    return (
      <div
        className={`${css.headerSearchBar} ${SITE_ENV === "pro"
          ? css.pro
          : ""}`}
      >
        <div
          className={`${css.flexWrapper}  ${SITE_ENV === "pro"
            ? css.pro
            : ""} ${utils.siteMaxWidth}`}
        >
          {(SITE_ENV === "user" || SITE_ENV === "pro") &&
            <Link as="/" href={SITE_ENV === "user" ? "/" : "/pro"} className={css.logo} title="Home Page">
              <Image src={"/static/images/dpla-logo-white.svg"} width="749" height="90" alt="DPLA" className={css.logoImg} />
            </Link>}
          {SITE_ENV === "local" &&
            <Link href="/local" as="/" className={`${css.logo} ${css.local}`} title="Home Page">
                <img
                  className={css.localLogo}
                  alt={`${LOCALS[LOCAL_ID].name} Home`}
                  src={`/static/local/${LOCALS[LOCAL_ID].theme}/${LOCALS[
                    LOCAL_ID
                  ].logo}`}
                />
                <span className={css.localText}>{LOCALS[LOCAL_ID].name}</span>

            </Link>}
          {!hideSearchBar &&
            SITE_ENV !== "pro" &&
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
                        key={`k_${index}`}
                        name={key}
                        value={router.query[key]}
                      />
                    );
                  }
                })}
              <button type="submit" className={css.searchButton}>
                Search
              </button>
            </form>}
        </div>
      </div>
    );
  }
}
export default withRouter(PageHeader);
