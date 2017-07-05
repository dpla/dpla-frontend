import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import styles from "./OnlineExhibitions.css";

const mockExhibitionsData = [
  {
    text: "Building the First Transcontinental Railroad",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 0,
    isFeatured: true
  },
  {
    text: "Race to the Moon",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 1,
    isFeatured: false
  },
  {
    text: "In Focus: The Evolution of the Personal Camera",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 2,
    isFeatured: false
  },
  {
    text: "Design Tenets",
    imageUrl: "http://via.placeholder.com/334x243",
    id: 2,
    isFeatured: false
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

const OnlineExhibitions = (/* data */) =>
  <div className={styles.wrapper}>
    <div className={styles.onlineExhibitions}>
      <div className={styles.headerAndBrowse}>
        <h1 className={styles.header}>Online Exhibitions</h1>
        <Link className={styles.browse} to="">Browse all Exhibitions</Link>
      </div>
      <Slider
        slidesToShow={3}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        draggable={false}
        slidesToScroll={1}
      >
        {mockExhibitionsData.map(({ text, imageUrl, id, isFeatured }) =>
          <div className={styles.item}>
            <img alt={text} className={styles.itemImg} src={imageUrl} />
            <p className={styles.itemText}>{text}</p>
          </div>
        )}
      </Slider>
    </div>
  </div>;

export default OnlineExhibitions;
