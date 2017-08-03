import React from "react";
import Slider from "react-slick";
import Link from "next/link";

import { stylesheet, classNames } from "./OnlineExhibitions.css";

import breakpoints from "css/breakpoints.css";
const smallChevron = "static/images/chevron-thick-orange.svg";
const largeChevron = "static/images/chevron-thin.svg";

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
  <button className={classNames.nextArrow} onClick={onClick}>
    <img
      alt=""
      className={[classNames.nextChevron, className].join(" ")}
      src={largeChevron}
    />
  </button>;

const PrevArrow = ({ onClick, className }) =>
  <button className={classNames.prevArrow} onClick={onClick}>
    <img
      alt=""
      className={[classNames.backChevron, className].join(" ")}
      src={largeChevron}
    />
  </button>;

const OnlineExhibitions = (/* data */) =>
  <div className={classNames.wrapper}>
    <div className={classNames.onlineExhibitions}>
      <div className={classNames.headerAndBrowse}>
        <h1 className={classNames.header}>Online Exhibitions</h1>
        <Link className={classNames.browse} to="">
          <a>
            <span>Browse all Exhibitions</span>
            <img
              alt="browse exhibitions"
              className={classNames.smallChevron}
              src={smallChevron}
            />
          </a>
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
          <div className={classNames.item}>
            <img alt={text} className={classNames.itemImg} src={imageUrl} />
            {isFeatured && <div className={classNames.featured}>Featured</div>}
            <p className={classNames.itemText}>
              {text}
            </p>
          </div>
        )}
      </Slider>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default OnlineExhibitions;
