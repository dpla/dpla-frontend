import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { markdown } from "markdown";

import { stylesheet, classNames } from "./PrimarySourceSets.css";
import breakpoints from "css/breakpoints.css";

const smallChevron = "static/images/chevron-thick-blue.svg";
const largeChevron = "static/images/chevron-thin.svg";

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

const PrimarySourceSets = ({ sourceSets }) =>
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
        {sourceSets.map(set => {
          const { name, thumbnailUrl } = set;
          return (
            <div className={classNames.item}>
              <img
                alt={name}
                className={classNames.itemImg}
                src={thumbnailUrl}
              />
              <div
                dangerouslySetInnerHTML={{ __html: markdown.toHTML(name) }}
                className={classNames.itemText}
              />
            </div>
          );
        })}
      </Slider>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default PrimarySourceSets;
