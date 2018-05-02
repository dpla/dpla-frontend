import React from "react";
import Link from "next/link";

import { USER_BASE_URL } from "constants/env";

const NavigationLocal = ({ isHome, className, css }) =>
  <div className={className}>
    <ul className={css.links}>
      {!isHome &&
        <li>
          <Link prefetch href="/search">
            <a>
              Home
            </a>
          </Link>
        </li>}
    </ul>
    <span className={css.divider} />
    <ul className={`${css.links} ${css.tertiaryLinks}`}>
      <li>
        <Link href="//dp.la">
          <a>Visit DPLA</a>
        </Link>
      </li>
    </ul>
  </div>;

export default NavigationLocal;
