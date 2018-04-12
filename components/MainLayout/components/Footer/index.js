import React from "react";
import Link from "next/link";

import FooterPro from "./FooterPro";
import FooterUser from "./FooterUser";

import { SITE_ENV } from "constants/env";

import { classNames, stylesheet } from "./Footer.css";

const logo = "/static/images/dpla-logo.svg";
const fbIcon = "/static/images/facebook.svg";
const igIcon = "/static/images/instagram.svg";
const tumblrIcon = "/static/images/tumblr.svg";
const twitterIcon = "/static/images/twitter.svg";

const Footer = () =>
  <footer className={classNames.wrapper}>
    {SITE_ENV === "user" && <FooterUser />}
    {SITE_ENV === "pro" && <FooterPro />}
    <div className={classNames.smallFooterWrapper}>
      <div className={`${classNames.smallFooter} site-max-width`}>
        <Link href="/">
          <a><img className={classNames.logo} alt="DPLA Home" src={logo} /></a>
        </Link>
        <div className={classNames.socialIcons}>
          <a
            href="https://www.facebook.com/digitalpubliclibraryofamerica"
            title="Facebook"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className={classNames.socialButton}
              alt="Facebook"
              src={fbIcon}
            />
          </a>
          <a
            href="https://www.instagram.com/digpublib/"
            title="Instagram"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className={classNames.socialButton}
              alt="Instagram"
              src={igIcon}
            />
          </a>
          <a
            href="http://digitalpubliclibraryofamerica.tumblr.com/"
            title="Tumblr"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className={classNames.socialButton}
              alt="Tumblr"
              src={tumblrIcon}
            />
          </a>
          <a
            href="https://twitter.com/dpla"
            title="Twitter"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className={classNames.socialButton}
              alt="Twitter"
              src={twitterIcon}
            />
          </a>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </footer>;
export default Footer;
