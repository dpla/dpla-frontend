import React from "react";

import css from "./HarmfulContent.module.scss";
import utils from "stylesheets/utils.module.scss";

import { LOCALS } from "constants/local";

function HarmfulContent() {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
  let linkUrl = "https://dp.la/about/harmful-language-statement";
  let linkText = "DPLA's Statement on Potentially Harmful Content";

  if (siteEnv === "local") {
    const local = LOCALS[localId];
    linkUrl = local["hlsLink"] ? local["hlsLink"] : linkUrl;
    linkText = local["hlsLinkText"] ? local["hlsLinkText"] : linkText;
  }

  let hlsLink = (
    <>
      Please read <a href={linkUrl}>{linkText}</a>.
    </>
  );

  return (
    <div className={css.wrapper}>
      <div className={utils.container}>
        <p className={css.harmfulContent}>{hlsLink}</p>
      </div>
    </div>
  );
}

export default HarmfulContent;
