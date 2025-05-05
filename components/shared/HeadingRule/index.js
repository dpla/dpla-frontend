import React from "react";

import css from "./HeadingRule.module.scss";

function HeadingRule({ color }) {
  return (
    <div>
      <div
        className={css.rule}
        style={{ borderColor: color || "rgba(0,0,0,.15)" }}
      />
    </div>
  );
}

export default HeadingRule;
