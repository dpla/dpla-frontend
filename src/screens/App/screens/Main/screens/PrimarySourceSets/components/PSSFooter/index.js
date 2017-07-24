import React from "react";
import { Link } from "react-router-dom";

import styles from "./PSSFooter.css";
import { module } from "../../../../../../css/utils.css";

const OtherInfo = () =>
  <div className={styles.wrapper}>
    <div className={[module, styles.otherInfo].join(" ")}>
      <p className={styles.p}>
        <span>
          These sets were created and reviewed by the teachers on the&nbsp;
        </span>
        <Link to="" className={styles.link}>
          DPLA's Education Advisory Committee.
        </Link>
      </p>
      <p className={styles.p}>
        <span>
          To give feedback or suggest a Source Set, contact us at&nbsp;
        </span>
        <a className={styles.link} mailto="education@dp.la">education@dp.la</a>
      </p>
    </div>
  </div>;

export default OtherInfo;
