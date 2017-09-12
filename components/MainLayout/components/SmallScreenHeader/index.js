import React, { Component } from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./SmallScreenHeader.css";

const dplaLogo = "/static/images/dpla-logo.svg";
const searchIcon = "/static/images/search.svg";
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

    return (
      <div className={classNames.wrapper}>
        <div
          className={`${classNames.searchContainer} ${searchIsOpen &&
            classNames.isOpen} site-max-width`}
        >
          <form action="/search">
            <input
              className={classNames.searchInput}
              autoComplete="off"
              placeholder="Search the collection"
              name="q"
              ref={input => {
                this.searchInput = input;
              }}
              type="search"
            />
          </form>
        </div>
        <div className={classNames.header}>
          <Link href="/">
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
        <div
          className={`${classNames.menuContainer} ${menuIsOpen &&
            classNames.isOpen} site-max-width`}
          style={{ zIndex: 99 }}
        >
          <div className={classNames.links}>
            <Link href="/">
              Home
            </Link>
            <Link href="/browse-by-topic">
              Browse
            </Link>
            <Link href="/exhibitions">
              Exhibitions
            </Link>
            <Link href="/primary-source-sets">
              Primary Source Sets
            </Link>
          </div>
          <div className={`${classNames.links} ${classNames.secondaryLinks}`}>
            <Link href="">
              <a>About Us</a>
            </Link>
            <Link href="">
              <a>News</a>
            </Link>
            <Link href="">
              <a>Pro Community</a>
            </Link>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default SmallScreenHeader;
