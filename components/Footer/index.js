import React from "react";
import { Link } from "next/link";
import FooterStyles from "./FooterStyles.scss";

const dplaLogo = "static/images/dpla-logo.svg";
const fbIcon = "static/images/facebook.svg";
const igIcon = "static/images/instagram.svg";
const rssIcon = "static/images/rss.svg";
const tumblrIcon = "static/images/tumblr.svg";

const Footer = () =>
  <div className="footer">
    <div className="linksAndDonate">
      <div className="linksWrapper">
        <div className="links">
          <div>
            <h3 className="linkHeader">DPLA</h3>
            <ul>
              <li>About Us</li>
              <li>FAQ</li>
              <li>Who Uses DPLA?</li>
              <li>Terms &amp; Conditions</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="linkHeader">Tools</h3>
            <ul>
              <li>Search</li>
              <li>Exhibitions</li>
              <li> Primary Source Sets </li>
              <li>Browse by Topic</li>
              <li>Browse by Partner</li>
            </ul>
          </div>
          <div>
            <h3 className="linkHeader">Pro Community</h3>
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
      <button className="donateButton">Donate</button>
    </div>
    <div className="logoAndSocialWrapper">
      <div className="logoAndSocial">
        <img className="dplaLogo" alt="DPLA" src={dplaLogo} />
        <div className="social">
          <img className="socialButton" alt="Facebook" src={fbIcon} />

          <img className="socialButton" alt="Instagram" src={igIcon} />

          <img className="socialButton" alt="RSS Feed" src={rssIcon} />

          <img className="socialButton" alt="Tumblr" src={tumblrIcon} />

        </div>
      </div>
    </div>
    <style jsx>{FooterStyles}</style>
  </div>;

export default Footer;
