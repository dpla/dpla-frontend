import React from "react";

import css from "./HeadingRule.scss";

const HeadingRule = ({ color }) =>
  <div>
    <div
      className={css.rule}
      style={{
        borderColor: color ? color : "rgba(0,0,0,.15)"
      }}
    />
  </div>;

export default HeadingRule;
