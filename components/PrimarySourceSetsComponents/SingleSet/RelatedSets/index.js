import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";

import { extractSourceSetSlug } from "utilFunctions/";

import utils from "stylesheets/utils.scss";
import css from "./RelatedSets.scss";

const RelatedSets = ({ sets }) => {
  return (
    <div className={css.wrapper}>
      <div className={[utils.container, css.relatedSets].join(" ")}>
        <h2 className={css.header}>Related Primary Source Sets</h2>
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
          {sets.map((set, index) =>
            <div key={`${set.name}-${index}`} className={`${css.item}`}>
              <Link
                prefetch
                href={`/primary-source-sets/set?set=${extractSourceSetSlug(
                  set["@id"]
                )}`}
                as={`/primary-source-sets/${extractSourceSetSlug(set["@id"])}`}
              >
                <a className={css.setLink}>
                  <img
                    alt=""
                    src={set.repImageUrl || set.thumbnailUrl}
                    className={css.setImage}
                  />
                  <ReactMarkdown
                    source={set.name}
                    className={classNames.title}
                    allowedTypes={["emphasis"]}
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

export default RelatedSets;
