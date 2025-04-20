import React from "react";
import Link from "next/link";

import {USER_BASE_URL} from "constants/env";

function NavigationPro({isHome, className, css}) {
  return (
    <div className={className} id={"NavigationPro"}>
      <ul className={css.links}>
        {!isHome && <li>
          <Link as="/" href="/pro">
            Home
          </Link>
        </li>}
        <li>
          <Link as="/hubs" href="/pro/wp/hubs?section=hubs">
            Hubs
          </Link>
        </li>
        <li>
          <Link as="/projects" href="/pro/wp?section=projects">
            Projects
          </Link>
        </li>
      </ul>
      <span className={css.divider}/>
      <ul className={`${css.links} ${css.secondaryLinks}`}>
        <li>
          <Link as="/about" href="/pro/wp?section=about-dpla-pro">
            About
          </Link>
        </li>
        <li>
          <Link as="/events" href="/pro/wp?section=events">
            Events
          </Link>
        </li>
      </ul>
      <span className={css.divider}/>
      <ul className={`${css.links} ${css.tertiaryLinks}`}>
        <li>
          <Link href={USER_BASE_URL + "/news"}>
            News
          </Link>
        </li>
        <li>
          <Link href={"https://ebooks.dp.la"}>
            Ebooks
          </Link>
        </li>
        <li>
          <Link href={USER_BASE_URL}>
            DPLA Main Site
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationPro;
