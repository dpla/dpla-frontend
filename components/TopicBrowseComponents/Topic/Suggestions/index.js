import React from "react";
import Link from "next/link";
import Slider from "react-slick";

import { classNames, stylesheet } from "./Suggestions.css";
import { classNames as utilClassNames } from "css/utils.css";
import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";
import { stylesheet as navArrowStyles } from "components/shared/CarouselNavArrows/CarouselNavArrows.css";
import { classNames as breakpoints } from "css/breakpoints.css";

const { container } = utilClassNames;

const mapTypeToClass = type => {
  if (type === "Exhibition") {
    return classNames.exhibition;
  } else if (type === "Topic") {
    return classNames.topic;
  } else if (type === "Primary Source Set") {
    return classNames.topic;
  }
};

const Suggestions = ({ suggestions }) =>
  <div className={classNames.suggestionsWrapper}>
    <div className={[classNames.suggestions, container].join(" ")}>
      <h3 className={classNames.header}>You might also enjoy</h3>
      <ul className={classNames.suggestedResources}>
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
          {suggestions.map(suggestion =>
            <li
              key={suggestion.title}
              className={[
                classNames.suggestedItem,
                mapTypeToClass(suggestion.type)
              ].join(" ")}
            >
              <Link prefetch href={suggestion.href} as={suggestion.as}>
                <a
                  className={classNames.imageWrapper}
                  style={{ backgroundImage: `url(${suggestion.thumbnailUrl})` }}
                >
                  <div className={classNames.gradientBackground}>
                    <div className={classNames.typeAndTitle}>
                      <p className={classNames.resourceType}>
                        {suggestion.type}
                      </p>
                      <h3
                        dangerouslySetInnerHTML={{ __html: suggestion.title }}
                        className={classNames.suggestionTitle}
                      />
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          )}
        </Slider>
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: navArrowStyles }} />
  </div>;

export default Suggestions;
