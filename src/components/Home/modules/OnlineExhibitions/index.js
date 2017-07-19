import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import styles from "./OnlineExhibitions.css";
import breakpoints from "../../../../breakpoints.css";

import smallChevron from "../../../../images/chevron-thick-orange.svg";
import largeChevron from "../../../../images/chevron-thin.svg";

const mockExhibitionsData = [
  {
    text: "Building the First Transcontinental Railroad",
    imageUrl: "http://lorempixel.com/334/241/food",
    id: 0,
    isFeatured: true
  },
  {
    text: "Race to the Moon",
    imageUrl: "http://lorempixel.com/334/242/food",
    id: 1,
    isFeatured: false
  },
  {
    text: "In Focus: The Evolution of the Personal Camera",
    imageUrl: "http://lorempixel.com/334/243/food",
    id: 2,
    isFeatured: false
  },
  {
    text: "Design Tenets",
    imageUrl: "http://lorempixel.com/334/244/food",
    id: 2,
    isFeatured: false
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
        responsive={[
          {
            breakpoint: parseInt(breakpoints.smallPx, 10),
            settings: {
              centerMode: true,
              centerPadding: "15.5%",
              slidesToShow: 1.33,
              arrows: false,
              draggable: true
            }
          }
        ]}
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
