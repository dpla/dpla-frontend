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
    var arbitraryHtml;

    if (LOCALS[LOCAL_ID].routes) {
      const dynamicRoutes = Object.keys(LOCALS[LOCAL_ID].routes);

      arbitraryHtml = dynamicRoutes.map(function(route, index) {
        return (
          <li key={index}>
            <Link prefetch href={"/local/" + route} as={route}>
              <a>{LOCALS[LOCAL_ID].routes[dynamicRoutes[index]].title}</a>
            </Link>
          </li>
        );
      });
    } else {
      arbitraryHtml = null;
    }

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
          <li>
            <Link prefetch href="/lists">
              <a>My Lists</a>
            </Link>
          </li>
          {LOCALS[LOCAL_ID].hasBrowseByPartner && (
            <li>
              <Link prefetch href="/browse-by-partner">
                <a>Browse by Partner</a>
              </Link>
            </li>
          )}
          {arbitraryHtml}
          {LOCALS[LOCAL_ID].hasTerms && (
            <li>
              <Link prefetch href="/terms">
                <a>Terms and Conditions</a>
              </Link>
            </li>
          )}
          {contactHtml && contactHtml}
          {LOCALS[LOCAL_ID].hasAbout && (
            <li>
              <Link prefetch href="/local/about" as="/about">
                <a>About</a>
              </Link>
            </li>
          )}
        </ul>
        {visitHtml && <span className={css.divider} />}
        {visitHtml && visitHtml}
        <ul className={`${css.links} ${css.tertiaryLinks}`}>
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
