import React from "react";

import {
  INSTAGRAM_URL,
  INSTAGRAM_LINK_TITLE,
  TWITTER_URL,
  TWITTER_LINK_TITLE
} from "../../../constants/site.js";
import { stylesheet, classNames } from "./SocialMedia.css";

const externalLinkIcon = "static/images/external-link.svg";

const mockImages = [
  { url: "http://lorempixel.com/170/170/food", description: "placeholder" },
  { url: "http://lorempixel.com/170/171/food", description: "placeholder" },
  { url: "http://lorempixel.com/170/172/food", description: "placeholder" },
  { url: "http://lorempixel.com/170/173/food", description: "placeholder" }
];

const Instagram = ({ images }) =>
  <div className={classNames.instagram}>
    <h1 className={classNames.header}>On Instagram</h1>
    <div className={classNames.instagramImages}>
      {images.map(({ url, description }) =>
        <img
          alt={description}
          className={classNames.instagramImage}
          src={url}
        />
      )}
    </div>
    <a
      href={INSTAGRAM_URL}
      className={classNames.visitLink}
      title={INSTAGRAM_LINK_TITLE}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Visit @digpublib</span>
      <img
        className={classNames.externalLinkIcon}
        alt="visit @digpublib"
        src={externalLinkIcon}
      />
    </a>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

const Twitter = ({ message, time }) =>
  <div className={classNames.twitter}>
    <h1 className={classNames.header}>On Twitter</h1>
    <p
      className={classNames.twitterText}
      dangerouslySetInnerHTML={{ __html: message }}
    />
    <p className={classNames.twitterDate}>
      {time}
    </p>
    <a
      href={TWITTER_URL}
      className={classNames.visitLink}
      title={TWITTER_LINK_TITLE}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Visit @DPLA</span>
      <img
        className={classNames.externalLinkIcon}
        alt="visit @DPLA"
        src={externalLinkIcon}
      />
    </a>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

const SocialMedia = (/* data */) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.socialMedia} site-max-width`}>
      <Twitter
        time="23H AGO"
        message="TODAY: Our friends @internetarchive host a live AMA on their @macfound #100andChange plan to open access to 4M books…"
      />
      <Instagram images={mockImages} />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SocialMedia;
