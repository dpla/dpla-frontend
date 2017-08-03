import React from "react";
import Slider from "react-slick";

import { stylesheet, classNames } from "./DPLAUsers.css";
import breakpoints from "css/breakpoints.css";

const chevron = "static/images/chevron-thin.svg";

const NextArrow = ({ onClick, className }) =>
  <button className={classNames.nextArrow} onClick={onClick}>
    <img
      alt=""
      className={[classNames.nextChevron, className].join(" ")}
      src={chevron}
    />
  </button>;

const PrevArrow = ({ onClick, className }) =>
  <button className={classNames.prevArrow} onClick={onClick}>
    <img
      alt=""
      className={[classNames.backChevron, className].join(" ")}
      src={chevron}
    />
  </button>;

const DPLAUsers = (/* data */) =>
  <div className={classNames.wrapper}>
    <div className={classNames.DPLAUsers}>
      <h1 className={classNames.header}>Who Uses DPLA?</h1>
      <div className={classNames.divider} />
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
              centerPadding: "18%",
              slidesToShow: 1.5,
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
        <div className={[classNames.item, classNames.learners].join(" ")}>
          <div className={classNames.imageDiv}>
            <img
              alt="text"
              className={classNames.itemImg}
              src="http://lorempixel.com/187/211/food"
            />
          </div>
          <div className={classNames.content}>
            <h1 className={classNames.itemHeader}>Lifelong learners</h1>
            <p className={classNames.text}>
              Lifelong learners will enjoy browsing Exhibitions or using our
              Topic Browse index to find library artifacts related to their
              interests.
            </p>
          </div>
        </div>
        <div className={[classNames.item, classNames.educators].join(" ")}>
          <div className={classNames.imageDiv}>
            <img
              alt="text"
              className={classNames.itemImg}
              src="http://lorempixel.com/187/212/food"
            />
          </div>
          <div className={classNames.content}>
            <h1 className={classNames.itemHeader}>Educators</h1>
            <p className={classNames.text}>
              The DPLA content team creates curated Primary Source Sets,
              complete with teacher’s notes for use in the classroom.
            </p>
          </div>
        </div>
        <div className={[classNames.item, classNames.genealogists].join(" ")}>
          <div className={classNames.imageDiv}>
            <img
              alt="text"
              className={classNames.itemImg}
              src="http://lorempixel.com/187/213/food"
            />
          </div>
          <div className={classNames.content}>
            <h1 className={classNames.itemHeader}>Genealogists</h1>
            <p className={classNames.text}>
              Genealogists and historians enjoy using our search tools and
              filter controls for finding artifacts related to their family or
              research topic.
            </p>
          </div>
        </div>
        <div className={[classNames.item, classNames.researchers].join(" ")}>
          <div className={classNames.imageDiv}>
            <img
              alt="text"
              className={classNames.itemImg}
              src="http://lorempixel.com/187/214/food"
            />
          </div>
          <div className={classNames.content}>
            <h1 className={classNames.itemHeader}>Researchers</h1>
            <p className={classNames.text}>
              Researchers Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's stand
            </p>
          </div>
        </div>
      </Slider>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default DPLAUsers;
