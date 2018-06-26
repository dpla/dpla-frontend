import React from "react";
import Link from "next/link";

import { getLocalForageLists } from "lib/localForage";

import { PRO_BASE_URL } from "constants/env";

class NavigationUser extends React.Component {
  state = { lists: [] };

  componentDidMount() {
    this.getLists();
  }

  getLists = async () => {
    let lists = await getLocalForageLists();
    this.setState({
      lists: lists
    });
  };

  render() {
    const { isHome, className, css } = this.props;
    const { lists } = this.state;
    return (
      <div className={className}>
        <ul className={css.links}>
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
          {lists.length > 0 &&
            <li>
              <Link prefetch href="/lists">
                <a>
                  Lists
                </a>
              </Link>
            </li>}
        </ul>
        <span className={css.divider} />
        <ul className={`${css.links} ${css.secondaryLinks}`}>
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
        <span className={css.divider} />
        <ul className={`${css.links} ${css.tertiaryLinks}`}>
          <li>
            <Link href={PRO_BASE_URL}>
              <a>DPLA Pro</a>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationUser;
