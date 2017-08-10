import React from "react";

import MainLayout from "../../../components/MainLayout";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ImageAndCaption from "../../../components/ExhibitionsComponents/Exhibition/ImageAndCaption";

import removeQueryParams from "/utilFunctions/removeQueryParams";

const mockExhibition = {
  title: "Civil War and Reconstruction",
  slug: "civil-war-and-reconstruction",
  image: "http://lorempixel.com/1024/518/food",
  caption:
    "Astronaut Buzz Aldrin, the second man, after Neil Armstrong, to step foot on the Moon, July 20, 1969. Courtesy of the National Archives and Records Administration."
};

const SingleSet = props =>
  <MainLayout>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Exhibitions",
          url: {
            pathname: "/exhibitions/",
            query: removeQueryParams(props.url.query)
          }
        },
        { title: mockExhibition.title, search: "" }
      ]}
      route={props.url}
    />
    <ImageAndCaption exhibition={mockExhibition} />
  </MainLayout>;

export default SingleSet;
