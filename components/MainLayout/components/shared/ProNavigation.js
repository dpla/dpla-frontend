import React from "react";
import Link from "next/link";

const ProNavigation = ({ className, style, classNames }) =>
  <div className={className} style={style}>
    <ul className={classNames.links}>
      <li>
        <Link prefetch href="/">
          <a>
            Home
          </a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/hubs">
          <a>Hubs</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/projects">
          <a>Projects</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/educators">
          <a>Educators</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/events">
          <a>Events</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/about">
          <a>About</a>
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
        <Link href="//dp.la">
          <a>DPLA Main Site</a>
        </Link>
      </li>
    </ul>
  </div>;

export default ProNavigation;
