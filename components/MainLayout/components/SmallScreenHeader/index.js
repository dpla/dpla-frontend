import  React, { Component } from "react";

import Link from "next/link";
import NavigationUser from "../shared/NavigationUser";
import NavigationPro from "../shared/NavigationPro";
import NavigationLocal from "../shared/NavigationLocal";

import css from "./SmallScreenStyles.module.scss";
import utils from "stylesheets/utils.module.scss"

import { SITE_ENV, LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

class SmallScreenHeader extends Component {
  state = {
    menuIsOpen: false
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      menuIsOpen: !prevState.menuIsOpen
    }));
  };

  render() {
    const { menuIsOpen } = this.state;
    const { isHome } = this.props;

    return (
      <div className={css.wrapper} data-cy="small-screen-header">
        <div className={css.header}>
          {(SITE_ENV === "user" || SITE_ENV === "pro") &&
            <Link as="/" href={SITE_ENV === "user" ? "/" : "/pro"} className={css.logo}>
              <span>Digital Public Library of America</span>
            </Link>}
          {SITE_ENV === "local" &&
            <Link as="/" href="/local">
              <img
                  className={css.localLogo}
                  alt={`${LOCALS[LOCAL_ID].name} Home`}
                  src={`/static/local/${LOCALS[LOCAL_ID].theme}/${LOCALS[
                    LOCAL_ID
                  ].logo}`}
                />
            </Link>}
          <button
            type="button"
            data-cy="menu-button"
            aria-expanded={menuIsOpen}
            onClick={this.toggleMenu}
            className={`${css.menuButton} ${menuIsOpen ? css.isOpen : ""}`}
          >
            {!menuIsOpen && <span>Show<br />Menu</span>}
            {menuIsOpen && <span>Hide<br />Menu</span>}
          </button>
        </div>
        {SITE_ENV === "user" &&
          <NavigationUser
            className={`${css.menuContainer} ${menuIsOpen
              ? css.isOpen
              : ""} ${utils.container}`}
            css={css}
            isHome={isHome}
          />}
        {SITE_ENV === "pro" &&
          <NavigationPro
            className={`${css.menuContainer} ${menuIsOpen
              ? css.isOpen
              : ""} ${utils.siteMaxWidth}`}
            css={css}
            isHome={isHome}
          />}
        {SITE_ENV === "local" &&
          <NavigationLocal
            className={`${css.menuContainer} ${menuIsOpen
              ? css.isOpen
              : ""} ${utils.siteMaxWidth}`}
            css={css}
            isHome={isHome}
          />}
      </div>
    );
  }
}

export default SmallScreenHeader;
