import React from "react";
import Link from "next/link";

import NavigationUser from "../shared/NavigationUser";
import NavigationPro from "../shared/NavigationPro";
import NavigationLocal from "../shared/NavigationLocal";

import css from "../shared/DesktopStyles.module.scss";

import { SITE_ENV } from "constants/env";

const GlobalHeader = ({ isHome }) =>
  <div className={css.header} data-cy="global-header">
    {SITE_ENV === "user" &&
      <NavigationUser
        className={`${css.linksContainer} site-max-width`}
        css={css}
        isHome={isHome}
      />}
    {SITE_ENV === "pro" &&
      <NavigationPro
        className={`${css.linksContainer} site-max-width`}
        css={css}
        isHome={isHome}
      />}
    {SITE_ENV === "local" &&
      <NavigationLocal
        className={`${css.linksContainer} site-max-width`}
        css={css}
        isHome={isHome}
      />}
  </div>;

export default GlobalHeader;
