import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../components/MainLayout";
import HomeHero from "../components/HomePageComponents/HomeHero";
import HomePageSlider from "../components/HomePageComponents/HomePageSlider";
import DPLAUsers from "../components/HomePageComponents/DPLAUsers";
// import SocialMedia from "../components/HomePageComponents/SocialMedia";
import FromTheBlog from "../components/HomePageComponents/FromTheBlog";
import extractSourceSetSlug from "utilFunctions/extractSourceSetSlug";
import { NUM_HOMEPAGE_EXHIBITIONS } from "constants/home";
import {
  EXHIBITS_ENDPOINT,
  EXHIBIT_PAGES_ENDPOINT,
  FILES_ENDPOINT
} from "constants/exhibitions";

const Home = ({ sourceSets, exhibitions }) =>
  <MainLayout hideSearchBar>
    <HomeHero />
    <HomePageSlider
      items={exhibitions}
      title="Online Exhibitions"
      browseLinkUrl="/exhibitions"
      browseLinkName="Exhibitions"
    />
    <HomePageSlider
      items={sourceSets}
      title="Primary Source Sets"
      browseLinkUrl="/primary-source-sets"
      browseLinkName="Sets"
      slidesToShow={4}
      theme="blue"
    />
    <DPLAUsers />
    <FromTheBlog />
    {/* <SocialMedia /> */}
  </MainLayout>;

Home.getInitialProps = async () => {
  const pssRes = await fetch(`https://dp.la/primary-source-sets/sets.json`);

  const pssJson = await pssRes.json();

  const exhibitsRes = await fetch(EXHIBITS_ENDPOINT);

  const exhibitsJson = await exhibitsRes.json();
  const exhibitions = await Promise.all(
    exhibitsJson.slice(0, NUM_HOMEPAGE_EXHIBITIONS).map(async exhibit => {
      const exhibitPageRes = await fetch(
        `${EXHIBIT_PAGES_ENDPOINT}?exhibit=${exhibit.id}`
      );
      const exhibitJson = await exhibitPageRes.json();

      const itemId = exhibitJson.find(
        exhibit =>
          exhibit.slug === "home-page" ||
          exhibit.slug === "homepage" ||
          exhibit.order === 0
      ).page_blocks[0].attachments[0].item.id;
      const filesRes = await fetch(`${FILES_ENDPOINT}?item=${itemId}`);
      const filesJson = await filesRes.json();

      const thumbnailUrl = filesJson[0].file_urls.fullsize;
      return Object.assign({}, exhibit, {
        thumbnailUrl,
        name: exhibit.title,
        isFeatured: exhibit.featured,
        id: exhibit.slug
      });
    })
  );

  return {
    sourceSets: pssJson.itemListElement.slice(0, 8).map(set =>
      Object.assign({}, set, {
        href: `/primary-source-sets/set?set=${extractSourceSetSlug(
          set["@id"]
        )}`,
        as: `/primary-source-sets/${extractSourceSetSlug(set["@id"])}`
      })
    ),
    exhibitions: exhibitions
      .slice(0, NUM_HOMEPAGE_EXHIBITIONS)
      .map(exhibition =>
        Object.assign({}, exhibition, {
          href: `/exhibitions/exhibition?exhibition=${exhibition.slug}`,
          as: `/exhibitions/${exhibition.slug}`
        })
      )
  };
};

export default Home;
