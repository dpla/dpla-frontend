import React from "react";
import Link from "next/link";
import UserNavigation from "../shared/UserNavigation";
import ProNavigation from "../shared/ProNavigation";

import { SITE_ENV } from "@env";

import {
  stylesheet as desktopStylesheet,
  classNames as desktopClassNames
} from "../shared/DesktopStyles.css";

const GlobalHeader = () =>
  <div className={desktopClassNames.header}>
    {SITE_ENV !== "pro" &&
      <UserNavigation
        className={`${desktopClassNames.linksContainer} site-max-width`}
        classNames={desktopClassNames}
      />}
    {SITE_ENV === "pro" &&
      <ProNavigation
        className={`${desktopClassNames.linksContainer} site-max-width`}
        classNames={desktopClassNames}
      />}
    <style dangerouslySetInnerHTML={{ __html: desktopStylesheet }} />
  </div>;

export default GlobalHeader;
