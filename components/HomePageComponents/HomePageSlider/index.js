import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";

import css from "./HomePageSlider.module.scss";
import utils from "stylesheets/utils.module.scss"

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
  <div className={`${css.wrapper} ${theme === "blue" ? css.theme_blue : ""} `} data-cy={browseLinkName}>
    <div className={`${css.content} ${utils.siteMaxWidth}`}>
      <div className={css.heading}>
        <h2 className={css.title}>{title}</h2>
        <Link href={browseLinkUrl}>
          <a className={`hover-underline ${css.moreLink}`}>
            Browse all{" "}
            <span className={css.moreLinkNoun}>{browseLinkName}</span>
            <img
              alt="Browse exhibitions"
              aria-hidden="true"
              className={css.moreLinkChevron}
              src={moreLinkChevron}
            />
          </a>
        </Link>
      </div>
      <Slider
        slidesToShow={slidesToShow ? slidesToShow : 2.5}
        infinite={false}
        nextArrow={<NextArrow className={`${css.arrow} ${css.nextArrow}`} />}
        prevArrow={<PrevArrow className={`${css.arrow} ${css.prevArrow}`} />}
        draggable={false}
        slidesToScroll={slidesToShow ? Math.floor(slidesToShow) : 2}
        responsive={[
          {
            breakpoint: 640,
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
              <Link href={href} as={as}>
                <a className={css.item}>
                  <div className={css.itemImgWrapper}>
                    <div
                      className={css.itemImg}
                      style={{
                        backgroundImage: `url(${repImageUrl || thumbnailUrl})`
                      }}
                    />
                  </div>
                  <ReactMarkdown
                    className={css.itemText}
                    source={name}
                    allowedTypes={["emphasis", "text"]}
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
