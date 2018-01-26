import React from "react";
import Link from "next/link";

const NavigationUser = ({ className, style, classNames, isHome }) =>
  <div className={className} style={style}>
    <ul className={classNames.links}>
      {!isHome &&
        <li>
          <Link prefetch href="/">
            <a>
              Home
            </a>
          </Link>
        </li>}
      <li>
        <Link prefetch href="/browse-by-topic">
          <a>Browse by Topic</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/browse-by-partner">
          <a>Browse by Partner</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/exhibitions">
          <a>
            Exhibitions
          </a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/primary-source-sets">
          <a>
            Primary Source Sets
          </a>
        </Link>
      </li>
    </ul>
    <span className={classNames.divider} />
    <ul className={`${classNames.links} ${classNames.secondaryLinks}`}>
      <li>
        <Link prefetch as="/about" href="/about?section=about-us">
          <a>About DPLA</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/news">
          <a>News</a>
        </Link>
      </li>
    </ul>
    <span className={classNames.divider} />
    <ul className={`${classNames.links} ${classNames.tertiaryLinks}`}>
      <li>
        <Link href="//pro.dp.la">
          <a>Pro Community</a>
        </Link>
      </li>
    </ul>
  </div>;

export default NavigationUser;
