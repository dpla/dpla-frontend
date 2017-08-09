import React from "react";

import { stylesheet, classNames } from "./Header.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const Header = () =>
  <div className={classNames.headerWrapper}>
    <div className={[module, classNames.headerContent].join(" ")}>
      <h1 className={classNames.headerText}>
        <div>Exhibitions</div>
      </h1>
      <p className={classNames.headerDescription}>
        Stories of national significance drawn from source materials in
        libraries, archives, and museums across the United States.
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Header;
