import React from "react";
import Link from "next/link";
import UserNavigation from "../shared/UserNavigation";
import ProNavigation from "../shared/ProNavigation";

import {
  stylesheet as desktopStylesheet,
  classNames as desktopClassNames
} from "../shared/DesktopStyles.css";

import { SITE_ENV } from "../../../../constants/site.js";
const env = SITE_ENV ? SITE_ENV : process.env.SITE_ENV;

const GlobalHeader = () =>
  <div className={desktopClassNames.header}>
    {env !== "pro" &&
      <UserNavigation
        className={`${desktopClassNames.linksContainer} site-max-width`}
        classNames={desktopClassNames}
      />}
    {env === "pro" &&
      <ProNavigation
        className={`${desktopClassNames.linksContainer} site-max-width`}
        classNames={desktopClassNames}
      />}
    <style dangerouslySetInnerHTML={{ __html: desktopStylesheet }} />
  </div>;

export default GlobalHeader;
