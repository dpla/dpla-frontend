import React from "react";

import utils from "stylesheets/utils.scss";

import { classNames, stylesheet } from "./FeatureHeader.css";

const FeatureHeader = ({ title, description, titleClassName }) =>
  <div className={classNames.wrapper}>
    <div className={`${utils.container} ${classNames.content}`}>
      <h1
        className={`${titleClassName ? titleClassName : ""} ${description === ""
          ? classNames.long
          : ""} ${classNames.text}`}
      >
        {title}
      </h1>
      {description !== "" &&
        <p className={classNames.description}>{description}</p>}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FeatureHeader;
