import React from "react";
import Link from "next/link";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss"

import { SITE_ENV } from "constants/env";

import Logo from "components/svg/DplaLogo";
import Facebook from "components/svg/Facebook";
import Instagram from "components/svg/Instagram";
import Twitter from "components/svg/Twitter";

class SmallFooter extends React.Component {
  render() {
    return (
      <div className={css.smallFooterWrapper}>
        <div className={`${css.smallFooter} ${utils.siteMaxWidth}`}>
          <Link as="/" href={SITE_ENV === "user" ? "/" : "/pro"}>
            <a><Logo className={css.logo} alt="DPLA Home" /></a>
          </Link>
          <div className={css.socialIcons}>
            <a
              href="https://www.facebook.com/digitalpubliclibraryofamerica"
              title="Facebook"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Facebook className={css.socialButton} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/digpublib/"
              title="Instagram"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Instagram className={css.socialButton} alt="Instagram" />
            </a>
            <a
              href="https://twitter.com/dpla"
              title="Twitter"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Twitter
                className={css.socialButton}
                alt="Twitter"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SmallFooter;
