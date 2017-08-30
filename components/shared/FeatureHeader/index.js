import React from "react";

import { classNames, stylesheet } from "./FeatureHeader.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const FeatureHeader = ({ title, description }) =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.content].join(" ")}>
      <h1 className={classNames.text}>{title}</h1>
      <p className={classNames.description}>
        {description}
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FeatureHeader;
