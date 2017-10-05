import React from "react";

import Button from "components/shared/Button";
import { classNames, stylesheet } from "./FaveAndCiteButtons.css";

const FaveAndCiteButtons = ({ toCite = "Exhibition" }) =>
  <div className={classNames.buttons}>
    <Button
      type="ghost"
      className={classNames.citeThis}
    >
      Cite this {toCite}
    </Button>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FaveAndCiteButtons;
