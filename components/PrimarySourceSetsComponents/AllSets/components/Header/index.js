import React from "react";

import { stylesheet, classNames } from "./Header.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const Header = () =>
  <div className={classNames.headerWrapper}>
    <div className={[module, classNames.headerContent].join(" ")}>
      <h1 className={classNames.headerText}>
        <div>Primary</div>
        <div className={classNames.nowrap}>Source Sets</div>
      </h1>
      <p className={classNames.headerDescription}>
        Primary source collections exploring topics in history, literature, and
        culture developed by educators — complete with teaching guides for class
        use.
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Header;
