import React from "react";

import { classNames, stylesheet } from "./FaveAndCiteButtons.css";

const FaveAndCiteButtons = ({ toCite = "Exhibition" }) =>
  <div className={classNames.buttons}>
    <button className={classNames.citeThis}>Cite this {toCite}</button>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FaveAndCiteButtons;
