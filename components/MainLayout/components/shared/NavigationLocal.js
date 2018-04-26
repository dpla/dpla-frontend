import React from "react";
import Link from "next/link";

import { USER_BASE_URL } from "constants/env";

const NavigationLocal = ({ isHome, className, css }) =>
  <div className={className}>
    <ul className={css.links}>
      {!isHome &&
        <li>
          <Link prefetch as="/" href="/local">
            <a>
              Home
            </a>
          </Link>
        </li>}
      <li>
        <Link prefetch as="/about" href="/about?section=about-us">
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/news">
          <a>News</a>
        </Link>
      </li>
    </ul>
    <span className={css.divider} />
    <ul className={`${css.links} ${css.tertiaryLinks}`}>
      <li>
        <Link href={USER_BASE_URL}>
          <a>Visit DPLA</a>
        </Link>
      </li>
    </ul>
  </div>;

export default NavigationLocal;
