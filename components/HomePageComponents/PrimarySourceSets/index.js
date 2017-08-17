import React from "react";
import Slider from "react-slick";
import Link from "next/link";

import { stylesheet, classNames } from "./PrimarySourceSets.css";
import breakpoints from "css/breakpoints.css";

const smallChevron = "static/images/chevron-thick-blue.svg";
const largeChevron = "static/images/chevron-thin.svg";

const mockSourceSets = [
  {
    text: "Road to Revolution",
    imageUrl: "http://lorempixel.com/334/245/food",
    id: 0
  },
  {
    text: "Early Chinese Immigration to the U.S.",
    imageUrl: "http://lorempixel.com/334/246/food",
    id: 1
  },
  {
    text: "Mexican Labor and World War II",
    imageUrl: "http://lorempixel.com/334/247/food",
    id: 2
  },
  {
    text: "The Impact of Television on News Media",
    imageUrl: "http://lorempixel.com/334/248/food",
    id: 2
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

const PrimarySourceSets = (/* data */) =>
  <div className={classNames.wrapper}>
    <div className={classNames.primarySourceSets}>
      <div className={classNames.headerAndBrowse}>
        <h1 className={classNames.header}>Primary Source Sets for Education</h1>
        <Link href="/primary-source-sets">
          <a className={classNames.browse}>
            <span>Browse all Sets</span>
            <img
              alt="browse sets"
              className={classNames.smallChevron}
              src={smallChevron}
            />
          </a>
        </Link>
      </div>
      <Slider
        slidesToShow={4}
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
        {mockSourceSets.map(({ text, imageUrl, id }) =>
          <div className={classNames.item}>
            <img alt={text} className={classNames.itemImg} src={imageUrl} />
            <p className={classNames.itemText}>
              {text}
            </p>
          </div>
        )}
      </Slider>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default PrimarySourceSets;
