import React from "react";
import Link from "next/link";

import { USER_BASE_URL } from "constants/env";

const NavigationPro = ({ className, style, classNames, isHome }) =>
  <div className={className} style={style}>
    <ul className={classNames.links}>
      {!isHome &&
        <li>
          <Link prefetch as="/" href="/pro">
            <a>
              Home
            </a>
          </Link>
        </li>}
      <li>
        <Link prefetch as="/hubs" href="/pro/wp/hubs?section=hubs">
          <a>Hubs</a>
        </Link>
      </li>
      <li>
        <Link prefetch as="/projects" href="/pro/wp?section=projects">
          <a>Projects</a>
        </Link>
      </li>
    </ul>
    <span className={classNames.divider} />
    <ul className={`${classNames.links} ${classNames.secondaryLinks}`}>
      <li>
        <Link prefetch as="/about" href="/pro/wp?section=about-dpla-pro">
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link prefetch as="/events" href="/pro/wp?section=events">
          <a>Events</a>
        </Link>
      </li>
    </ul>
    <span className={classNames.divider} />
    <ul className={`${classNames.links} ${classNames.tertiaryLinks}`}>
      <li>
        <Link href={USER_BASE_URL}>
          <a>DPLA Main Site</a>
        </Link>
      </li>
      <li>
        <Link href={USER_BASE_URL + "/news"}>
          <a>News</a>
        </Link>
      </li>
    </ul>
  </div>;

export default NavigationPro;
