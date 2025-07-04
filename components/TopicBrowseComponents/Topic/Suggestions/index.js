import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import Markdown from "react-markdown";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";

import css from "./Suggestions.module.scss";
import utils from "stylesheets/utils.module.scss";

function mapTypeToClass(type) {
  if (type === "Exhibition") {
    return css.exhibition;
  } else if (type === "Topic") {
    return css.topic;
  } else if (type === "Primary Source Set") {
    return css.topic;
  }
}

function Suggestions({ suggestions }) {
  return (
    <div className={css.suggestionsWrapper}>
      <div className={`${css.suggestions} ${utils.container}`}>
        <h2 className={css.header}>You might also enjoy</h2>
        {/* this is a little hacky but <Slider /> seems to throw away
        any class names you pass it as props, so we use this global css
        class to target the arrows */}
        <div>
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
                  slidesToScroll: 1,
                  variableWidth: false,
                },
              },
            ]}
          >
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.title}
                className={[
                  css.suggestedSlide,
                  css.suggestedItem,
                  mapTypeToClass(suggestion.type),
                ].join(" ")}
              >
                <Link
                  href={suggestion.href}
                  className={css.imageWrapper}
                  style={{
                    backgroundImage: `url(${suggestion.thumbnailUrl})`,
                  }}
                >
                  <div className={css.gradientBackground}>
                    <div className={css.typeAndTitle}>
                      <p className={css.resourceType}>{suggestion.type}</p>
                      <Markdown
                        className={css.suggestionTitle}
                        allowedElements={["emphasis", "text"]}
                        unwrapDisallowed
                      >
                        {suggestion.title}
                      </Markdown>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
