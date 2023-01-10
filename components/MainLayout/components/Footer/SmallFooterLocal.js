import React from "react";
import Link from "next/link";

import { LOCAL_ID } from "constants/env";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss"

import { LOCALS } from "constants/local";

import Logo from "components/svg/DplaLogo";

class SmallFooterLocal extends React.Component {
  render() {
    var logoHtml;
    if (LOCAL_ID === "wisconsin") {
        logoHtml = (
            <a href={`${LOCALS[LOCAL_ID].externalLink}`}>
                <img
                    className={css.localLogo}
                    alt={`${LOCALS[LOCAL_ID].name} Home`}
                    src={`/static/local/${LOCALS[LOCAL_ID].theme}/${LOCALS[LOCAL_ID]
                        .logo}`}
                />
            </a>
        );
    } else if (LOCAL_ID === "tennessee") {
        logoHtml = (
            <Link href="/local" as="/">
                <a>
                    <img
                        className={css.localLogo}
                        alt={`${LOCALS[LOCAL_ID].name} Home`}
                        src={`/static/local/tennessee/logo2.png`}
                    />
                </a>
            </Link>
        );

    } else {
      logoHtml = (
        <Link href="/local" as="/">
          <a>
            <img
              className={css.localLogo}
              alt={`${LOCALS[LOCAL_ID].name} Home`}
              src={`/static/local/${LOCALS[LOCAL_ID].theme}/${LOCALS[LOCAL_ID]
                .logo}`}
            />
          </a>
        </Link>
      );
    }
    return (
      <div className={css.smallFooterWrapper}>
        <div className={`${css.smallFooter} ${utils.siteMaxWidth}`}>
          {logoHtml}
          <Link href="https://dp.la">
            <a>
              <Logo
                className={css.partnershipLogo}
                alt="In partnership with DPLA"
              />
            </a>
          </Link>
        </div>
      </div>
    );
  }
}

export default SmallFooterLocal;
