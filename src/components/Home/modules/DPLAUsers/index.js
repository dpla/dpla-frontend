import React from "react";
import Slider from "react-slick";

import styles from "./DPLAUsers.css";

const NextArrow = ({ onClick }) =>
  <div className={styles.nextArrow} onClick={onClick}>
    ⇨
  </div>;

const PrevArrow = ({ onClick }) =>
  <div className={styles.prevArrow} onClick={onClick}>
    ⇦
  </div>;

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
      >
        <div className={[styles.item, styles.learners].join(" ")}>
          <div className={styles.imageDiv}>
            <img
              alt="text"
              className={styles.itemImg}
              src="https://unsplash.it/187/211?random"
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
              src="https://unsplash.it/187/212?random"
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
              src="https://unsplash.it/187/213?random"
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
              src="https://unsplash.it/187/214?random"
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
