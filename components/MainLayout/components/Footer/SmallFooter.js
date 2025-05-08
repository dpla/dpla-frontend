import React from "react";
import Link from "next/link";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss";

import DplaLogo from "components/svg/DplaLogo";
import Facebook from "components/svg/Facebook";
import Instagram from "components/svg/Instagram";
import Bluesky from "components/svg/Bluesky";

class SmallFooter extends React.Component {
  render() {
    return (
      <div className={css.smallFooterWrapper}>
        <div className={`${css.smallFooter} ${utils.siteMaxWidth}`}>
          <Link href="/">
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
              href={"https://bsky.app/profile/dpla.bsky.social"}
              title="Bluesky"
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              <Bluesky className={css.socialButton} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SmallFooter;
