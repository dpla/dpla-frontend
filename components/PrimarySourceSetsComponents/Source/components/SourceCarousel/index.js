import React from "react";
import Link from "next/link";

import CarouselSlider from "./CarouselSlider";
import extractSourceId from "/utilFunctions/extractSourceId";
import removeQueryParams from "/utilFunctions/removeQueryParams";
import { classNames, stylesheet } from "./SourceCarousel.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;
const markdownit = require("markdown-it")({ html: true });

const NavChevron = ({ type }) =>
  <svg
    className={[
      classNames.smallChevron,
      type === "previous" ? classNames.prevItemArrow : classNames.nextItemArrow
    ].join(" ")}
    width="15px"
    height="24px"
    viewBox="0 0 15 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Styles" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Artboard" transform="translate(-183.000000, -205.000000)">
        <path
          d="M201.948629,212.831277 L190.307237,224.272727 L178.598137,212.760526 C178.389045,212.55631 178.272727,212.279942 178.272727,211.991326 C178.272727,211.701341 178.389042,211.42497 178.598137,211.220767 L179.791769,210.047207 L179.791769,210.045847 C179.999478,209.841631 180.280573,209.727273 180.575507,209.727273 C180.869066,209.727273 181.150168,209.841635 181.357863,210.045847 L190.307272,218.843371 L199.187556,210.116599 C199.619606,209.691814 200.321635,209.691814 200.753685,210.116599 L201.947318,211.290159 L201.948704,211.290159 C202.156413,211.494375 202.272727,211.772103 202.272727,212.060718 C202.272727,212.349333 202.156413,212.627075 201.948704,212.831277 L201.948629,212.831277 Z"
          id="Chevron-Thick"
          transform="translate(190.272727, 217.000000) rotate(-90.000000) translate(-190.272727, -217.000000) "
        />
      </g>
    </g>
  </svg>;

const SourceCarousel = ({ sources, set, currentSourceIdx, route }) =>
  <div className={classNames.wrapper}>
    <div className={[classNames.sourceCarousel, container].join(" ")}>
      <div className={classNames.headerAndNav}>
        <h1 className={classNames.header}>
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
        </h1>
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
                  <NavChevron type="previous" />
                  <span>Previous Item</span>
                </a>
              </Link>
            : <button
                className={`${classNames.previousItemButton} ${classNames.disabledNextOrPrevButton}`}
              >
                <NavChevron type="previous" />
                <span>Previous Item</span>           {" "}
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
                  <NavChevron type="next" />
                </a>
              </Link>
            : <button
                className={`${classNames.nextItemButton} ${classNames.disabledNextOrPrevButton}`}
              >
                <NavChevron type="previous" />
                <span>Next Item</span>{" "}
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
