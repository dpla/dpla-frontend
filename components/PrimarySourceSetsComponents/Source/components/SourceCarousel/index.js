import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import CarouselSlider from "./CarouselSlider";
import ThickChevron from "public/static/images/chevron-thick-orange.svg";

import { extractSourceId, removeQueryParams } from "lib";

import css from "./SourceCarousel.module.scss";
import utils from "stylesheets/utils.module.scss"

const SourceCarousel = ({ sources, set, currentSourceIdx, route }) =>
  <div className={css.wrapper}>
    <div className={`${css.sourceCarousel} ${utils.container}`}>
      <div className={css.headerAndNav}>
        <h2 className={css.header}>
          <span>{`Item ${currentSourceIdx + 1} of ${sources.length}
            in the Primary Source Set `}</span>
          <Link
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
            <a className={`${utils.link} ${css.linkToSourceSet}`}>
              <ReactMarkdown
                source={set.name}
                allowedTypes={["emphasis", "text"]}
                unwrapDisallowed
              />
            </a>
          </Link>
        </h2>
        <div className={css.prevAndNextButtons}>
          {currentSourceIdx > 0
            ? <Link
                as={{
                  pathname: `/primary-source-sets/${route.query
                    .set}/sources/${extractSourceId(
                    sources[currentSourceIdx - 1]["@id"]
                  )}`,
                  query: removeQueryParams(route.query, ["source", "set"])
                }}
                href={{
                  pathname: "/primary-source-sets/set/sources",
                  query: Object.assign({}, route.query, {
                    source: extractSourceId(
                      sources[currentSourceIdx - 1]["@id"]
                    )
                  })
                }}
              >
                <a className={`${css.previousItemButton} ${utils.hoverUnderline}`}>
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
                <a className={`${css.nextItemButton} ${utils.hoverUnderline}`}>
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
