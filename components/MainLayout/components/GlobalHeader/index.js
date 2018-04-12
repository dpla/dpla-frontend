import React from "react";
import Link from "next/link";

import NavigationUser from "../shared/NavigationUser";
import NavigationPro from "../shared/NavigationPro";

import css from "../shared/DesktopStyles.scss";

import { SITE_ENV } from "constants/env";

const GlobalHeader = ({ isHome }) =>
  <div className={css.header}>
    {SITE_ENV !== "pro" &&
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
  </div>;

export default GlobalHeader;
