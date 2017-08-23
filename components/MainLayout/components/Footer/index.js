import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./Footer.css";

const dplaLogo = "/static/images/dpla-logo.svg";
const fbIcon = "/static/images/facebook.svg";
const igIcon = "/static/images/instagram.svg";
const rssIcon = "/static/images/rss.svg";
const tumblrIcon = "/static/images/tumblr.svg";

const Footer = () =>
  <div className={classNames.footer}>
    <div className={classNames.linksAndDonate}>
      <div className={classNames.linksWrapper}>
        <div className={classNames.links}>
          <div>
            <h3 className={classNames.linkHeader}>DPLA</h3>
            <ul>
              <li>About Us</li>
              <li>FAQ</li>
              <li>Who Uses DPLA?</li>
              <li>Terms &amp; Conditions</li>
              <li>
                <Link href="/contact">
                  <a>Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={classNames.linkHeader}>Tools</h3>
            <ul>
              <li>Search</li>
              <li>
                <Link href="/exhibitions">
                  <a>Exhibitions</a>
                </Link>
              </li>
              <li>
                <Link href="/primary-source-sets">
                  <a>Primary Source Sets</a>
                </Link>
              </li>
              <li>
                <Link href="/browse-by-topic">
                  <a>Browse by Topic</a>
                </Link>
              </li>
              <li>Browse by Partner</li>
            </ul>
          </div>
          <div>
            <h3 className={classNames.linkHeader}>Pro Community</h3>
            <ul>
              <li>About DPLA</li>
              <li>Hubs</li>
              <li>Projects</li>
              <li>Get Involved</li>
              <li>Educators</li>
              <li>Developers</li>
            </ul>
          </div>
        </div>
      </div>
      <button className={classNames.donateButton}>Donate</button>
    </div>
    <div className={classNames.logoAndSocialWrapper}>
      <div className={classNames.logoAndSocial}>
        <img className={classNames.dplaLogo} alt="DPLA" src={dplaLogo} />
        <div className={classNames.social}>
          <img
            className={classNames.socialButton}
            alt="Facebook"
            src={fbIcon}
          />

          <img
            className={classNames.socialButton}
            alt="Instagram"
            src={igIcon}
          />

          <img
            className={classNames.socialButton}
            alt="RSS Feed"
            src={rssIcon}
          />

          <img
            className={classNames.socialButton}
            alt="Tumblr"
            src={tumblrIcon}
          />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Footer;
