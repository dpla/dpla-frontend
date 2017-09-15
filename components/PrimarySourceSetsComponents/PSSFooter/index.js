import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./PSSFooter.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;
const OtherInfo = () =>
  <div className={classNames.wrapper}>
    <div className={[module, classNames.otherInfo].join(" ")}>
      <p className={classNames.p}>
        <span>
          These sets were created and reviewed by the teachers on the&nbsp;
        </span>
        <Link prefetch href="">
          <a className={classNames.link}>
            DPLA's Education Advisory Committee.
          </a>
        </Link>
      </p>
      <p className={classNames.p}>
        <span>
          To give feedback or suggest a Source Set, contact us at&nbsp;
        </span>
        <a className={classNames.link} href="mailto:education@dp.la">
          education@dp.la
        </a>
      </p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OtherInfo;
