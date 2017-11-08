import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./PSSFooter.css";
import { classNames as utilClassNames } from "css/utils.css";
import { DPLA_CONTACT_EMAIL, PSS_SUGGESTION_URL } from "constants/site";

const { container } = utilClassNames;
const OtherInfo = () =>
  <div className={classNames.wrapper}>
    <div className={[container, classNames.otherInfo].join(" ")}>
      <p className={classNames.p}>
        <span>
          These sets were created and reviewed by the teachers on the&nbsp;
        </span>
        <Link prefetch href="/education/education-advisory-committee/">
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
