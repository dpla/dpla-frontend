import React from "react";
import { Link } from "react-router-dom";

import styles from "./SourceSetInfo.css";
import { module } from "../../../../utils.css";
import heart from "../../../../images/heart.svg";

const SourceSetInfo = ({ breadcrumbs }) =>
  <div className={styles.wrapper}>
    <div className={[styles.sourceSetInfo, module].join(" ")}>
      <div className={styles.bannerAndDescription}>
        <div className={styles.banner}>
          <div
            className={styles.bannerImage}
            style={{ backgroundImage: "url(http://lorempixel.com/400/200/)" }}
          />
          <div className={styles.bannerTextWrapper}>
            <h3 className={styles.bannerResourceType}>Primary Source Set</h3>
            <h1 className={styles.bannerTitle}>Women in the Civil War</h1>
          </div>
        </div>
        <p className={styles.description}>
          The American Civil War brought women new responsibilities on the
          battlefield and at home. Many became providers for their families,
          managing farms and businesses while male relatives served in the
          military. Many also contributed to the Union or Confederacy. Some
          raised money and supplies through ladies’ aid and soldiers’ aid
          societies as well as the US Sanitary Commission, a private agency
          that operated across the North and became critical to the Union
          victory. Others nursed soldiers (Louisa May Alcott, author of the
          beloved novel Little Women, worked as an army nurse), spied on the
          enemy, cooked and laundered for enlisted men, and served as uniformed
          battlefield…
        </p>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.metadata}>
          <div className={styles.metadatum}>
            <h3 className={styles.metadataHeader}>Prepared By</h3>
            <p>
              Melissa Strong, Community College of Philadelphia, Philadelphia,
              Pennsylvania
            </p>
          </div>
          <div className={styles.metadatum}>
            <h3 className={styles.metadataHeader}>Time Period</h3>
            <p>Civil War and Reconstruction (1850-1877)</p>
          </div>
          <div className={styles.metadatum}>
            <h3 className={styles.metadataHeader}>Subjects</h3>
            <p>U.S. History, Women</p>
          </div>
        </div>
        <button className={[styles.favoritesButton, styles.button].join(" ")}>
          <img alt="" src={heart} className={styles.heart} />
          <span>Add to favorites</span>
        </button>
        <button className={[styles.citeButton, styles.button].join(" ")}>
          Cite this set
        </button>
      </div>
    </div>
  </div>;

export default SourceSetInfo;
