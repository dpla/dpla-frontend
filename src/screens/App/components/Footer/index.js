import React from "react";
import { Link } from "react-router-dom";

import dplaLogo from "../../../../images/dpla-logo.svg";
import fbIcon from "../../../../images/facebook.svg";
import igIcon from "../../../../images/instagram.svg";
import rssIcon from "../../../../images/rss.svg";
import tumblrIcon from "../../../../images/tumblr.svg";

import styles from "./Footer.css";

const Footer = () =>
  <div className={styles.footer}>
    <div className={styles.linksAndDonate}>
      <div className={styles.linksWrapper}>
        <div className={styles.links}>
          <div>
            <h3 className={styles.linkHeader}>DPLA</h3>
            <ul>
              <li>About Us</li>
              <li>FAQ</li>
              <li>Our Partners</li>
              <li>Getting Started</li>
              <li>Careers</li>
              <li>Terms &amp; Conditions</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className={styles.linkHeader}>Tools</h3>
            <ul>
              <li>Search</li>
              <li>Exhibitions</li>
              <li><Link to="primary-source-sets">Primary Source Sets</Link></li>
              <li><Link to="browse-by-topic">Browse</Link></li>
              <li>Timeline</li>
              <li>Map</li>
            </ul>
          </div>
          <div>
            <h3 className={styles.linkHeader}>Pro Community</h3>
            <ul>
              <li>Potential Hubs</li>
              <li>Existing Hubs</li>
              <li>Developers</li>
              <li>Get Involved</li>
              <li>Projects</li>
            </ul>
          </div>
        </div>
      </div>
      <button className={styles.donateButton}>Donate</button>
    </div>
    <div className={styles.logoAndSocialWrapper}>
      <div className={styles.logoAndSocial}>
        <img className={styles.dplaLogo} alt="DPLA" src={dplaLogo} />
        <div className={styles.social}>
          <Link to="">
            <img className={styles.socialButton} alt="Facebook" src={fbIcon} />
          </Link>
          <Link to="">
            <img className={styles.socialButton} alt="Instagram" src={igIcon} />
          </Link>
          <Link to="">
            <img className={styles.socialButton} alt="RSS Feed" src={rssIcon} />
          </Link>
          <Link to="">
            <img
              className={styles.socialButton}
              alt="Tumblr"
              src={tumblrIcon}
            />
          </Link>
        </div>
      </div>
    </div>
  </div>;

export default Footer;
