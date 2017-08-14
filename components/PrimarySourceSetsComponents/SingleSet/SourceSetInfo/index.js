import React from "react";

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
            <h1 className={classNames.bannerTitle}>{set.set.name}</h1>
          </div>
        </div>
        <p className={classNames.description}>
          {set.set.text}
        </p>
      </div>
      <div className={classNames.sidebar}>
        <div className={classNames.metadata}>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Prepared By</h3>
            <p>
              {set.set.author[0].name}
            </p>
          </div>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Time Period</h3>
            <p>{extractTimePeriod(set.set.about)}</p>
          </div>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Subjects</h3>
            <p>{extractSubjects(set.set.about)}</p>
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
