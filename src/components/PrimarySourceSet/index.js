import React from "react";

import styles from "./PrimarySourceSet.css";

import BreadcrumbsModule from "../BreadcrumbsModule";
import SourceSetInfo from "./modules/SourceSetInfo";
import RelatedSets from "./modules/RelatedSets";
import ResourcesTabs from "./modules/ResourcesTabs";

const PrimarySourceSet = props =>
  <div className={styles.primarySourceSet}>
    <BreadcrumbsModule />
    <SourceSetInfo />
    <ResourcesTabs routerProps={props} />
    <RelatedSets />
  </div>;

export default PrimarySourceSet;
