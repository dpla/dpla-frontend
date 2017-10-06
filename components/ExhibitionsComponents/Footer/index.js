import React from "react";

import { classNames, stylesheet } from "./Footer.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;
const OtherInfo = () =>
  <div className={classNames.wrapper}>
    <div className={`${container} ${classNames.otherInfo}`}>
      <p className={classNames.p}>
        Exhibitions are curated by the DPLA Curation team, DPLA Hubs staff,
        graduate students in library and information science and public history,
        and public librarians as part of the Public Library Partnerships
        Project.
      </p>
      <p className={classNames.p}>
        <span>
          Feedback? Contact us at &nbsp;
        </span>
        <a className={classNames.link} href="mailto:education@dp.la">
          education@dp.la
        </a>
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OtherInfo;
