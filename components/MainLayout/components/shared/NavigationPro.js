import React from "react";
import Link from "next/link";

function NavigationPro({ isHome, className, css }) {
  const userBaseUrl = process.env.NEXT_PUBLIC_USER_BASE_URL;
  return (
    <div className={className} id={"NavigationPro"}>
      <ul className={css.links}>
        {!isHome && (
          <li>
            <Link as="/" href="/pro">
              Home
            </Link>
          </li>
        )}
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
      <span className={css.divider} />
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
      <span className={css.divider} />
      <ul className={`${css.links} ${css.tertiaryLinks}`}>
        <li>
          <Link href={userBaseUrl + "/news"}>News</Link>
        </li>
        <li>
          <Link href={"https://ebooks.dp.la"}>Ebooks</Link>
        </li>
        <li>
          <Link href={userBaseUrl}>DPLA Main Site</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationPro;
