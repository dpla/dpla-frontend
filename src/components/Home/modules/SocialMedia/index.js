import React from "react";
import { Link } from "react-router-dom";

import styles from "./SocialMedia.css";

import externalLinkIcon from "../../../../images/external-link.svg";

const mockImages = [
  { url: "https://unsplash.it/170/170?random", description: "placeholder" },
  { url: "https://unsplash.it/170/171?random", description: "placeholder" },
  { url: "https://unsplash.it/170/172?random", description: "placeholder" },
  { url: "https://unsplash.it/170/173?random", description: "placeholder" }
];

const Instagram = ({ images }) =>
  <div className={styles.instagram}>
    <h1 className={styles.header}>
      On Instagram
    </h1>
    <div className={styles.instagramImages}>
      {images.map(({ url, description }) =>
        <div key={url}>
          <img alt={description} className={styles.instagramImage} src={url} />
        </div>
      )}
    </div>
    <Link to="" className={styles.visitLink}>
      <span>Visit @digpublib</span>
      <img
        className={styles.externalLinkIcon}
        alt="visit @digpublib"
        src={externalLinkIcon}
      />
    </Link>
  </div>;

const Twitter = ({ message, time }) =>
  <div className={styles.twitter}>
    <h1 className={styles.header}>
      On Twitter
    </h1>
    <p
      className={styles.twitterText}
      dangerouslySetInnerHTML={{ __html: message }}
    />
    <p className={styles.twitterDate}>{time}</p>
    <Link to="" className={styles.visitLink}>
      <span>Visit @DPLA</span>
      <img
        className={styles.externalLinkIcon}
        alt="visit @DPLA"
        src={externalLinkIcon}
      />
    </Link>
  </div>;

const SocialMedia = (/* data */) =>
  <div className={styles.wrapper}>
    <div className={styles.socialMedia}>
      <Twitter
        time="23H AGO"
        message="TODAY: Our friends @internetarchive host a live AMA on their @macfound #100andChange plan to open access to 4M books…"
      />
      <Instagram images={mockImages} />
    </div>
  </div>;

export default SocialMedia;
