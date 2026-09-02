import React from "react";

import NavigationUser from "../shared/NavigationUser";
import NavigationPro from "../shared/NavigationPro";
import NavigationLocal from "../shared/NavigationLocal";

import css from "../shared/DesktopStyles.module.css";
import utils from "stylesheets/utils.module.css";

function GlobalHeader({ isHome }) {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const isUser = siteEnv === "user";
  return (
    <div
      className={
        isUser ? `${css.header} ${css.headerUserBreakpoint}` : css.header
      }
      data-cy="global-header"
    >
      {isUser && (
        <NavigationUser
          className={`${css.linksContainer} ${utils.siteMaxWidth}`}
          css={css}
          isHome={isHome}
          compact
        />
      )}
      {siteEnv === "pro" && (
        <NavigationPro
          className={`${css.linksContainer} ${utils.siteMaxWidth}`}
          css={css}
          isHome={isHome}
        />
      )}
      {siteEnv === "local" && (
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
