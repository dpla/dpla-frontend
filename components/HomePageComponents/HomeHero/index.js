import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";

import css from "./HomeHero.scss";

const bgImage = "/static/images/home-hero-bg.png";

const HomeHero = ({ headerDescription, feature }) =>
  <div
    className={`${css.wrapper} ${feature ? css.withFeature : ""}`}
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className={`${css.header} site-max-width`}>
      <div className={css.dplaLogo}>
        <h1>Digital Public Library of America</h1>
      </div>
      <Button type="primary" size="large" url="/donate">
        Donate
      </Button>
    </div>
    <div className={css.content}>
      <p className={css.headline}>{headerDescription}</p>
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
      <div className={css.links}>
        <Link prefetch href="/browse-by-topic">
          <a title="Browse DPLA by a curated set of topics">Browse by Topic</a>
        </Link>
        <Link prefetch href="/guides">
          <a title="View our Getting Started Guides">New? Start Here</a>
        </Link>
      </div>
    </div>
  </div>;

export default HomeHero;
