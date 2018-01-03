import React, { Component } from "react";
import Link from "next/link";
import UserNavigation from "../shared/UserNavigation";
import ProNavigation from "../shared/ProNavigation";

import { stylesheet, classNames } from "./SmallScreenStyles.css";

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
          <Link prefetch href="/">
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
        {process.env.SITE_ENV !== "pro" &&
          <UserNavigation
            className={`${classNames.menuContainer} ${menuIsOpen
              ? classNames.isOpen
              : ""} site-max-width`}
            style={{ zIndex: 99 }}
            classNames={classNames}
          />}
        {process.env.SITE_ENV === "pro" &&
          <ProNavigation
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
