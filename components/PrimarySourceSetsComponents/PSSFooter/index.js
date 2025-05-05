import React from "react";
import Link from "next/link";

import {PSS_NHD_URL} from "constants/site";

import css from "./PSSFooter.module.scss";
import utils from "stylesheets/utils.module.scss"

function OtherInfo() {
  return (
    <div className={css.wrapper} data-cy={'pss-footer'}>
      <div className={`${utils.container} ${css.otherInfo}`}>
        <p className={css.p}>
        <span>
          These sets were created and reviewed by teachers.
          {" "}
        </span>
          <span>
          Explore resources and ideas for{" "}
            <Link href="/about/using-dplas-primary-source-sets">
            Using DPLA&apos;s Primary Source Sets
          </Link>{" "}
            in your classroom.
        </span>
        </p>
        <p className={css.p}>
        <span>
          To give feedback, contact us at {" "}
          <a className={utils.link} href={`mailto:info@dp.la`}>
            info@dp.la
          </a>. You can also
          {" "}view resources for{" "}
          <a className="link external" href={PSS_NHD_URL}>
            National History Day
          </a>.
        </span>
        </p>
      </div>
    </div>
  );
}

export default OtherInfo;
