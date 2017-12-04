import React from "react";

import { stylesheet, classNames } from "./SkipToContent.css";

const SkipToContent = ({ className, id, isHidden, children }) =>
  <div className={classNames.skipLink} tabindex="-1">
    <a href="#main">Skip to Main Content</a>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SkipToContent;
