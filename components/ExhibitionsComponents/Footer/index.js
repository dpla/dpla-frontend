import React from "react";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss";

function OtherInfo() {
  return (
    <div className={css.wrapper}>
      <div className={`${utils.container} ${css.otherInfo}`}>
        <p className={css.footerText}>
          Exhibitions curated by DPLA staff, DPLA partner institutions, and
          graduate students in library and information science and public
          history.
        </p>
        <p className={css.footerText}>
          <span>Feedback? Contact us at&nbsp;</span>
          <a className="link" href="mailto:info@dp.la">
            info@dp.la
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default OtherInfo;
