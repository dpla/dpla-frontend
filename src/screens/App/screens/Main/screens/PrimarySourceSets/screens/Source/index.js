import React from "react";

import styles from "./Source.css";

import BreadcrumbsModule from "../../../../../../components/BreadcrumbsModule";
import ContentAndMetadata from "./components/ContentAndMetadata";

const Source = props =>
  <div className={styles.source}>
    <BreadcrumbsModule routerProps={props} />
    <ContentAndMetadata />
  </div>;

export default Source;
