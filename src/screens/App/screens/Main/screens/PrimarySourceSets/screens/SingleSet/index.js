import React from "react";

import styles from "./SingleSet.css";

import BreadcrumbsModule from "../../../../../../components/BreadcrumbsModule";
import SourceSetInfo from "./components/SourceSetInfo";
import RelatedSets from "./components/RelatedSets";
import ResourcesTabs from "./components/ResourcesTabs";

const SingleSet = props =>
  <div className={styles.singleSet}>
    <BreadcrumbsModule routerProps={props} />
    <SourceSetInfo />
    <ResourcesTabs routerProps={props} />
    <RelatedSets />
  </div>;

export default SingleSet;
