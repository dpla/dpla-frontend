import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import styles from "./PrimarySourceSets.css";

const mockSourceSets = [
  {
    text: "Road to Revolution",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 0
  },
  {
    text: "Early Chinese Immigration to the U.S.",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 1
  },
  {
    text: "Mexican Labor and World War II",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 2
  },
  {
    text: "The Impact of Television on News Media",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 2
  }
];

const NextArrow = ({ onClick }) =>
  <div className={styles.nextArrow} onClick={onClick}>
    ⇨
  </div>;

const PrevArrow = ({ onClick }) =>
  <div className={styles.prevArrow} onClick={onClick}>
    ⇦
  </div>;

const PrimarySourceSets = (/* data */) =>
  <div className={styles.wrapper}>
    <div className={styles.primarySourceSets}>
      <div className={styles.headerAndBrowse}>
        <h1 className={styles.header}>Primary Source Sets for Education</h1>
        <Link className={styles.browse} to="">Browse all Sets</Link>
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
