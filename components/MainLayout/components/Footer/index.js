import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./Footer.css";

import Button from "components/shared/Button";
const logo = "/static/images/dpla-logo.svg";
const fbIcon = "/static/images/facebook.svg";
const igIcon = "/static/images/instagram.svg";
const rssIcon = "/static/images/rss.svg";
const tumblrIcon = "/static/images/tumblr.svg";
const twitterIcon = "/static/images/twitter.svg";

const Footer = () =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.footer} site-max-width`}>
      <div className="row">
        <div className={`${classNames.linkGroup} col-xs-6 col-sm-4 col-md-3`}>
          <h3 className={classNames.linkHeader}>DPLA</h3>
          <ul>
            <li>
              <Link prefetch href="/about-us">
                About Us
              </Link>
            </li>
            <li>
              <Link prefetch href="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link prefetch href="/guides">
                Who Uses DPLA?
              </Link>
            </li>
            <li>
              <Link prefetch href="/terms-and-conditions">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link prefetch href="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${classNames.linkGroup} col-xs-6 col-sm-4 col-md-3`}>
          <h3 className={classNames.linkHeader}>Tools</h3>
          <ul>
            <li>
              <Link prefetch href="/search">
                Search
              </Link>
            </li>
            <li>
              <Link prefetch href="/exhibitions">
                Exhibitions
              </Link>
            </li>
            <li>
              <Link prefetch href="/primary-source-sets">
                Primary Source Sets
              </Link>
            </li>
            <li>
              <Link prefetch href="/browse-by-topic">
                Browse by Topic
              </Link>
            </li>
            <li>
              <Link prefetch href="/browse-by-partner">
                Browse by Partner
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${classNames.linkGroup} col-xs-6 col-sm-4 col-md-3`}>
          <h3 className={classNames.linkHeader}>Pro Community</h3>
          <ul>
            <li>
              <Link prefetch href="">
                About DPLA
              </Link>
            </li>
            <li>
              <Link prefetch href="">
                Hubs
              </Link>
            </li>
            <li>
              <Link prefetch href="">
                Projects
              </Link>
            </li>
            <li>
              <Link prefetch href="">
                Get Involved
              </Link>
            </li>
            <li>
              <Link prefetch href="">
                Educators
              </Link>
            </li>
            <li>
              <Link prefetch href="">
                Developers
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-xs-12 col-md-3">
          <Button
            type="primary"
            size="large"
            className={classNames.donateButton}
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
  </div>;

export default Footer;
