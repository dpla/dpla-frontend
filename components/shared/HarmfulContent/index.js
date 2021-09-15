import React from "react";

import css from "./HarmfulContent.module.scss";
import utils from "stylesheets/utils.module.scss"

class HarmfulContent extends React.Component {

  render() {
    return (
      <div className={css.wrapper}>
        <div className={utils.container}>
          <p className={css.harmfulContent}>
            Please read <a href="https://dp.la/about/harmful-language-statement">DPLA’s Statement on Potentially Harmful Content</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default HarmfulContent;
