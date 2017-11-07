import React from "react";

import { stylesheet, classNames } from "./Tooltip.css";

const Tooltip = ({ className, id, isHidden, children }) =>
  <div
    className={[className, isHidden && classNames.hidden].join(" ")}
    id={id || className}
    role="tooltip"
    aria-hidden={isHidden}
  >
    {children}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Tooltip;
