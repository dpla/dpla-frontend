import React from "react";
import { Link } from "react-router-dom";

import styles from "./SocialMedia.css";

const mockImages = [
  { url: "http://via.placeholder.com/334x241", description: "placeholder" },
  { url: "http://via.placeholder.com/334x242", description: "placeholder" },
  { url: "http://via.placeholder.com/334x243", description: "placeholder" },
  { url: "http://via.placeholder.com/334x244", description: "placeholder" }
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
    <Link to="" className={styles.visitLink}>Visit @digpublib</Link>
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
    <Link to="" className={styles.visitLink}>Visit @DPLA</Link>
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
