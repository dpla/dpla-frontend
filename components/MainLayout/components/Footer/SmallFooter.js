import React from "react";
import Link from "next/link";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss"

import { SITE_ENV } from "constants/env";

import DplaLogo from "components/svg/dpla-logo";
import Facebook from "components/svg/facebook";
import Instagram from "components/svg/instagram";
import Twitter from "components/svg/twitter";

class SmallFooter extends React.Component {
  render() {
    return (
      <div className={css.smallFooterWrapper}>
        <div className={`${css.smallFooter} ${utils.siteMaxWidth}`}>
          <Link as="/" href={SITE_ENV === "user" ? "/" : "/pro"}>
            <DplaLogo className={css.logo} />
          </Link>
          <div className={css.socialIcons}>
            <a
              href="https://www.facebook.com/digitalpubliclibraryofamerica"
              title="Facebook"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Facebook className={css.socialButton} />
            </a>
            <a
              href="https://www.instagram.com/digpublib/"
              title="Instagram"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Instagram className={css.socialButton} />
            </a>
            <a
              href="https://twitter.com/dpla"
              title="Twitter"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Twitter className={css.socialButton} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SmallFooter;
