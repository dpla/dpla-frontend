import React from "react";

import { classNames, stylesheet } from "./FaveAndCiteButtons.css";

const FaveAndCiteButtons = () =>
  <div className={classNames.buttons}>
    <button className={classNames.citeThis}>Cite this Exhibition</button>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FaveAndCiteButtons;
