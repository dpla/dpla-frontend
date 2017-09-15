import React from "react";

import { classNames, stylesheet } from "./FeatureHeader.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const FeatureHeader = ({ title, description, titleClassName }) =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.content].join(" ")}>
      <h1 className={[titleClassName, classNames.text].join(" ")}>{title}</h1>
      <p className={classNames.description}>
        {description}
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FeatureHeader;
