import React from "react";
import Link from "next/link";

const NavigationPro = ({ className, style, classNames }) =>
  <div className={className} style={style}>
    <ul className={classNames.links}>
      <li>
        <Link prefetch as="/" href="/pro">
          <a>
            Home
          </a>
        </Link>
      </li>
      <li>
        <Link prefetch as="/hubs" href="/pro/wp?section=hubs">
          <a>Hubs</a>
        </Link>
      </li>
      <li>
        <Link prefetch as="/projects" href="/pro/wp?section=projects">
          <a>Projects</a>
        </Link>
      </li>
      <li>
        <Link prefetch as="/education" href="/pro/wp?section=education">
          <a>Education</a>
        </Link>
      </li>
    </ul>
    <span className={classNames.divider} />
    <ul className={`${classNames.links} ${classNames.secondaryLinks}`}>
      <li>
        <Link prefetch as="/events" href="/pro/wp?section=events">
          <a>Events</a>
        </Link>
      </li>
      <li>
        <Link prefetch as="/about" href="/pro/wp?section=about-dpla-pro">
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
        <Link href="//beta.dp.la">
          <a>DPLA Main Site</a>
        </Link>
      </li>
    </ul>
  </div>;

export default NavigationPro;
