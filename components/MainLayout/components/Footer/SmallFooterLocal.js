import React from "react";
import Link from "next/link";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss";

import { LOCALS } from "constants/local";

import DplaLogo from "components/svg/DplaLogo";

export default function SmallFooterLocal() {
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;

  let logoHtml;
  if (localId === "wisconsin") {
    logoHtml = (
      <a href={`${LOCALS[localId].externalLink}`}>
        <img
          className={css.localLogo}
          alt={`${LOCALS[localId].name} Home`}
          src={`/static/local/${LOCALS[localId].theme}/${LOCALS[localId].logo}`}
        />
      </a>
    );
  } else if (localId === "tennessee") {
    logoHtml = (
      <Link href="/">
        <img
          className={css.localLogo}
          alt={`${LOCALS[localId].name} Home`}
          src={`/static/local/tennessee/logo2.png`}
        />
      </Link>
    );
  } else {
    logoHtml = (
      <Link href="/local">
        <img
          className={css.localLogo}
          alt={`${LOCALS[localId].name} Home`}
          src={`/static/local/${LOCALS[localId].theme}/${LOCALS[localId].logo}`}
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
