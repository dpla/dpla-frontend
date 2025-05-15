import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";

import { LOCALS } from "constants/local";

import css from "./HomeHero.module.scss";
import utils from "stylesheets/utils.module.scss";

function getHeroLogo() {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;

  if (siteEnv !== "local") {
    return "";
  }

  const local = LOCALS[localId];

  if ("heroLogo" in local) {
    return local.heroLogo;
  } else {
    return local.logo;
  }
}

const heroLogo = getHeroLogo();

const bgImage =
  process.env.NEXT_PUBLIC_SITE_ENV !== "local"
    ? "/static/images/home-hero-bg.png"
    : `/static/local/${LOCALS[process.env.NEXT_PUBLIC_LOCAL_ID].theme}/${LOCALS[process.env.NEXT_PUBLIC_LOCAL_ID].background}`;

function HomeHero({ headerDescription, feature }) {
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;

  return (
    <div
      data-cy="home-hero"
      className={`${css.wrapper} ${feature ? css.withFeature : ""}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        data-cy="dpla-logo"
        className={`${css.header} ${utils.siteMaxWidth}`}
      >
        {siteEnv === "user" && (
          <div className={`${css.homeLogo} ${css.dplaLogo}`}>
            <h1>Digital Public Library of America</h1>
          </div>
        )}
        {siteEnv === "local" && (
          <div className={css.homeLogo}>
            <img
              alt={""}
              id={`${localId}-localLogo`}
              className={css.localLogo}
              src={`/static/local/${LOCALS[localId].theme}/${heroLogo}`}
            />
            <h1 className={css.localText}>{LOCALS[localId].name}</h1>
          </div>
        )}
        {siteEnv === "user" && (
          <Button type="primary" size="large" url="/donate">
            Donate
          </Button>
        )}
      </div>
      <div
        className={`${css.content} ${utils.homeSearchForm}`}
        id={`${localId}-search-form`}
      >
        {headerDescription && (
          <p className={css.headline}>{headerDescription}</p>
        )}
        <form action="/search">
          <div className={css.search}>
            <input
              className={css.searchInput}
              aria-label="Search the collection"
              placeholder="Search the collection"
              name="q"
              autoComplete="off"
              type="search"
            />
            <button type="submit" className={css.searchButton}>
              <span>Search</span>
            </button>
          </div>
        </form>
        {siteEnv === "user" && (
          <div className={css.links}>
            <Link href="/browse-by-topic">Browse by Topic</Link>
            <Link href="/guides" title="View our Getting Started Guides">
              New? Start Here
            </Link>
          </div>
        )}
        {siteEnv === "local" && LOCALS[localId].hasAbout && (
          <div className={css.links}>
            <Link href="/about">Learn more about {LOCALS[localId].name}</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeHero;
