import React from "react";
import Link from "next/link";

import FooterPro from "./FooterPro";
import FooterUser from "./FooterUser";

import { SITE_ENV, LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

import css from "./Footer.scss";

const logo = "/static/images/dpla-logo.svg";
const fbIcon = "/static/images/facebook.svg";
const igIcon = "/static/images/instagram.svg";
const tumblrIcon = "/static/images/tumblr.svg";
const twitterIcon = "/static/images/twitter.svg";

const Footer = ({ route }) =>
  <footer className={css.wrapper}>
    {SITE_ENV === "user" && <FooterUser route={route} />}
    {SITE_ENV === "pro" && <FooterPro route={route} />}
    <div className={css.smallFooterWrapper}>
      <div className={`${css.smallFooter} site-max-width`}>
        {(SITE_ENV === "user" || SITE_ENV === "pro") &&
          <Link prefetch as="/" href={SITE_ENV === "user" ? "/" : "/pro"}>
            <a><img className={css.logo} alt="DPLA Home" src={logo} /></a>
          </Link>}
        {SITE_ENV === "local" &&
          <Link prefetch href="/search">
            <a>
              <img
                className={css.localLogo}
                alt={`${LOCALS[LOCAL_ID].name} Home`}
                src={`/static/local/${LOCALS[LOCAL_ID].theme}/logo.jpg`}
              />
            </a>
          </Link>}
        {SITE_ENV === "local" &&
          <Link prefetch as="/" href="//dp.la">
            <a>
              <img
                className={css.partnershipLogo}
                alt="In partnership with DPLA"
                src={logo}
              />
            </a>
          </Link>}
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
            <img className={css.socialButton} alt="Twitter" src={twitterIcon} />
          </a>
        </div>
      </div>
    </div>
  </footer>;
export default Footer;
