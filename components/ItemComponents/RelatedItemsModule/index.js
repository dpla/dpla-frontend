import React from "react";
import Link from "next/link";
import Slider from "react-slick";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";
import RelatedItem from "./RelatedItem"

import utils from "stylesheets/utils.scss";
import css from "./RelatedItemsModule.scss";

const RelatedItemsModule = ({ items }) => {
  return (
    <div className={css.wrapper}>
      <div className={[utils.container, css.relatedItems].join(" ")}>
        <h2 className={css.header}>Related Items</h2>
        <Slider
          slidesToShow={4.5}
          infinite={false}
          nextArrow={<NextArrow className={css.navArrow} />}
          prevArrow={<PrevArrow className={css.navArrow} />}
          draggable={false}
          slidesToScroll={4}
          responsive={[
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1.5,
                arrows: false,
                draggable: true,
                slidesToScroll: 1
              }
            }
          ]}
        >
        {items.map((item, index) =>
          <RelatedItem item={item} index={index} />
        )}
        </Slider>
      </div>
    </div>
  );
};

export default RelatedItemsModule;
