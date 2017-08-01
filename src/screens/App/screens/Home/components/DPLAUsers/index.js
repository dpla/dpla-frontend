import React from "react";
import Slider from "react-slick";

import styles from "./DPLAUsers.css";
import breakpoints from "../../../../css/breakpoints.css";

import chevron from "../../../../../../images/chevron-thin.svg";

const NextArrow = ({ onClick, className }) =>
  <button className={styles.nextArrow} onClick={onClick}>
    <img
      alt=""
      className={[styles.nextChevron, className].join(" ")}
      src={chevron}
    />
  </button>;

const PrevArrow = ({ onClick, className }) =>
  <button className={styles.prevArrow} onClick={onClick}>
    <img
      alt=""
      className={[styles.backChevron, className].join(" ")}
      src={chevron}
    />
  </button>;

const DPLAUsers = (/* data */) =>
  <div className={styles.wrapper}>
    <div className={styles.DPLAUsers}>
      <h1 className={styles.header}>Who Uses DPLA?</h1>
      <div className={styles.divider} />
      <Slider
        slidesToShow={3}
        infinite={false}
        adaptiveHeight={true}
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
              slidesToShow: 1.33,
              arrows: false,
              draggable: true
            }
          },
          {
            breakpoint: parseInt(breakpoints.largePx, 10),
            settings: {
              centerMode: false,
              slidesToShow: 2,
              arrows: true,
              draggable: false
            }
          }
        ]}
      >
        <div className={[styles.item, styles.learners].join(" ")}>
          <div className={styles.imageDiv}>
            <img
              alt="text"
              className={styles.itemImg}
              src="http://lorempixel.com/187/211/food"
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.itemHeader}>Lifelong learners</h1>
            <p className={styles.text}>
              Lifelong learners will enjoy browsing Exhibitions or using our
              Topic Browse index to find library artifacts related to their
              interests.
            </p>
          </div>
        </div>
        <div className={[styles.item, styles.educators].join(" ")}>
          <div className={styles.imageDiv}>
            <img
              alt="text"
              className={styles.itemImg}
              src="http://lorempixel.com/187/212/food"
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.itemHeader}>Educators</h1>
            <p className={styles.text}>
              The DPLA content team creates curated Primary Source Sets,
              complete with teacher’s notes for use in the classroom.
            </p>
          </div>
        </div>
        <div className={[styles.item, styles.genealogists].join(" ")}>
          <div className={styles.imageDiv}>
            <img
              alt="text"
              className={styles.itemImg}
              src="http://lorempixel.com/187/213/food"
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.itemHeader}>Genealogists</h1>
            <p className={styles.text}>
              Genealogists and historians enjoy using our search tools and
              filter controls for finding artifacts related to their family or
              research topic.
            </p>
          </div>
        </div>
        <div className={[styles.item, styles.researchers].join(" ")}>
          <div className={styles.imageDiv}>
            <img
              alt="text"
              className={styles.itemImg}
              src="http://lorempixel.com/187/214/food"
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.itemHeader}>Researchers</h1>
            <p className={styles.text}>
              Researchers Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's stand
            </p>
          </div>
        </div>
      </Slider>
    </div>
  </div>;

export default DPLAUsers;
