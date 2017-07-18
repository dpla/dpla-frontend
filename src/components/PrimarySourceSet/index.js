import React from "react";

import styles from "./PrimarySourceSet.css";

import BreadcrumbsModule from "../BreadcrumbsModule";
import SourceSetInfo from "./modules/SourceSetInfo";
import RelatedSets from "./modules/RelatedSets";

const PrimarySourceSet = () =>
  <div className={styles.primarySourceSet}>
    <BreadcrumbsModule />
    <SourceSetInfo />
    <RelatedSets />
  </div>;

export default PrimarySourceSet;
