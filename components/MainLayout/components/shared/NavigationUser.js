import React from "react";
import Link from "next/link";

import { PRO_BASE_URL } from "constants/env";

class NavigationUser extends React.Component {
  render() {
    const { isHome, className, css } = this.props;
    return (
      <div className={className} data-cy="navigation-user">
        <ul className={css.links}>
          {!isHome &&
            <li>
              <Link href="/">
                <a data-cy="link-home">
                  Home
                </a>
              </Link>
            </li>}
          <li>
            <Link href="/browse-by-topic">
              <a data-cy="browse-topics">Browse by Topic</a>
            </Link>
          </li>
          <li>
            <Link href="/browse-by-partner">
              <a data-cy="browse-partners">Browse by Partner</a>
            </Link>
          </li>
          <li>
            <Link href="/exhibitions">
              <a data-cy="exhibitions">
                Exhibitions
              </a>
            </Link>
          </li>
          <li>
            <Link href="/primary-source-sets">
              <a data-cy="primary-source-sets">
                Primary Source Sets
              </a>
            </Link>
          </li>
          <li>
            <Link href="/lists">
              <a data-cy="my-lists">
                My Lists
              </a>
            </Link>
          </li>
        </ul>
        <span className={css.divider} />
        <ul className={`${css.links} ${css.secondaryLinks}`}>
          <li>
            <Link as="/about" href="/about?section=about-us">
              <a data-cy="about-dpla">About DPLA</a>
            </Link>
          </li>
          <li>
            <Link href="/news">
              <a data-cy="news">News</a>
            </Link>
          </li>
        </ul>
        <span className={css.divider} />
        <ul className={`${css.links} ${css.tertiaryLinks}`}>
          <li>
            <Link href={PRO_BASE_URL}>
              <a data-cy="dpla-pro">DPLA Pro</a>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationUser;
