import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import styles from "./PrimarySourceSets.css";

import smallChevron from "../../../../images/chevron-thick-blue.svg";
import largeChevron from "../../../../images/chevron-thin.svg";

const mockSourceSets = [
  {
    text: "Road to Revolution",
    imageUrl: "http://lorempixel.com/334/245",
    id: 0
  },
  {
    text: "Early Chinese Immigration to the U.S.",
    imageUrl: "http://lorempixel.com/334/246",
    id: 1
  },
  {
    text: "Mexican Labor and World War II",
    imageUrl: "http://lorempixel.com/334/247",
    id: 2
  },
  {
    text: "The Impact of Television on News Media",
    imageUrl: "http://lorempixel.com/334/248",
    id: 2
  }
];

const NextArrow = ({ onClick }) =>
  <button className={styles.nextArrow} onClick={onClick}>
    <img alt="" className={styles.nextChevron} src={largeChevron} />
  </button>;

const PrevArrow = ({ onClick }) =>
  <div className={styles.prevArrow} onClick={onClick}>
    <img alt="" className={styles.backChevron} src={largeChevron} />
  </div>;

const PrimarySourceSets = (/* data */) =>
  <div className={styles.wrapper}>
    <div className={styles.primarySourceSets}>
      <div className={styles.headerAndBrowse}>
        <h1 className={styles.header}>Primary Source Sets for Education</h1>
        <Link className={styles.browse} to="">
          <span>Browse all Sets</span>
          <img
            alt="browse sets"
            className={styles.smallChevron}
            src={smallChevron}
          />
        </Link>
      </div>
      <Slider
        slidesToShow={4}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        draggable={false}
        slidesToScroll={1}
      >
        {mockSourceSets.map(({ text, imageUrl, id }) =>
          <div className={styles.item}>
            <img alt={text} className={styles.itemImg} src={imageUrl} />
            <p className={styles.itemText}>{text}</p>
          </div>
        )}
      </Slider>
    </div>
  </div>;

export default PrimarySourceSets;
