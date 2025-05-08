import React from "react";
import Link from "next/link";

function NavigationPro({ isHome, className, css }) {
  const userBaseUrl = process.env.NEXT_PUBLIC_USER_BASE_URL;
  return (
    <div className={className} id={"NavigationPro"}>
      <ul className={css.links}>
        {!isHome && (
          <li>
            <Link href="/">Home</Link>
          </li>
        )}
        <li>
          <Link href="/hubs">Hubs</Link>
        </li>
        <li>
          <Link href="/projects">Projects</Link>
        </li>
      </ul>
      <span className={css.divider} />
      <ul className={`${css.links} ${css.secondaryLinks}`}>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
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
