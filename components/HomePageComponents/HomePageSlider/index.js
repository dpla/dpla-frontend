import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { markdown } from "markdown";

import { stylesheet, classNames } from "./HomePageSlider.css";
import { classNames as breakpoints } from "css/breakpoints.css";

const moreLinkChevron = "static/images/chevron-thick-orange.svg";
const moreLinkChevronBlue = "static/images/chevron-thick-blue.svg";
const largeChevron = "static/images/chevron-thin.svg";

const NextArrow = ({ onClick, className }) =>
  <button
    className={`${classNames.arrow} ${classNames.nextArrow} ${className}`}
    onClick={onClick}
  >
    <img alt="Right-pointing arrow" src={largeChevron} />
  </button>;

const PrevArrow = ({ onClick, className }) =>
  <button
    className={`${classNames.arrow} ${classNames.prevArrow} ${className}`}
    onClick={onClick}
  >
    <img alt="Left-pointing arrow" src={largeChevron} />
  </button>;

const HomePageSlider = ({
  browseLinkName,
  browseLinkUrl,
  items,
  slidesToShow,
  title,
  theme
}) =>
  <div
    className={`${classNames.wrapper} ${theme === "blue"
      ? classNames.theme_blue
      : ""} `}
  >
    <div className={`${classNames.content} site-max-width`}>
      <div className={classNames.heading}>
        <h1 className={classNames.title}>{title}</h1>
        <Link prefetch href={browseLinkUrl}>
          <a className={classNames.moreLink}>
            <span>
              Browse all{" "}
              <span className={classNames.moreLinkNoun}>{browseLinkName}</span>
            </span>
            <img
              alt="Browse exhibitions"
              className={classNames.moreLinkChevron}
              src={theme === "blue" ? moreLinkChevronBlue : moreLinkChevron}
            />
          </a>
        </Link>
      </div>
      <Slider
        slidesToShow={slidesToShow ? slidesToShow : 3}
        infinite={false}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        draggable={false}
        slidesToScroll={slidesToShow ? slidesToShow : 3}
        responsive={[
          {
            breakpoint: ~~breakpoints.smallPx,
            settings: {
              slidesToShow: 1.125,
              arrows: false,
              draggable: true,
              slidesToScroll: 1
            }
          }
        ]}
      >
        {items.map(
          ({ name, repImageUrl, thumbnailUrl, isFeatured, href, as }, index) =>
            <div key={`${name}—${index}`}>
              <Link prefetch href={href} as={as}>
                <a className={classNames.item}>
                  <div className={classNames.itemImgWrapper}>
                    <div
                      className={classNames.itemImg}
                      style={{
                        backgroundImage: `url(${repImageUrl || thumbnailUrl})`
                      }}
                    />
                    {index === 0 &&
                      <div className={classNames.featuredTag}>Featured</div>}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: markdown.toHTML(name) }}
                    className={classNames.itemText}
                  />
                </a>
              </Link>
            </div>
        )}
      </Slider>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default HomePageSlider;
