import React from "react";
import Link from "next/link";
import { markdown } from "markdown";

import CarouselSlider from "./CarouselSlider";
import extractSourceId from "/utilFunctions/extractSourceId";
import removeQueryParams from "/utilFunctions/removeQueryParams";
import { classNames, stylesheet } from "./SourceCarousel.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const smallChevron = "/static/images/chevron-thick-orange.svg";

const SourceCarousel = ({ sources, set, currentSourceIdx, route }) =>
  <div className={classNames.wrapper}>
    <div className={[classNames.sourceCarousel, module].join(" ")}>
      <div className={classNames.headerAndNav}>
        <h1 className={classNames.header}>
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
            <a
              dangerouslySetInnerHTML={{ __html: markdown.toHTML(set.name) }}
              className={classNames.linkToSourceSet}
            />
          </Link>
        </h1>
        <div className={classNames.prevAndNextArrows}>
          {currentSourceIdx > 0 &&
            <Link
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
                  source: extractSourceId(sources[currentSourceIdx - 1]["@id"])
                })
              }}
            >
              <a className={classNames.nextOrPrevItemArrow}>
                <img
                  alt="previous item"
                  className={[
                    classNames.smallChevron,
                    classNames.prevItemArrow
                  ].join(" ")}
                  src={smallChevron}
                />
                <span>Previous Item</span>
              </a>
            </Link>}
          {currentSourceIdx < sources.length - 1 &&
            <Link
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
                  source: extractSourceId(sources[currentSourceIdx + 1]["@id"])
                })
              }}
            >
              <a className={classNames.nextOrPrevItemArrow}>
                <span>Next Item</span>
                <img
                  alt="next item"
                  className={classNames.smallChevron}
                  src={smallChevron}
                />
              </a>
            </Link>}
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
