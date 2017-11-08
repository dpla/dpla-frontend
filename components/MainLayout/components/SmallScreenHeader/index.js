import React, { Component } from "react";
import Link from "next/link";
import UserNavigation from "../shared/UserNavigation";

import { stylesheet, classNames } from "../shared/SmallScreenStyles.css";

const dplaLogo = "/static/images/dpla-logo.svg";
const searchIcon = "/static/images/search.svg";
const searchIconGray = "/static/images/search-gray.svg";
const menuIcon = "/static/images/menu-white.svg";
const closeIcon = "/static/images/close-white.svg";

class SmallScreenHeader extends Component {
  state = {
    menuIsOpen: false,
    searchIsOpen: false
  };

  toggleMenu = () => {
    // Lock scrolls when the overlay is active
    document.body.classList.toggle("small-screen-overlay");

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
      <div
        className={`${classNames.wrapper} ${isSearchPage
          ? classNames.searchPageWrapper
          : ""}`}
      >
        <div
          className={`${classNames.searchContainer} ${searchIsOpen &&
            classNames.isOpen} site-max-width`}
        >
          <form action="/search">
            {isSearchPage &&
              <img
                src={searchIconGray}
                alt=""
                className={classNames.searchBarIcon}
              />}
            <input
              className={classNames.searchInput}
              autoComplete="off"
              placeholder={isSearchPage ? "" : "Type keyword(s) here"}
              name="q"
              defaultValue={isSearchPage ? route.query.q : ""}
              ref={input => {
                this.searchInput = input;
              }}
              type="search"
            />
          </form>
        </div>
        <div className={classNames.header}>
          <Link prefetch href="/">
            <a className={classNames.logo}>
              <img src={dplaLogo} alt="DPLA Logo" />
            </a>
          </Link>
          <div>
            <button
              type="button"
              onClick={this.toggleSearch}
              className={`${classNames.searchButton} ${searchIsOpen &&
                classNames.isOpen}`}
            >
              <img src={searchIcon} alt="Search the DPLA collection" />
            </button>
            <button
              type="button"
              onClick={this.toggleMenu}
              className={`${classNames.menuButton} ${menuIsOpen &&
                classNames.isOpen}`}
            >
              <img
                src={menuIsOpen ? closeIcon : menuIcon}
                alt="Open the DPLA site navigation"
              />
            </button>
          </div>
        </div>
        <UserNavigation
          className={`${classNames.menuContainer} ${menuIsOpen &&
            classNames.isOpen} site-max-width`}
          style={{ zIndex: 99 }}
          classNames={classNames}
        />
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default SmallScreenHeader;
