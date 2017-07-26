import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import styles from "./SourceCarousel.css";
import breakpoints from "../../../../../../../../css/breakpoints.css";
import { module } from "../../../../../../../../css/utils.css";

import smallChevron from "../../../../../../../../../../images/chevron-thick-orange.svg";
import largeChevron from "../../../../../../../../../../images/chevron-thin.svg";

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

const SourceCarousel = ({ sources }) =>
  <div className={styles.wrapper}>
    <div className={[styles.sourceCarousel, module].join(" ")}>
      <div className={styles.headerAndNav}>
        <h1 className={styles.header}>
          <span>Item 2 of 15 in the Primary Source Set </span>
          <Link to="" className={styles.linkToSourceSet}>
            Women in the Civil War
          </Link>
        </h1>
        <div className={styles.prevAndNextArrows}>
          <Link className={styles.nextOrPrevItemArrow} to="">
            <img
              alt="previous item"
              className={[styles.smallChevron, styles.prevItemArrow].join(" ")}
              src={smallChevron}
            />
            <span>Previous Item</span>
          </Link>
          <Link className={styles.nextOrPrevItemArrow} to="">
            <span>Next Item</span>
            <img
              alt="next item"
              className={styles.smallChevron}
              src={smallChevron}
            />
          </Link>
        </div>
      </div>
      <Slider
        slidesToShow={6}
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
        {sources.map(({ title, img, id }) =>
          <div className={styles.item}>
            <img alt={title} className={styles.itemImg} src={img} />
            <p className={styles.itemText}>{title}</p>
          </div>
        )}
      </Slider>
    </div>
  </div>;

export default SourceCarousel;
