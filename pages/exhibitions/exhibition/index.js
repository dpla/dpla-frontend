import React from "react";

import MainLayout from "../../../components/MainLayout";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ImageAndCaption from "../../../components/ExhibitionsComponents/Exhibition/ImageAndCaption";
import Details from "../../../components/ExhibitionsComponents/Exhibition/Details";
import mockExhibition from "../../../components/ExhibitionsComponents/Exhibition/mockExhibition";
import {
  EXHIBITS_ENDPOINT,
  EXHIBIT_PAGES_ENDPOINT,
  FILES_ENDPOINT
} from "constants/exhibitions";

import removeQueryParams from "/utilFunctions/removeQueryParams";

const Exhibition = ({ url, exhibition }) =>
  <MainLayout route={url}>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Exhibitions",
          url: {
            pathname: "/exhibitions/",
            query: removeQueryParams(url.query, ["exhibition"])
          }
        },
        { title: exhibition.title, search: "" }
      ]}
      route={url}
    />
    <ImageAndCaption exhibition={exhibition} />
    <Details exhibition={exhibition} />
  </MainLayout>;

Exhibition.getInitialProps = async ({ query }) => {
  const { exhibition: exhibitionSlug } = query;
  const exhibitionsRes = await fetch(EXHIBITS_ENDPOINT);
  const exhibitionsJson = await exhibitionsRes.json();
  const exhibition = exhibitionsJson.find(
    exhibition => exhibition.slug === exhibitionSlug
  );

  const exhibitPageRes = await fetch(
    `${EXHIBIT_PAGES_ENDPOINT}?exhibit=${exhibition.id}`
  );
  const exhibitJson = await exhibitPageRes.json();

  const homePage = exhibitJson.find(exhibit => exhibit.slug === "home-page");
  const { text } = homePage.page_blocks[0];
  const { item, caption } = homePage.page_blocks[0].attachments[0];

  const filesRes = await fetch(`${FILES_ENDPOINT}?item=${item.id}`);
  const filesJson = await filesRes.json();

  const thumbnailUrl = filesJson[0].file_urls.fullsize;
  return {
    exhibition: Object.assign({}, exhibition, { thumbnailUrl, caption, text })
  };
};

export default Exhibition;
