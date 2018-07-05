import React from "react";

import css from "./Content.scss";

const Row = ({ heading, children, className }) =>
  children
    ? <div className={[css.termValuePair, className].join(" ")}>
        <dt className={css.term}>
          {heading}
        </dt>
        <dd className={[css.value, css.otherMetadataItem].join(" ")}>
          {children}
        </dd>
      </div>
    : null;

export default Row;
