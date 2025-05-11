import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Markdown from "react-markdown";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";

import css from "./HomePageSlider.module.scss";
import utils from "stylesheets/utils.module.scss";

import ChevronThickOrange from "components/svg/ChevronThickOrange";

function HomePageSlider({
  browseLinkName,
  browseLinkUrl,
  items,
  slidesToShow,
  title,
  theme,
}) {
  return (
    <div
      className={`${css.wrapper} ${theme === "blue" ? css.theme_blue : ""} `}
      data-testid={browseLinkName}
    >
      <div className={`${css.content} ${utils.siteMaxWidth}`}>
        <div className={css.heading}>
          <h2 className={css.title}>{title}</h2>
          <Link
            href={browseLinkUrl}
            className={`${utils.hoverUnderline} ${css.moreLink}`}
          >
            Browse all{" "}
            <span className={css.moreLinkNoun}>{browseLinkName}</span>
            <ChevronThickOrange
              className={css.moreLinkChevron}
              aria-hidden="true"
            />
          </Link>
        </div>
        <Slider
          slidesToShow={slidesToShow || 2.5}
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
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {items.map(
            (
              { name, repImageUrl, thumbnailUrl, isFeatured, href, as },
              index,
            ) => (
              <div key={`${name}—${index}`}>
                <Link href={href} className={css.item}>
                  <div className={css.itemImgWrapper}>
                    <div
                      className={css.itemImg}
                      style={{
                        backgroundImage: `url(${repImageUrl || thumbnailUrl})`,
                      }}
                    />
                  </div>
                  <Markdown
                    className={css.itemText}
                    allowedElements={["emphasis", "text"]}
                    unwrapDisallowed
                  >
                    {name}
                  </Markdown>
                </Link>
              </div>
            ),
          )}
        </Slider>
      </div>
    </div>
  );
}

export default HomePageSlider;
