import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";

import { SITE_ENV, LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

import css from "./HomeHero.module.scss";
import utils from "stylesheets/utils.module.scss"

const getHeroLogo = () => {
  if (SITE_ENV !== "local") {
    return ""
  }
  const local = LOCALS[LOCAL_ID]
  if ('heroLogo' in local) {
    return local.heroLogo
  } else {
    return local.logo
  }
}

const heroLogo = getHeroLogo()

const bgImage = SITE_ENV !== "local"
  ? "/static/images/home-hero-bg.png"
  : `/static/local/${LOCALS[LOCAL_ID].theme}/${LOCALS[LOCAL_ID].background}`;

const HomeHero = ({ headerDescription, feature }) =>
  <div
    data-cy="home-hero"
    className={`${css.wrapper} ${feature ? css.withFeature : ""}`}
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div data-cy="dpla-logo" className={`${css.header} ${utils.siteMaxWidth}`}>
      {SITE_ENV !== "local" &&
        <div className={`${css.homeLogo} ${css.dplaLogo}`}>
          <h1>Digital Public Library of America</h1>
        </div>}
      {SITE_ENV === "local" &&
        <div className={`${css.homeLogo} `}>
          <img
              alt={""}
            className={css.localLogo}
            src={`/static/local/${LOCALS[LOCAL_ID].theme}/${heroLogo}`}
          />
          <h1 className={css.localText}>{LOCALS[LOCAL_ID].name}</h1>
        </div>}
      {SITE_ENV !== "local" &&
        <Button type="primary" size="large" url="/donate">
          Donate
        </Button>}
    </div>
    <div className={`${css.content} ${utils.homeSearchForm}`}>
      {headerDescription && <p className={css.headline}>{headerDescription}</p>}
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
      {SITE_ENV !== "local" &&
        <div className={css.links}>
          <Link href="/browse-by-topic">
            <a title="Browse DPLA by a curated set of topics">
              Browse by Topic
            </a>
          </Link>
          <Link href="/guides">
            <a title="View our Getting Started Guides">New? Start Here</a>
          </Link>
        </div>}
      {SITE_ENV === "local" &&
        LOCALS[LOCAL_ID].hasAbout &&
        <div className={css.links}>
          <Link href="/local/about" as="/about">
            <a>Learn more about {LOCALS[LOCAL_ID].name}</a>
          </Link>
        </div>}
    </div>
  </div>;

export default HomeHero;
