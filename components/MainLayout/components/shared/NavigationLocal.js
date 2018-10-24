import React from "react";
import Link from "next/link";

import { LOCALS } from "constants/local";
import { LOCAL_ID } from "constants/env";

const NavigationLocal = ({ isHome, className, css }) =>
  <div className={className}>
    <ul className={css.links}>
      {!isHome &&
        <li>
          <Link prefetch href="/local" as="/">
            <a>
              Home
            </a>
          </Link>
        </li>}
      <li>
        <Link prefetch href="/lists">
          <a>
            My Lists
          </a>
        </Link>
      </li>
      {LOCALS[LOCAL_ID].hasAbout &&
        <li>
          <Link prefetch href="/local/about" as="/about">
            <a>
              About
            </a>
          </Link>
        </li>}
    </ul>
    <span className={css.divider} />
    <ul className={`${css.links} ${css.secondaryLinks}`}>
      <li>
        <Link href={LOCALS[LOCAL_ID].externalLink}>
          <a>Visit {LOCALS[LOCAL_ID].name}</a>
        </Link>
      </li>
    </ul>
    <ul className={`${css.links} ${css.tertiaryLinks}`}>
      <li>
        <Link href="//dp.la">
          <a>Visit DPLA</a>
        </Link>
      </li>
    </ul>
  </div>;

export default NavigationLocal;
