import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import styles from "./OnlineExhibitions.css";

import smallChevron from "../../../../images/chevron-thick-orange.svg";
import largeChevron from "../../../../images/chevron-thin.svg";

const mockExhibitionsData = [
  {
    text: "Building the First Transcontinental Railroad",
    imageUrl: "http://lorempixel.com/334/241",
    id: 0,
    isFeatured: true
  },
  {
    text: "Race to the Moon",
    imageUrl: "http://lorempixel.com/334/242",
    id: 1,
    isFeatured: false
  },
  {
    text: "In Focus: The Evolution of the Personal Camera",
    imageUrl: "http://lorempixel.com/334/243",
    id: 2,
    isFeatured: false
  },
  {
    text: "Design Tenets",
    imageUrl: "http://lorempixel.com/334/244",
    id: 2,
    isFeatured: false
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

const OnlineExhibitions = (/* data */) =>
  <div className={styles.wrapper}>
    <div className={styles.onlineExhibitions}>
      <div className={styles.headerAndBrowse}>
        <h1 className={styles.header}>Online Exhibitions</h1>
        <Link className={styles.browse} to="">
          <span>Browse all Exhibitions</span>
          <img
            alt="browse exhibitions"
            className={styles.smallChevron}
            src={smallChevron}
          />
        </Link>
      </div>
      <Slider
        slidesToShow={3}
        infinite={false}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        draggable={false}
        slidesToScroll={1}
      >
        {mockExhibitionsData.map(({ text, imageUrl, id, isFeatured }) =>
          <div className={styles.item}>
            <img alt={text} className={styles.itemImg} src={imageUrl} />
            {isFeatured && <div className={styles.featured}>Featured</div>}
            <p className={styles.itemText}>{text}</p>
          </div>
        )}
      </Slider>
    </div>
  </div>;

export default OnlineExhibitions;
