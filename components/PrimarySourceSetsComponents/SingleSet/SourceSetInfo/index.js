import React from "react";
import { markdown } from "markdown";

import { stylesheet, classNames } from "./SourceSetInfo.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const heart = "/static/images/heart.svg";

// only the time period has a sameAs field
const extractTimePeriod = tags => tags.filter(tag => tag.sameAs)[0].name;
const extractSubjects = tags =>
  tags.filter(tag => !tag.sameAs).map(tag => tag.name).join(", ");

const SourceSetInfo = set =>
  <div className={classNames.wrapper}>
    <div className={[classNames.sourceSetInfo, module].join(" ")}>
      <div className={classNames.bannerAndDescription}>
        <div className={classNames.banner}>
          {/* TODO: this shouldn't use backgroundImage */}
          <div
            className={classNames.bannerImage}
            style={{
              backgroundImage: `url(${set.set.thumbnailUrl})`
            }}
          />
          <div className={classNames.bannerTextWrapper}>
            <h3 className={classNames.bannerResourceType}>
              Primary Source Set
            </h3>
            <h1
              dangerouslySetInnerHTML={{
                __html: markdown.toHTML(set.set.name)
              }}
              className={classNames.bannerTitle}
            />
          </div>
        </div>
        {/* TODO: shouldn't have to get rid of the extra text with split */}
        <div
          className={classNames.description}
          dangerouslySetInnerHTML={{
            __html: markdown.toHTML(set.set.text.split("1. [")[0])
          }}
        />
      </div>
      <div className={classNames.sidebar}>
        <div className={classNames.metadata}>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Prepared By</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: markdown.toHTML(set.set.author[0].name)
              }}
            />
          </div>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Time Period</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: markdown.toHTML(extractTimePeriod(set.set.about))
              }}
            />
          </div>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Subjects</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: markdown.toHTML(extractSubjects(set.set.about))
              }}
            />
          </div>
        </div>
        <button
          className={[classNames.favoritesButton, classNames.button].join(" ")}
        >
          <img alt="" src={heart} className={classNames.heart} />
          <span>Add to favorites</span>
        </button>
        <button
          className={[classNames.citeButton, classNames.button].join(" ")}
        >
          Cite this set
        </button>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default SourceSetInfo;
