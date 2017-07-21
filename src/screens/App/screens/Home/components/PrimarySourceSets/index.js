import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import styles from "./PrimarySourceSets.css";
import breakpoints from "shared/breakpoints.css";

import smallChevron from "images/chevron-thick-blue.svg";
import largeChevron from "images/chevron-thin.svg";

const mockSourceSets = [
  {
    text: "Road to Revolution",
    imageUrl: "http://lorempixel.com/334/245/food",
    id: 0
  },
  {
    text: "Early Chinese Immigration to the U.S.",
    imageUrl: "http://lorempixel.com/334/246/food",
    id: 1
  },
  {
    text: "Mexican Labor and World War II",
    imageUrl: "http://lorempixel.com/334/247/food",
    id: 2
  },
  {
    text: "The Impact of Television on News Media",
    imageUrl: "http://lorempixel.com/334/248/food",
    id: 2
  }
];

const NextArrow = ({ onClick, className }) =>
  <button className={styles.nextArrow} onClick={onClick}>
    <img
      alt=""
      className={[styles.nextChevron, className].join(" ")}
      src={largeChevron}
    />
  </button>;

const PrevArrow = ({ onClick, className }) =>
  <button className={styles.prevArrow} onClick={onClick}>
    <img
      alt=""
      className={[styles.backChevron, className].join(" ")}
      src={largeChevron}
    />
  </button>;

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
        infinite={false}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        draggable={false}
        slidesToScroll={1}
        responsive={[
          {
            breakpoint: parseInt(breakpoints.smallPx, 10),
            settings: {
              centerMode: true,
              centerPadding: "12.5%",
              slidesToShow: 1.25,
              arrows: false,
              draggable: true
            }
          }
        ]}
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
