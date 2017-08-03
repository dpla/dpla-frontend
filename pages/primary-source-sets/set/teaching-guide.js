import React from "react";

import MainLayout from "../../../components/MainLayout";
import PSSFooter from "../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import RelatedSets from "../../../components/PrimarySourceSetsComponents/SingleSet/RelatedSets";
import ResourcesTabs from "../../../components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import TeachersGuide from "../../../components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

const mockSet = { title: "Civil War and Reconstruction" };

const SingleSet = props =>
  <MainLayout>
    <BreadcrumbsModule
      breadcrumbs={[
        { title: "Primary Source Sets", url: "/primary-source-sets" },
        {
          title: mockSet.title,
          url: "",
          search: ""
        }
      ]}
      routerProps={props}
      showStudentMode={true}
    />
    <SourceSetInfo />
    <ResourcesTabs>
      <TeachersGuide />
    </ResourcesTabs>
    <RelatedSets />
    <PSSFooter />
  </MainLayout>;

export default SingleSet;
