import React from "react";

import styles from "./SingleSet.css";

import BreadcrumbsModule from "../../components/BreadcrumbsModule";
import SourceSetInfo from "./components/SourceSetInfo";
import RelatedSets from "./components/RelatedSets";
import ResourcesTabs from "./components/ResourcesTabs";

const mockSet = { title: "Civil War and Reconstruction" };

const SingleSet = props =>
  <div className={styles.singleSet}>
    <BreadcrumbsModule
      breadcrumbs={[
        { title: "Primary Source Sets", url: "/primary-source-sets" },
        {
          title: mockSet.title,
          url: props.match.url,
          search: props.location.search
        }
      ]}
      routerProps={props}
      showStudentMode={true}
    />
    <SourceSetInfo />
    <ResourcesTabs routerProps={props} />
    <RelatedSets />
  </div>;

export default SingleSet;
