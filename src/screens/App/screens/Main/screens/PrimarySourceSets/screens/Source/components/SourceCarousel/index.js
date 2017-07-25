import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import styles from "./SourceCarousel.css";
import breakpoints from "../../../../../../../../css/breakpoints.css";
import { module } from "../../../../../../../../css/utils.css";

import smallChevron from "../../../../../../../../../../images/chevron-thick-blue.svg";
import largeChevron from "../../../../../../../../../../images/chevron-thin.svg";

import mockSources from "../../../SingleSet/mockSources";

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

const SourceCarousel = () =>
  <div className={styles.wrapper}>
    <div className={[styles.sourceCarousel, module].join(" ")}>
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
        {mockSources.map(({ title, img, id }) =>
          <div className={styles.item}>
            <img alt={title} className={styles.itemImg} src={img} />
            <p className={styles.itemText}>{title}</p>
          </div>
        )}
      </Slider>
    </div>
  </div>;

export default SourceCarousel;
