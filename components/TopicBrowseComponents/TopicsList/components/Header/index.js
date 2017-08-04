import React from "react";

import { classNames, stylesheet } from "./Header.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const Header = () =>
  <div className={classNames.headerWrapper}>
    <div className={[module, classNames.headerContent].join(" ")}>
      <h1 className={classNames.headerText}>Browse By Topic</h1>
      <p className={classNames.headerDescription}>
        Materials from libraries, archives and museums across the United States,
        organized by DPLA's content curation staff into easy to navigate
        sub-topics.
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Header;
