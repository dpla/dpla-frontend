import React from "react";
import Link from "next/link";

import CarouselSlider from "./CarouselSlider";
import ThickChevron from "../../../../../static/images/chevron-thick-orange.svg";

import extractSourceId from "utilFunctions/extractSourceId";
import removeQueryParams from "utilFunctions/removeQueryParams";

import { classNames, stylesheet } from "./SourceCarousel.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;
const markdownit = require("markdown-it")({ html: true });
const thickChevron = "/static/images/chevron-thick-orange.svg";

const SourceCarousel = ({ sources, set, currentSourceIdx, route }) =>
  <div className={classNames.wrapper}>
    <div className={[classNames.sourceCarousel, container].join(" ")}>
      <div className={classNames.headerAndNav}>
        <h2 className={classNames.header}>
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
              className={`link ${classNames.linkToSourceSet}`}
            />
          </Link>
        </h2>
        <div className={classNames.prevAndNextButtons}>
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
                <a
                  className={`${classNames.previousItemButton} hover-underline`}
                >
                  <ThickChevron
                    className={`${classNames.thickChevron} ${classNames.flippedH}`}
                  />
                  <span>Previous Item</span>
                </a>
              </Link>
            : <button
                className={`${classNames.previousItemButton} ${classNames.disabledNextOrPrevButton}`}
              >
                <ThickChevron
                  className={`${classNames.thickChevron} ${classNames.flippedH}`}
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
                <a className={`${classNames.nextItemButton} hover-underline`}>
                  <span>Next Item</span>
                  <ThickChevron className={classNames.thickChevron} />
                </a>
              </Link>
            : <button
                className={`${classNames.nextItemButton} ${classNames.disabledNextOrPrevButton}`}
              >
                <span>Next Item</span>
                <ThickChevron className={classNames.thickChevron} />
              </button>}
        </div>
      </div>
      <CarouselSlider
        currentSourceIdx={currentSourceIdx}
        sources={sources}
        route={route}
      />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SourceCarousel;
