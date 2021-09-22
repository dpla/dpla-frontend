import React from "react";

import css from "./Content.module.scss";

const ItemTermValuePair = ({ heading, children, className }) =>
  children
    ? <div className={`${css.termValuePair} ${className}`}>
        <dt className={css.term}>
          {heading}
        </dt>
        <dd className={`${css.value} ${css.otherMetadataItem}`}>
          {children}
        </dd>
      </div>
    : null;

export default ItemTermValuePair;
