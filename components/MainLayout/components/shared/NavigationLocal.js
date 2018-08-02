import React from "react";
import Link from "next/link";

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
        <Link prefetch href="/local/about" as="/about">
          <a>
            About
          </a>
        </Link>
      </li>
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
