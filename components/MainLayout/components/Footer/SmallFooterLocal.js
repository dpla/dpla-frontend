import React from "react";
import Link from "next/link";

import { LOCAL_ID } from "constants/env";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss";

import { LOCALS } from "constants/local";

import DplaLogo from "components/svg/DplaLogo";

class SmallFooterLocal extends React.Component {
  render() {
    let logoHtml;
    if (LOCAL_ID === "wisconsin") {
      logoHtml = (
        <a href={`${LOCALS[LOCAL_ID].externalLink}`}>
          <img
            className={css.localLogo}
            alt={`${LOCALS[LOCAL_ID].name} Home`}
            src={`/static/local/${LOCALS[LOCAL_ID].theme}/${
              LOCALS[LOCAL_ID].logo
            }`}
          />
        </a>
      );
    } else if (LOCAL_ID === "tennessee") {
      logoHtml = (
        <Link href="/local" as="/">
          <img
            className={css.localLogo}
            alt={`${LOCALS[LOCAL_ID].name} Home`}
            src={`/static/local/tennessee/logo2.png`}
          />
        </Link>
      );
    } else {
      logoHtml = (
        <Link href="/local" as="/">
          <img
            className={css.localLogo}
            alt={`${LOCALS[LOCAL_ID].name} Home`}
            src={`/static/local/${LOCALS[LOCAL_ID].theme}/${
              LOCALS[LOCAL_ID].logo
            }`}
          />
        </Link>
      );
    }
    return (
      <div className={css.smallFooterWrapper}>
        <div className={`${css.smallFooter} ${utils.siteMaxWidth}`}>
          {logoHtml}
          <Link href="https://dp.la">
            <DplaLogo className={css.partnershipLogo} />
          </Link>
        </div>
      </div>
    );
  }
}

export default SmallFooterLocal;
