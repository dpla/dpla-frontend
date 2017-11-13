import React from "react";
import Link from "next/link";
import UserNavigation from "../shared/UserNavigation";

import {
  stylesheet as desktopStylesheet,
  classNames as desktopClassNames
} from "../shared/DesktopStyles.css";

const GlobalHeader = () =>
  <div className={desktopClassNames.header}>
    {process.env.SITE_ENV !== "pro" &&
      <UserNavigation
        className={`${desktopClassNames.linksContainer} site-max-width`}
        classNames={desktopClassNames}
      />}
    <style dangerouslySetInnerHTML={{ __html: desktopStylesheet }} />
  </div>;

export default GlobalHeader;
