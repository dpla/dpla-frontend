import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import {useRouter} from "next/router";
import Markdown from "react-markdown";

import {PrevArrow, NextArrow} from "components/shared/CarouselNavArrows";

import {extractSourceId, removeQueryParams} from "lib";

import css from "./SourceCarousel.module.scss";

function CarouselSlider({currentSourceIdx, sources}) {
  const router = useRouter();
  const sourceChildren = sources.map(({name, thumbnailUrl, useDefaultImage}, i) => (
    <div key={name} className={css.item}>
      {/* for some reason react-slick can't have <Link /> as direct child */}
      <Link
        as={{
          pathname: `/primary-source-sets/${router.query.set}/sources/${extractSourceId(sources[i]["@id"])}`,
          query: removeQueryParams(router.query, ["source", "set"])
        }}
        href={{
          pathname: `/primary-source-sets/set/sources`, query: {
            ...router.query,
            source: extractSourceId(sources[i]["@id"])
          }
        }}
      >
        <div
          className={`${css.itemImgWrapper} ${useDefaultImage ? css.defaultImageWrapper : ""} ${i === currentSourceIdx && css.currentItemImgWrapper}`}>
          <img alt="" src={thumbnailUrl} className={css.itemImg}/>
        </div>
        <Markdown
          className={css.itemText}
          allowedElements={["emphasis", "text"]}
          unwrapDisallowed
        >{name}</Markdown>
      </Link>
    </div>
  ));

  return (
    <div>
      <Slider
        slidesToShow={6}
        infinite={false}
        nextArrow={<NextArrow/>}
        prevArrow={<PrevArrow/>}
        draggable={false}
        slidesToScroll={6}
        initialSlide={// makes sure carousel is always showing 6 items
          currentSourceIdx > sources.length - 6 ? sources.length - 6 : currentSourceIdx}
        responsive={[{
          breakpoint: 640, settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "12.5%",
            slidesToShow: 1.25,
            draggable: true,
            slidesToScroll: 1
          }
        }]}
      >{sourceChildren}</Slider>
    </div>
  );
}

export default CarouselSlider;
