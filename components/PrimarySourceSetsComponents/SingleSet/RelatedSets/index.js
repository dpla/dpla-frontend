import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./RelatedSets.css";
import { classNames as utilClassNames } from "css/utils.css";
import { extractSourceSetSlug } from "utilFunctions/";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";
import { classNames as breakpoints } from "css/breakpoints.css";
import { stylesheet as navArrowStyles } from "components/shared/CarouselNavArrows/CarouselNavArrows.css";

const markdownit = require("markdown-it")({ html: true });
const { container } = utilClassNames;

const RelatedSets = ({ sets }) => {
  return (
    <div className={classNames.wrapper}>
      <div className={[container, classNames.relatedSets].join(" ")}>
        <h3 className={classNames.header}>Related Primary Source Sets</h3>
        <Slider
          slidesToShow={5}
          infinite={false}
          nextArrow={<NextArrow className={classNames.navArrow} />}
          prevArrow={<PrevArrow className={classNames.navArrow} />}
          draggable={false}
          slidesToScroll={5}
          responsive={[
            {
              breakpoint: ~~breakpoints.smallPx,
              settings: {
                slidesToShow: 2.5,
                arrows: false,
                draggable: true,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: ~~breakpoints.mediumPx,
              settings: {
                slidesToShow: 4,
                draggable: true,
                slidesToScroll: 4
              }
            }
          ]}
        >
          {sets.map((set, index) =>
            <div
              key={`${set.name}-${index}`}
              className="col-12 col-xs-6 col-md-3"
            >
              <Link
                prefetch
                href={`/primary-source-sets/set?set=${extractSourceSetSlug(
                  set["@id"]
                )}`}
                as={`/primary-source-sets/${extractSourceSetSlug(set["@id"])}`}
              >
                <a className={classNames.setLink}>
                  <img
                    alt={set.name}
                    src={set.repImageUrl || set.thumbnailUrl}
                    className={classNames.setImage}
                  />
                  <p
                    className={classNames.title}
                    dangerouslySetInnerHTML={{
                      __html: markdownit.renderInline(set.name)
                    }}
                  />
                </a>
              </Link>
            </div>
          )}
        </Slider>
      </div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <style dangerouslySetInnerHTML={{ __html: navArrowStyles }} />
    </div>
  );
};

export default RelatedSets;
