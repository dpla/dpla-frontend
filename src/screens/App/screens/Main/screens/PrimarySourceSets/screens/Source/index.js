import React from "react";

import styles from "./Source.css";

import BreadcrumbsModule from "../../../../../../components/BreadcrumbsModule";
import ContentAndMetadata from "./components/ContentAndMetadata";
import SourceCarousel from "./components/SourceCarousel";
import mockSource from "./mockSource";

const getSourceSetURL = url => /(\/[\w-]+\/[\w-]+)\/sources/.exec(url)[1];

const Source = props =>
  <div className={styles.source}>
    <BreadcrumbsModule
      breadcrumbs={[
        { title: "Primary Source Sets", url: "/primary-source-sets" },
        { title: mockSource.set, url: getSourceSetURL(props.match.url) },
        { title: mockSource.title, url: getSourceSetURL(props.match.url) }
      ]}
      routerProps={props}
    />
    <ContentAndMetadata source={mockSource} />
    <SourceCarousel />
  </div>;

export default Source;
