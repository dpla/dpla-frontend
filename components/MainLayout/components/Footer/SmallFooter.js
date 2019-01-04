import React from "react";
import Link from "next/link";

import css from "./Footer.scss";

import { SITE_ENV } from "constants/env";

const logo = "/static/images/dpla-logo.svg";
const fbIcon = "/static/images/facebook.svg";
const igIcon = "/static/images/instagram.svg";
const tumblrIcon = "/static/images/tumblr.svg";
const twitterIcon = "/static/images/twitter.svg";

class SmallFooter extends React.Component {
  render() {
    const { route } = this.props;
    return (
      <div className={css.smallFooterWrapper}>
        <div className={`${css.smallFooter} site-max-width`}>
          <Link prefetch as="/" href={SITE_ENV === "user" ? "/" : "/pro"}>
            <a><img className={css.logo} alt="DPLA Home" src={logo} /></a>
          </Link>
          <div className={css.socialIcons}>
            <a
              href="https://www.facebook.com/digitalpubliclibraryofamerica"
              title="Facebook"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className={css.socialButton} alt="Facebook" src={fbIcon} />
            </a>
            <a
              href="https://www.instagram.com/digpublib/"
              title="Instagram"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className={css.socialButton} alt="Instagram" src={igIcon} />
            </a>
            <a
              href="http://digitalpubliclibraryofamerica.tumblr.com/"
              title="Tumblr"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className={css.socialButton} alt="Tumblr" src={tumblrIcon} />
            </a>
            <a
              href="https://twitter.com/dpla"
              title="Twitter"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                className={css.socialButton}
                alt="Twitter"
                src={twitterIcon}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SmallFooter;
