import React from "react";
import Slider from "react-slick";
import Link from "next/link";

import { PrevArrow, NextArrow } from "components/shared/CarouselNavArrows";
import { stylesheet as navArrowStyles } from "components/shared/CarouselNavArrows/CarouselNavArrows.css";
import { classNames } from "./SourceCarousel.css";
import breakpoints from "css/breakpoints.css";
import extractSourceId from "/utilFunctions/extractSourceId";
import removeQueryParams from "/utilFunctions/removeQueryParams";

const markdownit = require("markdown-it")({ html: true });

const CarouselSlider = ({ currentSourceIdx, sources, route }) =>
  <div>
    <Slider
      slidesToShow={6}
      infinite={false}
      nextArrow={<NextArrow className={classNames.carouselNavArrow} />}
      prevArrow={<PrevArrow className={classNames.carouselNavArrow} />}
      draggable={false}
      slidesToScroll={1}
      initialSlide={
        // makes sure carousel is always showing 6 items
        currentSourceIdx > sources.length - 6
          ? sources.length - 6
          : currentSourceIdx
      }
      responsive={[
        {
          breakpoint: ~~breakpoints.smallPx,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "12.5%",
            slidesToShow: 1.25,
            draggable: true
          }
        }
      ]}
    >
      {sources.map(({ name, thumbnailUrl, useDefaultImage }, i) =>
        <div key={name}>
          {/* for some reason react-slick can't have <Link /> as direct child */}
          <Link
            prefetch
            as={{
              pathname: `/primary-source-sets/${route.query
                .set}/sources/${extractSourceId(sources[i]["@id"])}`,
              query: removeQueryParams(route.query, ["source", "set"])
            }}
            href={{
              pathname: `/primary-source-sets/set/sources`,
              query: Object.assign({}, route.query, {
                source: extractSourceId(sources[i]["@id"])
              })
            }}
          >
            <a className={classNames.item}>
              <div
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
                className={[
                  classNames.itemImgWrapper,
                  useDefaultImage ? classNames.defaultImageWrapper : "",
                  i === currentSourceIdx && classNames.currentItemImgWrapper
                ].join(" ")}
              />
              <div
                className={classNames.itemText}
                dangerouslySetInnerHTML={{ __html: markdownit.render(name) }}
              />
            </a>
          </Link>
        </div>
      )}
    </Slider>
    <style>{navArrowStyles}</style>
  </div>;

export default CarouselSlider;
