import React from "react";

import NavigationUser from "../shared/NavigationUser";
import NavigationPro from "../shared/NavigationPro";
import NavigationLocal from "../shared/NavigationLocal";

import css from "../shared/DesktopStyles.module.scss";
import utils from "stylesheets/utils.module.scss";

import { SITE_ENV } from "constants/env";

function GlobalHeader({ isHome }) {
  return (
    <div className={css.header} data-cy="global-header">
      {SITE_ENV === "user" && (
        <NavigationUser
          className={`${css.linksContainer} ${utils.siteMaxWidth}`}
          css={css}
          isHome={isHome}
        />
      )}
      {SITE_ENV === "pro" && (
        <NavigationPro
          className={`${css.linksContainer} ${utils.siteMaxWidth}`}
          css={css}
          isHome={isHome}
        />
      )}
      {SITE_ENV === "local" && (
        <NavigationLocal
          className={`${css.linksContainer} ${utils.siteMaxWidth}`}
          css={css}
          isHome={isHome}
        />
      )}
    </div>
  );
}

export default GlobalHeader;
