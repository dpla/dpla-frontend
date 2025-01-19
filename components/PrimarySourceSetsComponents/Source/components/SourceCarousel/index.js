import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import Markdown from "react-markdown";

import CarouselSlider from "./CarouselSlider";
import ThickChevron from "public/static/images/chevron-thick-orange.svg";

import { extractSourceId, removeQueryParams } from "lib";

import css from "./SourceCarousel.module.scss";
import utils from "stylesheets/utils.module.scss"

const SourceCarousel = ({ sources, set, currentSourceIdx, router }) =>
  <div className={css.wrapper}>
    <div className={`${css.sourceCarousel} ${utils.container}`}>
      <div className={css.headerAndNav}>
        <h2 className={css.header}>
          <span>{`Item ${currentSourceIdx + 1} of ${sources.length}
            in the Primary Source Set `}</span>
          <Link
            as={{
              pathname: `/primary-source-sets/${router.query.set}`,
              query: removeQueryParams(router.query, ["source", "set"])
            }}
            href={{
              pathname: "/primary-source-sets/set/",
              query: Object.assign(
                {},
                removeQueryParams(router.query, ["source"])
              )
            }}
            className={`${utils.link} ${css.linkToSourceSet}`}
          >
              <Markdown
                allowedElements={["emphasis", "text"]}
                unwrapDisallowed>{set.name}</Markdown>
          </Link>
        </h2>
        <div className={css.prevAndNextButtons}>
          {currentSourceIdx > 0
            ? <Link
                as={{
                  pathname: `/primary-source-sets/${router.query
                    .set}/sources/${extractSourceId(
                    sources[currentSourceIdx - 1]["@id"]
                  )}`,
                  query: removeQueryParams(router.query, ["source", "set"])
                }}
                href={{
                  pathname: "/primary-source-sets/set/sources",
                  query: Object.assign({}, router.query, {
                    source: extractSourceId(
                      sources[currentSourceIdx - 1]["@id"]
                    )
                  })
                }}
                className={`${css.previousItemButton} ${utils.hoverUnderline}`}
              >
                  <ThickChevron
                    className={`${css.thickChevron} ${css.flippedH}`}
                  />
                  <span>Previous Item</span>
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
                  pathname: `/primary-source-sets/${router.query
                    .set}/sources/${extractSourceId(
                    sources[currentSourceIdx + 1]["@id"]
                  )}`,
                  query: removeQueryParams(router.query, ["source", "set"])
                }}
                href={{
                  pathname: `/primary-source-sets/set/sources`,
                  query: Object.assign({}, router.query, {
                    source: extractSourceId(
                      sources[currentSourceIdx + 1]["@id"]
                    )
                  })
                }}
                className={`${css.nextItemButton} ${utils.hoverUnderline}`}
              >
                  <span>Next Item</span>
                  <ThickChevron className={css.thickChevron} />
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
      />
    </div>
  </div>;

export default withRouter(SourceCarousel);
