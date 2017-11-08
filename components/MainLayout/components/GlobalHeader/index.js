import React from "react";
import Link from "next/link";
import UserNavigation from "../shared/UserNavigation";

import { stylesheet, classNames } from "./GlobalHeader.css";

import {
  stylesheet as desktopStylesheet,
  classNames as desktopClassNames
} from "../shared/DesktopNavigation.css";

const GlobalHeader = () =>
  <div className={classNames.header}>
    <UserNavigation
      className={`${classNames.linksContainer} site-max-width`}
      classNames={desktopClassNames}
    />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: desktopStylesheet }} />
  </div>;

export default GlobalHeader;
