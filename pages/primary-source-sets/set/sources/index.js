import React from "react";

import MainLayout from "../../../../components/MainLayout";
import PSSFooter from "../../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ContentAndMetadata from "../../../../components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata";
import SourceCarousel from "../../../../components/PrimarySourceSetsComponents/Source/components/SourceCarousel";

import mockSource from "../../../../components/PrimarySourceSetsComponents/Source/mockSource";
import mockSources from "../../../../components/PrimarySourceSetsComponents/SingleSet/mockSources";

// const getSourceSetURL = url => /(\/[\w-]+\/[\w-]+)\/sources/.exec(url)[1];

const Source = props =>
  <MainLayout>
    <BreadcrumbsModule
      breadcrumbs={[
        { title: "Primary Source Sets", url: "/primary-source-sets" },
        {
          title: mockSource.set,
          as: `/primary-source-sets/${mockSource.slug}`,
          url: `/primary-source-sets/set/?set=${mockSource.slug}`
        },
        { title: mockSource.title, url: "" }
      ]}
      routerProps={props}
    />
    <ContentAndMetadata source={mockSource} />
    <SourceCarousel sources={mockSources} />
    <PSSFooter />
  </MainLayout>;

export default Source;
