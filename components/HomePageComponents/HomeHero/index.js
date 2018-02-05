import React from "react";

import Button from "components/shared/Button";
import { stylesheet, classNames } from "./HomeHero.css";
import Link from "next/link";

const bgImage = "static/images/home-hero-bg.png";

const HomeHero = ({ headerDescription, feature }) =>
  <div
    className={`${classNames.wrapper} ${feature ? classNames.withFeature : ""}`}
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className={`${classNames.header} site-max-width`}>
      <div className={classNames.dplaLogo}>
        <h1>Digital Public Library of America</h1>
      </div>
      <Button type="primary" size="large" url="/donate">
        Donate
      </Button>
    </div>
    <div className={classNames.content}>
      <p className={classNames.headline}>{headerDescription}</p>
      <form action="/search">
        <div className={classNames.search}>
          <input
            className={classNames.searchInput}
            aria-label="Search the collection"
            placeholder="Search the collection"
            name="q"
            autoComplete="off"
            type="search"
          />
          <div className={classNames.shadow} />
          <button type="submit" className={classNames.searchButton}>
            <span>Search</span>
          </button>
        </div>
      </form>
      <div className={classNames.links}>
        <Link prefetch href="/browse-by-topic">
          <a title="Browse DPLA by a curated set of topics">Browse by Topic</a>
        </Link>
        <Link prefetch href="/guides">
          <a title="View our Getting Started Guides">New? Start Here</a>
        </Link>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default HomeHero;
