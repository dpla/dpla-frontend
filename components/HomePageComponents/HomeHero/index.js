import React from "react";

import { stylesheet, classNames } from "./HomeHero.css";
import Link from "next/link";

const bgImage = "static/images/home-hero-bg.png";
const searchIcon = "static/images/search.svg";
const dplaLogo = "static/images/dpla-logo.svg";

const HomeHero = () =>
  <div
    className={classNames.wrapper}
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className={`${classNames.header} site-max-width`}>
      <div>
        <img className={classNames.dplaLogo} alt="DPLA" src={dplaLogo} />
      </div>
      <button className={classNames.donateButton}>Donate</button>
    </div>
    <div className={classNames.content}>
      <p className={classNames.headline}>
        Discover 17,820,245 images, texts, videos, and sounds from across
        the United States
      </p>
      <form action="/search">
        <div className={classNames.search}>
          <input
            className={classNames.searchInput}
            placeholder="Search the collection"
            name="q"
            autoComplete="off"
            type="search"
          />
          <button type="submit" className={classNames.searchButton}>
            <img
              alt="search"
              className={classNames.searchIcon}
              src={searchIcon}
            />
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
