import React from "react";
import Link from "next/link";

import { LOCALS } from "constants/local";

function NavigationLocal({ isHome, className, css }) {
  let visitHtml;
  let contactHtml;
  let arbitraryHtml = null;
  let blogHtml = null;
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;

  if (LOCALS[localId].routes) {
    const routesObj = LOCALS[localId].routes;
    const dynamicRoutes = Object.keys(routesObj);

    const categories = dynamicRoutes
      .map(function (category, i) {
        const keys = {};
        keys.id = i;
        keys.route = dynamicRoutes[i];
        keys.isTopLevel = routesObj[dynamicRoutes[i]].isTopLevel;
        keys.category = routesObj[dynamicRoutes[i]].category;
        return keys;
      })
      .filter((category) => category.isTopLevel);

    arbitraryHtml = categories.map((navItem) => {
      return (
        <li key={navItem.id}>
          <Link href={"/local" + navItem.route} as={navItem.route}>
            {navItem.category}
          </Link>
        </li>
      );
    });
  }

  if (localId === "aviation") {
    visitHtml = (
      <ul className={`${css.links} ${css.secondaryLinks}`}>
        <li>
          <a href={LOCALS[localId].externalLink}>PAN AM TIMELINE</a>
        </li>
      </ul>
    );
    contactHtml = (
      <li>
        <a href="https://dp.la/primary-source-sets/aviation">
          PAN AM PRIMARY SOURCE SET
        </a>
      </li>
    );
  } else if (localId === "wisconsin") {
    visitHtml = (
      <ul className={`${css.links} ${css.secondaryLinks}`}>
        <li>
          <a href={LOCALS[localId].externalLink + "/explore/search"}>About</a>
        </li>
      </ul>
    );
    contactHtml = (
      <li>
        <a href={LOCALS[localId].externalLink + "/contact"}>Contact</a>
      </li>
    );
  } else if (localId === "illinois") {
    blogHtml = (
      <li>
        <Link href={LOCALS[localId].externalLink}>Highlights Blog</Link>
      </li>
    );
  } else if (localId === "plains2peaks") {
    visitHtml = (
      <ul className={`${css.links} ${css.secondaryLinks}`}>
        <li>
          <a href={"https://ppc.cvlsites.org/"}>FOR CONTRIBUTORS</a>
        </li>
        <li>
          <a
            href={"https://museumsfordigitallearning.org/museum/56/kits?page=2"}
          >
            FOR EDUCATORS AND STUDENTS
          </a>
        </li>
      </ul>
    );
  } else if ("externalLink" in LOCALS[localId]) {
    visitHtml = (
      <ul className={`${css.links} ${css.secondaryLinks}`}>
        <li>
          <a href={LOCALS[localId].externalLink}>
            Visit {LOCALS[localId].name}
          </a>
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
              Home
            </Link>
          </li>
        )}
        {arbitraryHtml}
        {contactHtml}
        {LOCALS[localId].hasTerms && (
          <li>
            <Link href="/terms">Terms and Conditions</Link>
          </li>
        )}
        {LOCALS[localId].hasBrowseByPartner && (
          <li>
            <Link href="/browse-by-partner">Browse by Partner</Link>
          </li>
        )}
        {LOCALS[localId].hasBrowseAll && (
          <li>
            <Link href="/search">Browse All</Link>
          </li>
        )}
        <li>
          <Link href="/lists">My Lists</Link>
        </li>
      </ul>
      {visitHtml && <span className={css.divider} />}
      {visitHtml}
      <ul className={`${css.links} ${css.tertiaryLinks}`}>
        {blogHtml}
        <li>
          <a href="https://dp.la">Visit DPLA</a>
        </li>
      </ul>
    </div>
  );
}

export default NavigationLocal;
