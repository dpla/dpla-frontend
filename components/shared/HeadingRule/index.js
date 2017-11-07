import React from "react";

import { classNames, stylesheet } from "./HeadingRule.css";

const HeadingRule = ({ color }) =>
  <div>
    <div
      className={classNames.rule}
      style={{
        borderColor: color ? color : "rgba(0,0,0,.15)"
      }}
    />
    <style>{stylesheet}</style>
  </div>;

export default HeadingRule;
