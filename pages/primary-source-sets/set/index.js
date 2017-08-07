import React from "react";

import MainLayout from "../../../components/MainLayout";
import PSSFooter from "../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import RelatedSets from "../../../components/PrimarySourceSetsComponents/SingleSet/RelatedSets";
import ResourcesTabs from "../../../components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import SourceSetSources from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetSources";

const mockSet = {
  title: "Civil War and Reconstruction",
  slug: "civil-war-and-reconstruction"
};

const SingleSet = props =>
  <MainLayout>
    <BreadcrumbsModule
      breadcrumbs={[
        { title: "Primary Source Sets", url: "/primary-source-sets" },
        { title: mockSet.title, search: "" }
      ]}
      route={props.url}
    />
    <SourceSetInfo />
    <ResourcesTabs route={props.url} currentTab="sourceSet" set={mockSet}>
      <SourceSetSources route={props.url} />
    </ResourcesTabs>
    <RelatedSets />
    <PSSFooter />
  </MainLayout>;

export default SingleSet;
