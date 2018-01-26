import React from "react";
import Link from "next/link";
import NavigationUser from "../shared/NavigationUser";
import NavigationPro from "../shared/NavigationPro";

import {
  stylesheet as desktopStylesheet,
  classNames as desktopClassNames
} from "../shared/DesktopStyles.css";

import { SITE_ENV } from "constants/env";

const GlobalHeader = ({ isHome }) =>
  <div className={desktopClassNames.header}>
    {SITE_ENV !== "pro" &&
      <NavigationUser
        className={`${desktopClassNames.linksContainer} site-max-width`}
        classNames={desktopClassNames}
        isHome={isHome}
      />}
    {SITE_ENV === "pro" &&
      <NavigationPro
        className={`${desktopClassNames.linksContainer} site-max-width`}
        classNames={desktopClassNames}
        isHome={isHome}
      />}
    <style dangerouslySetInnerHTML={{ __html: desktopStylesheet }} />
  </div>;

export default GlobalHeader;
