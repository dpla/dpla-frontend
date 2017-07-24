import React from "react";

import styles from "./Tooltip.css";

const Tooltip = ({ className, id, isHidden, children }) =>
  <div
    className={[className, isHidden && styles.hidden].join(" ")}
    id={id || className}
    role="tooltip"
    aria-hidden={isHidden}
  >
    {children}
  </div>;

export default Tooltip;
