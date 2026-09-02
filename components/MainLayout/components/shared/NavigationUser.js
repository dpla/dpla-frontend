import React from "react";
import Link from "next/link";

// Joins class names, dropping any that are undefined. The desktop and
// small-screen headers pass different stylesheets, so the refinement classes
// below exist only in DesktopStyles.module.css.
const cx = (...names) => names.filter(Boolean).join(" ");

function NavigationUser({ isHome, className, css, compact }) {
  const proBaseUrl = process.env.NEXT_PUBLIC_PRO_BASE_URL;
  const list = cx(css.links, css.navList);
  const divider = cx(css.divider, css.navDivider);

  return (
    <div className={className} data-cy="navigation-user">
      {!isHome && (
        <>
          <ul className={list}>
            <li>
              <Link href="/" data-cy="link-home">
                Home
              </Link>
            </li>
          </ul>
          <span className={divider} />
        </>
      )}

      {/*
        The desktop header has a fixed 64rem of space, so the two "Browse by …"
        labels share a prefix there. The stacked small-screen menu has room for
        the full labels and keeps them.
      */}
      {compact ? (
        <ul className={list}>
          <li className={css.navLabel} aria-hidden="true">
            Browse by:
          </li>
          <li>
            <Link
              href="/browse-by-topic"
              data-cy="browse-topics"
              aria-label="Browse by Topic"
            >
              Topic
            </Link>
          </li>
          <li>
            <Link
              href="/browse-by-partner"
              data-cy="browse-partners"
              aria-label="Browse by Partner"
            >
              Partner
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={list}>
          <li>
            <Link href="/browse-by-topic" data-cy="browse-topics">
              Browse by Topic
            </Link>
          </li>
          <li>
            <Link href="/browse-by-partner" data-cy="browse-partners">
              Browse by Partner
            </Link>
          </li>
        </ul>
      )}

      <span className={divider} />

      <ul className={list}>
        <li>
          <Link href="/exhibitions" data-cy="exhibitions">
            Exhibitions
          </Link>
        </li>
        <li>
          <Link href="/primary-source-sets" data-cy="primary-source-sets">
            Primary Source Sets
          </Link>
        </li>
      </ul>

      {/*
        Content links sit to the left of this divider, "about"-type links to the
        right. On desktop it takes equal auto margins, which both centres it in
        the leftover space and pulls everything after it flush to the right edge.
      */}
      <span className={cx(divider, css.navSplit)} />

      <ul className={cx(list, css.secondaryLinks)}>
        <li>
          <Link href="/about" data-cy="about-dpla">
            About DPLA
          </Link>
        </li>
        <li>
          <Link href="/about/our-partners" data-cy="our-partners">
            Our Partners
          </Link>
        </li>
        <li>
          <Link href="/news" data-cy="news">
            News
          </Link>
        </li>
      </ul>
      <span className={divider} />
      <ul className={cx(list, css.tertiaryLinks)}>
        <li>
          <Link href={proBaseUrl} data-cy="dpla-pro">
            DPLA Pro
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationUser;
