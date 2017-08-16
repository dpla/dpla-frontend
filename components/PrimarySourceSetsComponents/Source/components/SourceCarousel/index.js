import React from "react";
import Slider from "react-slick";
import Link from "next/link";

import { classNames, stylesheet } from "./SourceCarousel.css";
import breakpoints from "css/breakpoints.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const smallChevron = "/static/images/chevron-thick-orange.svg";
const largeChevron = "/static/images/chevron-thin.svg";

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

const SourceCarousel = ({ sources, currentSourceIdx }) =>
  <div className={classNames.wrapper}>
    <div className={[classNames.sourceCarousel, module].join(" ")}>
      <div className={classNames.headerAndNav}>
        <h1 className={classNames.header}>
          <span>{`Item ${currentSourceIdx + 1} of ${sources.length -
            1} in the Primary Source Set `}</span>
          <Link to="">
            <a className={classNames.linkToSourceSet}>Women in the Civil War</a>
          </Link>
        </h1>
        <div className={classNames.prevAndNextArrows}>
          <Link to="">
            <a className={classNames.nextOrPrevItemArrow}>
              <img
                alt="previous item"
                className={[
                  classNames.smallChevron,
                  classNames.prevItemArrow
                ].join(" ")}
                src={smallChevron}
              />
              <span>Previous Item</span>
            </a>
          </Link>
          <Link to="">
            <a className={classNames.nextOrPrevItemArrow}>
              <span>Next Item</span>
              <img
                alt="next item"
                className={classNames.smallChevron}
                src={smallChevron}
              />
            </a>
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
          <div className={classNames.item}>
            <img alt={title} className={classNames.itemImg} src={img} />
            <p className={classNames.itemText}>
              {title}
            </p>
          </div>
        )}
      </Slider>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SourceCarousel;
