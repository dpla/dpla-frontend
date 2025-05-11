import React, { Component } from "react";

import Link from "next/link";
import NavigationUser from "../shared/NavigationUser";
import NavigationPro from "../shared/NavigationPro";
import NavigationLocal from "../shared/NavigationLocal";

import css from "./SmallScreenStyles.module.scss";
import utils from "stylesheets/utils.module.scss";

import { LOCALS } from "constants/local";

class SmallScreenHeader extends Component {
  state = {
    menuIsOpen: false,
  };

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuIsOpen: !prevState.menuIsOpen,
    }));
  };

  render() {
    const { menuIsOpen } = this.state;
    const { isHome } = this.props;
    const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
    const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
    return (
      <div className={css.wrapper} data-testid="small-screen-header">
        <div className={css.header}>
          {(siteEnv === "user" || siteEnv === "pro") && (
            <Link href="/" className={css.logo}>
              <span>Digital Public Library of America</span>
            </Link>
          )}
          {siteEnv === "local" && (
            <Link href="/">
              <img
                className={css.localLogo}
                alt={`${LOCALS[localId].name} Home`}
                src={`/static/local/${LOCALS[localId].theme}/${
                  LOCALS[localId].logo
                }`}
              />
            </Link>
          )}
          <button
            type="button"
            data-testid="menu-button"
            aria-expanded={menuIsOpen}
            onClick={this.toggleMenu}
            className={`${css.menuButton} ${menuIsOpen ? css.isOpen : ""}`}
          >
            {!menuIsOpen && (
              <span>
                Show
                <br />
                Menu
              </span>
            )}
            {menuIsOpen && (
              <span>
                Hide
                <br />
                Menu
              </span>
            )}
          </button>
        </div>
        {siteEnv === "user" && (
          <NavigationUser
            className={`${css.menuContainer} ${
              menuIsOpen ? css.isOpen : ""
            } ${utils.container}`}
            css={css}
            isHome={isHome}
          />
        )}
        {siteEnv === "pro" && (
          <NavigationPro
            className={`${css.menuContainer} ${
              menuIsOpen ? css.isOpen : ""
            } ${utils.siteMaxWidth}`}
            css={css}
            isHome={isHome}
          />
        )}
        {siteEnv === "local" && (
          <NavigationLocal
            className={`${css.menuContainer} ${
              menuIsOpen ? css.isOpen : ""
            } ${utils.siteMaxWidth}`}
            css={css}
            isHome={isHome}
          />
        )}
      </div>
    );
  }
}

export default SmallScreenHeader;
