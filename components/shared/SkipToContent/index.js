import React from "react";

import css from "./SkipToContent.scss";

const SkipToContent = ({ className, id, isHidden, children }) =>
  <div className={css.skipLink} tabIndex="-1">
    <a href="#main">Skip to Main Content</a>
  </div>;

export default SkipToContent;
