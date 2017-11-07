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
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default HeadingRule;
