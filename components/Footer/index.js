import React from "react";
import { Link } from "next/link";
import FooterStyles from "./FooterStyles";

const dplaLogo = "http://lorempixel.com/40/40/food";
const fbIcon = "http://lorempixel.com/40/40/food";
const igIcon = "http://lorempixel.com/40/40/food";
const rssIcon = "http://lorempixel.com/40/40/food";
const tumblrIcon = "http://lorempixel.com/40/40/food";

const Footer = () =>
  <div className="header">
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
    <FooterStyles />
  </div>;

export default Footer;
