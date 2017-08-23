import React from "react";
import { classNames, stylesheet } from "./OptionsBar.css";

import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const OptionsBar = () =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.optionsBar].join(" ")}>
      <p className={classNames.resultsCount}>
        <span>106,703 results for </span>
        <span className={classNames.resultsCountQuery}>new york</span>
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OptionsBar;
