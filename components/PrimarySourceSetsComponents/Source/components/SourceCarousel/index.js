import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Markdown from "react-markdown";

import CarouselSlider from "./CarouselSlider";
import ChevronThickOrange from "components/svg/ChevronThickOrange";

import { extractSourceId, removeQueryParams } from "lib";

import css from "./SourceCarousel.module.scss";
import utils from "stylesheets/utils.module.scss";

function SourceCarousel({ sources, set, currentSourceIdx }) {
  const router = useRouter();
  return (
    <div className={css.wrapper}>
      <div className={`${css.sourceCarousel} ${utils.container}`}>
        <div className={css.headerAndNav}>
          <h2 className={css.header}>
            <span>{`Item ${currentSourceIdx + 1} of ${sources.length}
            in the Primary Source Set `}</span>
            <Link
              href={{
                pathname: `/primary-source-sets/${router.query.set}`,
                query: Object.assign(
                  {},
                  removeQueryParams(router.query, ["source"]),
                ),
              }}
              className={`${utils.link} ${css.linkToSourceSet}`}
            >
              <Markdown allowedElements={["emphasis", "text"]} unwrapDisallowed>
                {set.name}
              </Markdown>
            </Link>
          </h2>
          <div className={css.prevAndNextButtons}>
            {currentSourceIdx > 0 ? (
              <Link
                href={{
                  pathname: `/primary-source-sets/${
                    router.query.set
                  }/sources/${extractSourceId(
                    sources[currentSourceIdx - 1]["@id"],
                  )}`,
                }}
                className={`${css.previousItemButton} ${utils.hoverUnderline}`}
              >
                {/*<Image src={thickChevron} width="15" height="24" alt="" className={`${css.thickChevron} ${css.flippedH}`} />*/}
                <ChevronThickOrange
                  className={`${css.thickChevron} ${css.flippedH}`}
                />
                <span>Previous Item</span>
              </Link>
            ) : (
              <button
                className={`${css.previousItemButton} ${css.disabledNextOrPrevButton}`}
              >
                <ChevronThickOrange
                  className={`${css.thickChevron} ${css.flippedH}`}
                />
                <span>Previous Item</span>
              </button>
            )}
            {currentSourceIdx < sources.length - 1 ? (
              <Link
                href={{
                  pathname: `/primary-source-sets/${
                    router.query.set
                  }/sources/${extractSourceId(
                    sources[currentSourceIdx + 1]["@id"],
                  )}`,
                }}
                className={`${css.nextItemButton} ${utils.hoverUnderline}`}
              >
                <span>Next Item</span>
                <ChevronThickOrange className={css.thickChevron} />
              </Link>
            ) : (
              <button
                className={`${css.nextItemButton} ${css.disabledNextOrPrevButton}`}
              >
                <span>Next Item</span>
                <ChevronThickOrange className={css.thickChevron} />
              </button>
            )}
          </div>
        </div>
        <CarouselSlider currentSourceIdx={currentSourceIdx} sources={sources} />
      </div>
    </div>
  );
}

export default SourceCarousel;
