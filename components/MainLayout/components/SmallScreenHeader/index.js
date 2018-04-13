import React, { Component } from "react";
import Link from "next/link";
import NavigationUser from "../shared/NavigationUser";
import NavigationPro from "../shared/NavigationPro";

import css from "./SmallScreenStyles.scss";

import { SITE_ENV } from "constants/env";

class SmallScreenHeader extends Component {
  state = {
    menuIsOpen: false,
    searchIsOpen: false
  };

  toggleMenu = () => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
      searchIsOpen: false
    });
  };

  toggleSearch = () => {
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
      menuIsOpen: false
    });
  };

  render() {
    const { searchIsOpen, menuIsOpen } = this.state;
    const { isSearchPage, route, isHome } = this.props;

    return (
      <div className={`${css.wrapper}`}>
        <div className={css.header}>
          <Link prefetch as="/" href={SITE_ENV === "user" ? "/" : "/pro"}>
            <a className={css.logo}>
              <span>Digital Public Library of America</span>
            </a>
          </Link>
          <button
            type="button"
            aria-expanded={menuIsOpen}
            onClick={this.toggleMenu}
            className={`${css.menuButton} ${menuIsOpen ? css.isOpen : ""}`}
          >
            {!menuIsOpen && <span>Show<br />Menu</span>}
            {menuIsOpen && <span>Hide<br />Menu</span>}
          </button>
        </div>
        {SITE_ENV !== "pro" &&
          <NavigationUser
            className={`${css.menuContainer} ${menuIsOpen
              ? css.isOpen
              : ""} site-max-width`}
            css={css}
            isHome={isHome}
          />}
        {SITE_ENV === "pro" &&
          <NavigationPro
            className={`${css.menuContainer} ${menuIsOpen
              ? css.isOpen
              : ""} site-max-width`}
            css={css}
            isHome={isHome}
          />}
      </div>
    );
  }
}

export default SmallScreenHeader;
