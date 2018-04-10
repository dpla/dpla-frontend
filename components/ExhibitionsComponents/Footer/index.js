import React from "react";

import { classNames, stylesheet } from "./Footer.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;
const OtherInfo = () =>
  <div className={classNames.wrapper}>
    <div className={`${container} ${classNames.otherInfo}`}>
      <p className={classNames.footerText}>
        Exhibitions curated by DPLA staff, DPLA partner institutions, and
        graduate students in library
        and information science and public history.
      </p>
      <p className={classNames.footerText}>
        <span>
          Feedback? Interested in curating an exhibition for DPLA? Contact us
          at&nbsp;
        </span>
        <a className="link" href="mailto:education@dp.la">
          education@dp.la
        </a>.
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OtherInfo;
