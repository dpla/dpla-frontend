import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";

import { SECTIONS as PRO_SECTIONS } from "constants/pro";

import { classNames, stylesheet } from "./Footer.css";

const logo = "/static/images/dpla-logo.svg";
const fbIcon = "/static/images/facebook.svg";
const igIcon = "/static/images/instagram.svg";
const rssIcon = "/static/images/rss.svg";
const tumblrIcon = "/static/images/tumblr.svg";
const twitterIcon = "/static/images/twitter.svg";

const Footer = () => {
  return (
    <footer className={classNames.wrapper}>
      <div className={`${classNames.footer} site-max-width`}>
        <div className="row">
          <div className={`${classNames.linkGroup} col-xs-6 col-sm-4 col-md-3`}>
            <h2 className={classNames.linkHeader}>DPLA</h2>
            <ul>
              <li>
                <Link href="//beta.dp.la/about/frequently-asked-questions">
                  <a>Frequently Asked Questions</a>
                </Link>
              </li>
              <li>
                <Link href="//beta.dp.la/guides">
                  <a>How Can I Use DPLA?</a>
                </Link>
              </li>
              <li>
                <Link href="//beta.dp.la/about/terms-conditions">
                  <a>Terms &amp; Conditions</a>
                </Link>
              </li>
              <li>
                <Link href="//beta.dp.la/about/our-supporters">
                  <a>Our Supporters</a>
                </Link>
              </li>
              <li>
                <Link href="//beta.dp.la/about">
                  <a>About DPLA</a>
                </Link>
              </li>
              <li>
                <Link href="//beta.dp.la/contact">
                  <a>Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${classNames.linkGroup} col-xs-6 col-sm-4 col-md-3`}>
            <h2 className={classNames.linkHeader}>Tools</h2>
            <ul>
              <li>
                <Link href="//beta.dp.la/primary-source-sets">
                  <a>Primary Source Sets</a>
                </Link>
              </li>
              <li>
                <Link href="//beta.dp.la/browse-by-partner">
                  <a>Browse by Partner</a>
                </Link>
              </li>
              <li>
                <Link href="//beta.dp.la/browse-by-topic">
                  <a>Browse by Topic</a>
                </Link>
              </li>
              <li>
                <Link href="//beta.dp.la/exhibitions">
                  <a>Exhibitions</a>
                </Link>
              </li>
              <li>
                <Link href="//beta.dp.la/search">
                  <a>Search</a>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`${classNames.linkGroup} col-xs-12 col-sm-4 col-md-3`}
          >
            <h2 className={classNames.linkHeader}>DPLA Pro</h2>
            <ul>
              {PRO_SECTIONS.map((section, index) => {
                return (
                  <li key={index}>
                    <Link href={`//pro.dp.la/${section.slug}`}>
                      <a>{section.name}</a>
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/news">
                  <a>News</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xs-12 col-md-3">
            <Button
              type="primary"
              size="large"
              className={classNames.donateButton}
              url="/donate"
            >
              Donate
            </Button>
          </div>
        </div>
      </div>
      <div className={classNames.smallFooterWrapper}>
        <div className={`${classNames.smallFooter} site-max-width`}>
          <img className={classNames.logo} alt="DPLA" src={logo} />
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
              href="https://dp.la/info/feed/"
              title="RSS Feed"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                className={classNames.socialButton}
                alt="RSS Feed"
                src={rssIcon}
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
    </footer>
  );
};

export default Footer;
