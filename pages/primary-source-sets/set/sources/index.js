import React from "react";

import MainLayout from "../../../../components/MainLayout";
import PSSFooter from "../../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ContentAndMetadata from "../../../../components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata";
import SourceCarousel from "../../../../components/PrimarySourceSetsComponents/Source/components/SourceCarousel";

import removeQueryParams from "utilFunctions/removeQueryParams";

import mockSource from "../../../../components/PrimarySourceSetsComponents/Source/mockSource";
import mockSources from "../../../../components/PrimarySourceSetsComponents/SingleSet/mockSources";

// const getSourceSetURL = url => /(\/[\w-]+\/[\w-]+)\/sources/.exec(url)[1];

const Source = ({ url }) =>
  <MainLayout>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Primary Source Sets",
          url: {
            pathname: "/primary-source-sets",
            query: removeQueryParams(url.query, ["set", "source"])
          }
        },
        {
          title: mockSource.set,
          as: {
            pathname: `/primary-source-sets/${mockSource.slug}`,
            query: removeQueryParams(url.query, ["set", "source"])
          },
          url: {
            pathname: "/primary-source-sets/set/",
            query: Object.assign({}, url.query, { set: mockSource.slug })
          }
        },
        { title: mockSource.title, url: "" }
      ]}
      route={url}
    />
    <ContentAndMetadata source={mockSource} />
    <SourceCarousel sources={mockSources} />
    <PSSFooter />
  </MainLayout>;

export default Source;
