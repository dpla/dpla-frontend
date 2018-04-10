import React from "react";
import Link from "next/link";

import { DPLA_CONTACT_EMAIL, PSS_SUGGESTION_URL } from "constants/site";

import utils from "stylesheets/utils.scss";

import { classNames, stylesheet } from "./PSSFooter.css";

const OtherInfo = () =>
  <div className={classNames.wrapper}>
    <div className={[utils.container, classNames.otherInfo].join(" ")}>
      <p className={classNames.p}>
        <span>
          These sets were created and reviewed by the teachers on the&nbsp;
        </span>
        <Link href="//pro.dp.la/education/education-advisory-committee">
          <a className="link">
            DPLA's Education Advisory Committee.
          </a>
        </Link>
      </p>
      <p className={classNames.p}>
        <span>
          To give feedback, contact us at {" "}
          <a className="link" href={`mailto:${DPLA_CONTACT_EMAIL}`}>
            education@dp.la
          </a>. You can also
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            href={PSS_SUGGESTION_URL}
          >
            {" "}suggest a primary source set topic
          </a>.
        </span>
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OtherInfo;
