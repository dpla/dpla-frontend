import React from "react";
import Link from "next/link";

import { LOCAL_ID } from "constants/env";

import css from "./Footer.scss";
import { LOCALS } from "constants/local";

const logo = "/static/images/dpla-logo.svg";

class SmallFooterLocal extends React.Component {
  render() {
    const { route } = this.props;
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
    } else {
      logoHtml = (
        <Link prefetch href="/local" as="/">
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
        <div className={`${css.smallFooter} site-max-width`}>
          {logoHtml}
          <Link prefetch href="//dp.la">
            <a>
              <img
                className={css.partnershipLogo}
                alt="In partnership with DPLA"
                src={logo}
              />
            </a>
          </Link>
        </div>
      </div>
    );
  }
}

export default SmallFooterLocal;
