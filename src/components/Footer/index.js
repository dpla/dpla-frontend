import React from "react";
import { Link } from "react-router-dom";

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
              <li>Primary Source Sets</li>
              <li>Browse</li>
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
        <p>DPLA LOGO</p>
        <div className={styles.social}>
          <button>FB</button>
          <button>IG</button>
          <button>S</button>
          <button>TW</button>
        </div>
      </div>
    </div>
  </div>;

export default Footer;
