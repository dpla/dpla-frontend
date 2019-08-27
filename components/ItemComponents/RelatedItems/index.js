import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";

import utils from "stylesheets/utils.scss";
import css from "./RelatedItems.scss";

const RelatedItems = ({ items }) => {
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
          <div key={`${item.id}-${index}`} className={`${css.item}`}>
            <Link
              prefetch
              href={`/item/${item.id}`}
              as={`/item/${item.id}`}
            >
              <a className={css.itemLink}>
                <div className={css.imageWrapper}>
                  <img
                    alt={item.title}
                    src={item.thumbnailUrl}
                    className={css.itemImage}
                  />
                </div>
                <div className={css.title}>
                  {item.title}
                </div>
                 <ReactMarkdown
                    source={item.title}
                    className={css.title}
                    allowedTypes={["emphasis", "text"]}
                    unwrapDisallowed
                  />
              </a>
            </Link>
          </div>
        )}
        </Slider>
      </div>
    </div>
  );
};

export default RelatedItems;
