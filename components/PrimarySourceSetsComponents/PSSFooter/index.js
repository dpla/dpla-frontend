import React from "react";
import Link from "next/link";

import {
  DPLA_CONTACT_EMAIL,
  PSS_SUGGESTION_URL,
  PSS_NHD_URL
} from "constants/site";

import utils from "stylesheets/utils.scss";
import css from "./PSSFooter.scss";

const OtherInfo = () =>
  <div className={css.wrapper}>
    <div className={[utils.container, css.otherInfo].join(" ")}>
      <p className={css.p}>
        <span>
          These sets were created and reviewed by the teachers on the&nbsp;
        </span>
        <Link href="//pro.dp.la/education/education-advisory-committee">
          <a className="link">
            DPLA's Education Advisory Committee.
          </a>
        </Link>{" "}
        <span>
          Explore resources and ideas for{" "}
          <Link href="/about/using-dplas-primary-source-sets">
            <a>Using DPLA's Primary Source Sets</a>
          </Link>{" "}
          in your classroom.
        </span>
      </p>
      <p className={css.p}>
        <span>
          To give feedback, contact us at {" "}
          <a className="link" href={`mailto:${DPLA_CONTACT_EMAIL}`}>
            education@dp.la
          </a>. You can also{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="link external"
            href={PSS_SUGGESTION_URL}
          >
            suggest a primary source set topic
          </a>{" "}
          or view resources for{" "}
          <a className="link external" target="_blank" href={PSS_NHD_URL}>
            National History Day
          </a>.
        </span>
      </p>
    </div>
  </div>;

export default OtherInfo;
