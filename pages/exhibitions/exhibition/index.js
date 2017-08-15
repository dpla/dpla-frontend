import React from "react";

import MainLayout from "../../../components/MainLayout";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ImageAndCaption from "../../../components/ExhibitionsComponents/Exhibition/ImageAndCaption";
import Details from "../../../components/ExhibitionsComponents/Exhibition/Details";
import mockExhibition from "../../../components/ExhibitionsComponents/Exhibition/mockExhibition";

import removeQueryParams from "/utilFunctions/removeQueryParams";

const Exhibition = props =>
  <MainLayout>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Exhibitions",
          url: {
            pathname: "/exhibitions/",
            query: removeQueryParams(props.url.query, ["exhibition"])
          }
        },
        { title: mockExhibition.title, search: "" }
      ]}
      route={props.url}
    />
    <ImageAndCaption exhibition={mockExhibition} />
    <Details exhibition={mockExhibition} />
  </MainLayout>;

export default Exhibition;
