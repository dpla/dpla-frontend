import React from "react";

import utils from "stylesheets/utils.scss";
import css from "./Footer.scss";

const OtherInfo = () =>
  <div className={css.wrapper}>
    <div className={`${utils.container} ${css.otherInfo}`}>
      <p className={css.footerText}>
        Exhibitions curated by DPLA staff, DPLA partner institutions, and
        graduate students in library
        and information science and public history.
      </p>
      <p className={css.footerText}>
        <span>
          Feedback? Interested in curating an exhibition for DPLA? Contact us
          at&nbsp;
        </span>
        <a className="link" href="mailto:education@dp.la">
          education@dp.la
        </a>.
      </p>
    </div>
  </div>;

export default OtherInfo;
