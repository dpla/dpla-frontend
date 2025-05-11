import React from "react";
import Link from "next/link";

function NavigationUser({ isHome, className, css }) {
  const proBaseUrl = process.env.NEXT_PUBLIC_PRO_BASE_URL;
  return (
    <div className={className} data-testid="navigation-user">
      <ul className={css.links}>
        {!isHome && (
          <li>
            <Link href="/" data-testid="link-home">
              Home
            </Link>
          </li>
        )}
        <li>
          <Link href="/browse-by-topic" data-testid="browse-topics">
            Browse by Topic
          </Link>
        </li>
        <li>
          <Link href="/browse-by-partner" data-testid="browse-partners">
            Browse by Partner
          </Link>
        </li>
        <li>
          <Link href="/exhibitions" data-testid="exhibitions">
            Exhibitions
          </Link>
        </li>
        <li>
          <Link href="/primary-source-sets" data-testid="primary-source-sets">
            Primary Source Sets
          </Link>
        </li>
        <li>
          <Link href="/lists" data-testid="my-lists">
            My Lists
          </Link>
        </li>
      </ul>
      <span className={css.divider} />
      <ul className={`${css.links} ${css.secondaryLinks}`}>
        <li>
          <Link href="/about" data-testid="about-dpla">
            About DPLA
          </Link>
        </li>
        <li>
          <Link href="/news" data-testid="news">
            News
          </Link>
        </li>
      </ul>
      <span className={css.divider} />
      <ul className={`${css.links} ${css.tertiaryLinks}`}>
        <li>
          <Link href={proBaseUrl} data-testid="dpla-pro">
            DPLA Pro
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationUser;
