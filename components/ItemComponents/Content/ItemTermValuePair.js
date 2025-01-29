import React from "react";

import css from "./Content.module.scss";

function ItemTermValuePair({ heading, children, className }) {
  return children ? (
    <div className={`${css.termValuePair} ${className}`}>
      <dt className={css.term}>{heading}</dt>
      <dd className={`${css.value} ${css.otherMetadataItem}`}>{children}</dd>
    </div>
  ) : (
    <></>
  );
}

export default ItemTermValuePair;
