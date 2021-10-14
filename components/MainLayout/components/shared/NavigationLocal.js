import React, { Component } from "react";
import Link from "next/link";

import { LOCALS } from "constants/local";
import { LOCAL_ID } from "constants/env";

class NavigationLocal extends Component {

  render() {
    const { isHome, className, css } = this.props;
    let visitHtml;
    let contactHtml;
    let arbitraryHtml = null;
    let blogHtml = null;

    if (LOCALS[LOCAL_ID].routes) {
      const routesObj = LOCALS[LOCAL_ID].routes;
      const dynamicRoutes = Object.keys(routesObj);

      const categories = dynamicRoutes
          .map(function(category, i) {
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
              href={"/local/" + navItem.route}
              as={navItem.route}>
              <a>{navItem.category}</a>
            </Link>
          </li>
        );
      });
    }

    if (LOCAL_ID === "aviation") {
      visitHtml = (
        <ul className={`${css.links} ${css.secondaryLinks}`}>
          <li>
            <a href={LOCALS[LOCAL_ID].externalLink}>PAN AM TIMELINE</a>
          </li>
        </ul>
      );
      contactHtml = (
        <li>
          <a href="https://dp.la/primary-source-sets/aviation">PAN AM PRIMARY SOURCE SET</a>
        </li>
      );

    } else if (LOCAL_ID === "wisconsin") {

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
    } else if (LOCAL_ID === "plains2peaks") {
      visitHtml = (
        <ul className={`${css.links} ${css.secondaryLinks}`}>
          <li>
            <a href={"https://ppc.cvlsites.org/"}>Visit The Plains to Peaks Collective</a>
          </li>
        </ul>
      );
    } else if ("externalLink" in LOCALS[LOCAL_ID]) {
      visitHtml = (
        <ul className={`${css.links} ${css.secondaryLinks}`}>
          <li>
            <Link href={LOCALS[LOCAL_ID].externalLink}>
              <a href={LOCALS[LOCAL_ID].externalLink}>Visit {LOCALS[LOCAL_ID].name}</a>
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
              <Link href="/local" as="/">
                <a>Home</a>
              </Link>
            </li>
          )}
          {arbitraryHtml}
          {contactHtml && contactHtml}
          {LOCALS[LOCAL_ID].hasTerms && (
            <li>
              <Link href="/terms">
                <a>Terms and Conditions</a>
              </Link>
            </li>
          )}
          {LOCALS[LOCAL_ID].hasBrowseByPartner && (
            <li>
              <Link href="/browse-by-partner">
                <a>Browse by Partner</a>
              </Link>
            </li>
          )}
          {LOCALS[LOCAL_ID].hasBrowseAll && (
            <li>
              <Link href="/search">
                <a>Browse All</a>
              </Link>
            </li>
          )}
          <li>
            <Link href="/lists">
              <a>My Lists</a>
            </Link>
          </li>
        </ul>
        {visitHtml && <span className={css.divider} />}
        {visitHtml && visitHtml}
        <ul className={`${css.links} ${css.tertiaryLinks}`}>
          {blogHtml}
          <li>
              <a href="https://dp.la">Visit DPLA</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationLocal;
