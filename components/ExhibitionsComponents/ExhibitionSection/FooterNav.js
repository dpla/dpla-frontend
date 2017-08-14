import React from "react";
import Link from "next/link";

import { classNames } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const dplaLogo = "/static/images/dpla-logo-black.svg";

const FooterNav = ({ exhibition, route }) =>
  <div className={classNames.footerWrapper}>
    <div className={[module, classNames.footerNav].join(" ")}>
      <Link href="/">
        <img src={dplaLogo} alt="DPLA" className={classNames.dplaLogo} />
      </Link>
      <div className={classNames.navButtons}>
        <Link href="">
          <a className={classNames.prevButton}>Previous</a>
        </Link>
        <Link href="">
          <a className={classNames.nextButton}>Next</a>
        </Link>
      </div>
    </div>
  </div>;

export default FooterNav;
