import React from "react";

import styles from "./Source.css";

import BreadcrumbsModule from "../../../../../../components/BreadcrumbsModule";
import ContentAndMetadata from "./components/ContentAndMetadata";

const mockSource = {
  title:
    "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865.",
  img: "http://lorempixel.com/302/475/food",
  description:
    'The term "contraband" was used to describe formerly enslaved people who escaped. Many went to Union camps and supported the troops in various ways. At first glance this image seems to depict only male "contraband," but a woman appears in the center right below the second man on horseback.',
  courtesyOf:
    "Courtesy of National Portrait Gallery via Smithsonian Institution",
  copyright: "No known copyright",
  dplaRecord: "",
  itemSource: "",
  set: "Civil War and Reconstruction"
};

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
  </div>;

export default Source;
