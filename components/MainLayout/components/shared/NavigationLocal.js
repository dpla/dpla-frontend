import React, { Component } from "react";
import Link from "next/link";

import { LOCALS } from "constants/local";
import { LOCAL_ID } from "constants/env";
import * as PropTypes from "prop-types";

class NavigationLocal extends Component {
  render() {
    let { isHome, className, css } = this.props;
    var visitHtml;
    var contactHtml;
    var arbitraryHtml = null;
    var blogHtml = null;

    if (LOCALS[LOCAL_ID].routes) {

      const routesObj = LOCALS[LOCAL_ID].routes;

      const dynamicRoutes = Object.keys(routesObj);

      const categories = dynamicRoutes.map(function(category, i) {
        const keys = Object.assign({}, i);
        keys.id = i;
        keys.route = dynamicRoutes[i];
        keys.isTopLevel = routesObj[dynamicRoutes[i]].isTopLevel;
        keys.category = routesObj[dynamicRoutes[i]].category;
        return keys;
      }).filter(category =>
        category.isTopLevel
      );

      arbitraryHtml = categories.map(navItem => {
        return(
          <li key={navItem.id}>
            <Link
              prefetch href={"/local/" + navItem.route}
              as={navItem.route}>
              <a>{navItem.category}</a>
            </Link>
          </li>
        );
      });
    };

    if (LOCAL_ID === "wisconsin") {
      visitHtml = (
        <ul className={`${css.links} ${css.secondaryLinks}`}>
          <li>
            <a href={LOCALS[LOCAL_ID].externalLink + "/explore/search"}>
              About
            </a>
          </li>
        </ul>
      );
      contactHtml = (
        <li>
          <a href={LOCALS[LOCAL_ID].externalLink + "/contact"}>Contact</a>
        </li>
      );
    } else if (LOCAL_ID === "illinois") {
      blogHtml = (
          <li>
            <Link href={LOCALS[LOCAL_ID].externalLink}>
              <a>Highlights Blog</a>
            </Link>
          </li>
      );
    } else if ("externalLink" in LOCALS[LOCAL_ID]) {
      visitHtml = (
        <ul className={`${css.links} ${css.secondaryLinks}`}>
          <li>
            <Link href={LOCALS[LOCAL_ID].externalLink}>
              <a>Visit {LOCALS[LOCAL_ID].name}</a>
            </Link>
          </li>
        </ul>
      );
      contactHtml = null;
    } else {
      visitHtml = null;
      contactHtml = null;
    }

    return (
      <div className={className} id={"NavigationLocal"}>
        <ul className={css.links}>
          {!isHome && (
            <li>
              <Link prefetch href="/local" as="/">
                <a>Home</a>
              </Link>
            </li>
          )}
          {LOCALS[LOCAL_ID].hasAbout && (
            <li>
              <Link prefetch href="/local/about" as="/about">
                <a>About</a>
              </Link>
            </li>
          )}
          {LOCALS[LOCAL_ID].hasBrowseByPartner && (
            <li>
              <Link prefetch href="/browse-by-partner">
                <a>Browse by Partner</a>
              </Link>
            </li>
          )}
          {arbitraryHtml}
          {contactHtml && contactHtml}
          {LOCALS[LOCAL_ID].hasTerms && (
            <li>
              <Link prefetch href="/terms">
                <a>Terms and Conditions</a>
              </Link>
            </li>
          )}
          <li>
            <Link prefetch href="/lists">
              <a>My Lists</a>
            </Link>
          </li>
        </ul>
        {visitHtml && <span className={css.divider} />}
        {visitHtml && visitHtml}
        <ul className={`${css.links} ${css.tertiaryLinks}`}>
          {blogHtml}
          <li>
            <Link href="//dp.la">
              <a>Visit DPLA</a>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

NavigationLocal.propTypes = {
  isHome: PropTypes.any,
  className: PropTypes.any,
  css: PropTypes.any
};

export default NavigationLocal;
