import React from "react";
import Link from "next/link";

import CarouselSlider from "./CarouselSlider";
import ThickChevron from "../../../../../static/images/chevron-thick-orange.svg";

import { extractSourceId, removeQueryParams } from "utilFunctions";

import utils from "stylesheets/utils.scss";
import css from "./SourceCarousel.scss";

const markdownit = require("markdown-it")({ html: true });

const thickChevron = "/static/images/chevron-thick-orange.svg";

const SourceCarousel = ({ sources, set, currentSourceIdx, route }) =>
  <div className={css.wrapper}>
    <div className={[css.sourceCarousel, utils.container].join(" ")}>
      <div className={css.headerAndNav}>
        <h2 className={css.header}>
          <span>{`Item ${currentSourceIdx + 1} of ${sources.length}
            in the Primary Source Set `}</span>
          <Link
            prefetch
            as={{
              pathname: `/primary-source-sets/${route.query.set}`,
              query: removeQueryParams(route.query, ["source", "set"])
            }}
            href={{
              pathname: "/primary-source-sets/set/",
              query: Object.assign(
                {},
                removeQueryParams(route.query, ["source"])
              )
            }}
          >
            <a
              dangerouslySetInnerHTML={{
                __html: markdownit.renderInline(set.name)
              }}
              className={`link ${css.linkToSourceSet}`}
            />
          </Link>
        </h2>
        <div className={css.prevAndNextButtons}>
          {currentSourceIdx > 0
            ? <Link
                prefetch
                as={{
                  pathname: `/primary-source-sets/${route.query
                    .set}/sources/${extractSourceId(
                    sources[currentSourceIdx - 1]["@id"]
                  )}`,
                  query: removeQueryParams(route.query, ["source", "set"])
                }}
                href={{
                  pathname: `/primary-source-sets/set/sources`,
                  query: Object.assign({}, route.query, {
                    source: extractSourceId(
                      sources[currentSourceIdx - 1]["@id"]
                    )
                  })
                }}
              >
                <a className={`${css.previousItemButton} hover-underline`}>
                  <ThickChevron
                    className={`${css.thickChevron} ${css.flippedH}`}
                  />
                  <span>Previous Item</span>
                </a>
              </Link>
            : <button
                className={`${css.previousItemButton} ${css.disabledNextOrPrevButton}`}
              >
                <ThickChevron
                  className={`${css.thickChevron} ${css.flippedH}`}
                />
                <span>Previous Item</span>
              </button>}
          {currentSourceIdx < sources.length - 1
            ? <Link
                prefetch
                as={{
                  pathname: `/primary-source-sets/${route.query
                    .set}/sources/${extractSourceId(
                    sources[currentSourceIdx + 1]["@id"]
                  )}`,
                  query: removeQueryParams(route.query, ["source", "set"])
                }}
                href={{
                  pathname: `/primary-source-sets/set/sources`,
                  query: Object.assign({}, route.query, {
                    source: extractSourceId(
                      sources[currentSourceIdx + 1]["@id"]
                    )
                  })
                }}
              >
                <a className={`${css.nextItemButton} hover-underline`}>
                  <span>Next Item</span>
                  <ThickChevron className={css.thickChevron} />
                </a>
              </Link>
            : <button
                className={`${css.nextItemButton} ${css.disabledNextOrPrevButton}`}
              >
                <span>Next Item</span>
                <ThickChevron className={css.thickChevron} />
              </button>}
        </div>
      </div>
      <CarouselSlider
        currentSourceIdx={currentSourceIdx}
        sources={sources}
        route={route}
      />
    </div>
  </div>;

export default SourceCarousel;
