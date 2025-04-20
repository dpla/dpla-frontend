import React from "react";
import Link from "next/link";

import {PRO_BASE_URL} from "constants/env";

function NavigationUser({isHome, className, css}) {
  return (
    <div className={className} data-cy="navigation-user">
      <ul className={css.links}>
        {!isHome && (
          <li>
            <Link href="/" data-cy="link-home">
              Home
            </Link>
          </li>
        )}
        <li>
          <Link href="/browse-by-topic" data-cy="browse-topics">
            Browse by Topic
          </Link>
        </li>
        <li>
          <Link href="/browse-by-partner" data-cy="browse-partners">
            Browse by Partner
          </Link>
        </li>
        <li>
          <Link href="/exhibitions" data-cy="exhibitions">
            Exhibitions
          </Link>
        </li>
        <li>
          <Link href="/primary-source-sets" data-cy="primary-source-sets">
            Primary Source Sets
          </Link>
        </li>
        <li>
          <Link href="/lists" data-cy="my-lists">
            My Lists
          </Link>
        </li>
      </ul>
      <span className={css.divider}/>
      <ul className={`${css.links} ${css.secondaryLinks}`}>
        <li>
          <Link as="/about" href="/about?section=about-us" data-cy="about-dpla">
            About DPLA
          </Link>
        </li>
        <li>
          <Link href="/news" data-cy="news">
            News
          </Link>
        </li>
      </ul>
      <span className={css.divider}/>
      <ul className={`${css.links} ${css.tertiaryLinks}`}>
        <li>
          <Link href={PRO_BASE_URL} data-cy="dpla-pro">
            DPLA Pro
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationUser;
