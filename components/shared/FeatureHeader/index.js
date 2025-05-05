import React from "react";

import css from "./FeatureHeader.module.scss";
import utils from "stylesheets/utils.module.scss";

function FeatureHeader({ title, description, titleClassName }) {
  return (
    <div className={css.wrapper}>
      <div className={`${utils.container} ${css.content}`}>
        <h1
          className={`${titleClassName || ""} ${
            description === "" ? css.long : ""
          } ${css.text}`}
        >
          {title}
        </h1>
        {description !== "" && <p className={css.description}>{description}</p>}
      </div>
    </div>
  );
}

export default FeatureHeader;
