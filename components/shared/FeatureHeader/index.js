 import React from "react";

import css from "./FeatureHeader.module.scss";

const FeatureHeader = ({ title, description, titleClassName }) =>
  <div className={css.wrapper}>
    <div className={`utils.container ${css.content}`}>
      <h1
        className={`${titleClassName ? titleClassName : ""} ${description === ""
          ? css.long
          : ""} ${css.text}`}
      >
        {title}
      </h1>
      {description !== "" && <p className={css.description}>{description}</p>}
    </div>
  </div>;

export default FeatureHeader;
