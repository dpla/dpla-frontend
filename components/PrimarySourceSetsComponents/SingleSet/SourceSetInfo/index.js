import React from "react";

import { stylesheet, classNames } from "./SourceSetInfo.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const heart = "/static/images/heart.svg";

const SourceSetInfo = () =>
  <div className={classNames.wrapper}>
    <div className={[classNames.sourceSetInfo, module].join(" ")}>
      <div className={classNames.bannerAndDescription}>
        <div className={classNames.banner}>
          <div
            className={classNames.bannerImage}
            style={{
              backgroundImage: "url(http://lorempixel.com/400/200/food)"
            }}
          />
          <div className={classNames.bannerTextWrapper}>
            <h3 className={classNames.bannerResourceType}>
              Primary Source Set
            </h3>
            <h1 className={classNames.bannerTitle}>Women in the Civil War</h1>
          </div>
        </div>
        <p className={classNames.description}>
          The American Civil War brought women new responsibilities on the
          battlefield and at home. Many became providers for their families,
          managing farms and businesses while male relatives served in the
          military. Many also contributed to the Union or Confederacy. Some
          raised money and supplies through ladies’ aid and soldiers’ aid
          societies as well as the US Sanitary Commission, a private agency that
          operated across the North and became critical to the Union victory.
          Others nursed soldiers (Louisa May Alcott, author of the beloved novel
          Little Women, worked as an army nurse), spied on the enemy, cooked and
          laundered for enlisted men, and served as uniformed battlefield…
        </p>
      </div>
      <div className={classNames.sidebar}>
        <div className={classNames.metadata}>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Prepared By</h3>
            <p>
              Melissa Strong, Community College of Philadelphia, Philadelphia,
              Pennsylvania
            </p>
          </div>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Time Period</h3>
            <p>Civil War and Reconstruction (1850-1877)</p>
          </div>
          <div className={classNames.metadatum}>
            <h3 className={classNames.metadataHeader}>Subjects</h3>
            <p>U.S. History, Women</p>
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
