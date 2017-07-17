import React from "react";

import styles from "./PrimarySourceSet.css";

import BreadcrumbsModule from "../BreadcrumbsModule";
import SourceSetInfo from "./modules/SourceSetInfo";

const PrimarySourceSet = () =>
  <div className={styles.primarySourceSet}>
    <BreadcrumbsModule />
    <SourceSetInfo />
  </div>;

export default PrimarySourceSet;
