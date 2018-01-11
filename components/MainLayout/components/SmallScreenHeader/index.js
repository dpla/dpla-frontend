import React, { Component } from "react";
import Link from "next/link";
import NavigationUser from "../shared/NavigationUser";
import NavigationPro from "../shared/NavigationPro";

import { stylesheet, classNames } from "./SmallScreenStyles.css";

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
    const { isSearchPage, route } = this.props;

    return (
      <div className={`${classNames.wrapper}`}>
        <div className={classNames.header}>
          <Link prefetch as="/" href={SITE_ENV === "user" ? "/" : "/pro"}>
            <a className={classNames.logo}>
              <span>Digital Public Library of America</span>
            </a>
          </Link>
          <button
            type="button"
            aria-expanded={menuIsOpen}
            onClick={this.toggleMenu}
            className={`${classNames.menuButton} ${menuIsOpen
              ? classNames.isOpen
              : ""}`}
          >
            {!menuIsOpen && <span>Show<br />Menu</span>}
            {menuIsOpen && <span>Hide<br />Menu</span>}
          </button>
        </div>
        {SITE_ENV !== "pro" &&
          <NavigationUser
            className={`${classNames.menuContainer} ${menuIsOpen
              ? classNames.isOpen
              : ""} site-max-width`}
            style={{ zIndex: 99 }}
            classNames={classNames}
          />}
        {SITE_ENV === "pro" &&
          <NavigationPro
            className={`${classNames.menuContainer} ${menuIsOpen
              ? classNames.isOpen
              : ""} site-max-width`}
            style={{ zIndex: 99 }}
            classNames={classNames}
          />}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default SmallScreenHeader;
