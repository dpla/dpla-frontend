import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";

import { stylesheet, classNames } from "./HomePageSlider.css";
import { classNames as breakpoints } from "css/breakpoints.css";

const moreLinkChevron = "static/images/chevron-thick-orange.svg";
const moreLinkChevronBlue = "static/images/chevron-thick-blue.svg";
const largeChevron = "static/images/chevron-thin.svg";

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
        <h2 className={classNames.title}>{title}</h2>
        <Link prefetch href={browseLinkUrl}>
          <a className={`hover-underline ${classNames.moreLink}`}>
            Browse all{" "}
            <span className={classNames.moreLinkNoun}>{browseLinkName}</span>
            <img
              alt="Browse exhibitions"
              aria-hidden="true"
              className={classNames.moreLinkChevron}
              src={moreLinkChevron}
            />
          </a>
        </Link>
      </div>
      <Slider
        slidesToShow={slidesToShow ? slidesToShow : 2.5}
        infinite={false}
        nextArrow={
          <NextArrow
            className={`${classNames.arrow} ${classNames.nextArrow}`}
          />
        }
        prevArrow={
          <PrevArrow
            className={`${classNames.arrow} ${classNames.prevArrow}`}
          />
        }
        draggable={false}
        slidesToScroll={slidesToShow ? Math.floor(slidesToShow) : 2}
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
                  </div>
                  <ReactMarkdown
                    className={classNames.itemText}
                    source={name}
                    allowedTypes={["emphasis"]}
                    unwrapDisallowed
                  />
                </a>
              </Link>
            </div>
        )}
      </Slider>
    </div>
  </div>;

export default HomePageSlider;
