import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { PrevArrow, NextArrow } from "components/shared/CarouselNavArrows";

import { extractSourceId, removeQueryParams } from "utilFunctions";

import { stylesheet as navArrowStyles } from "components/shared/CarouselNavArrows/CarouselNavArrows.css";
import { classNames } from "./SourceCarousel.css";
import breakpoints from "css/breakpoints.css";

const CarouselSlider = ({ currentSourceIdx, sources, route }) =>
  <div>
    <Slider
      slidesToShow={6}
      infinite={false}
      nextArrow={<NextArrow className={classNames.carouselNavArrow} />}
      prevArrow={<PrevArrow className={classNames.carouselNavArrow} />}
      draggable={false}
      slidesToScroll={6}
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
                className={[
                  classNames.itemImgWrapper,
                  useDefaultImage ? classNames.defaultImageWrapper : "",
                  i === currentSourceIdx && classNames.currentItemImgWrapper
                ].join(" ")}
              >
                <img alt="" src={thumbnailUrl} className={classNames.itemImg} />
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
    <style dangerouslySetInnerHTML={{ __html: navArrowStyles }} />
  </div>;

export default CarouselSlider;
