import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../components/MainLayout";
import HomeHero from "../components/HomePageComponents/HomeHero";
import HomePageSlider from "../components/HomePageComponents/HomePageSlider";
import DPLAUsers from "../components/HomePageComponents/DPLAUsers";
// import SocialMedia from "../components/HomePageComponents/SocialMedia";
import FromTheBlog from "../components/HomePageComponents/FromTheBlog";
import {
  getCurrentUrl,
  extractSourceSetSlug,
  addCommasToNumber
} from "utilFunctions";
import {
  DPLA_HOMEPAGE_ENDPOINT,
  HEADER_DESCRIPTION_TOKEN
} from "constants/home";
import { API_ENDPOINT as ITEMS_API_ENDPOINT } from "constants/items";
import {
  EXHIBITS_ENDPOINT,
  EXHIBIT_PAGES_ENDPOINT,
  FILES_ENDPOINT
} from "constants/exhibitions";
import { GUIDES_ENDPOINT, ABOUT_MENU_ENDPOINT } from "constants/content-pages";

const Home = ({ sourceSets, exhibitions, guides, headerDescription }) =>
  <MainLayout hideSearchBar>
    <HomeHero headerDescription={headerDescription} />
    {exhibitions &&
      exhibitions.length > 0 &&
      <HomePageSlider
        items={exhibitions}
        title="Online Exhibitions"
        browseLinkUrl="/exhibitions"
        browseLinkName="Exhibitions"
      />}
    {sourceSets &&
      sourceSets.length > 0 &&
      <HomePageSlider
        items={sourceSets}
        title="Primary Source Sets"
        browseLinkUrl="/primary-source-sets"
        browseLinkName="Sets"
        slidesToShow={4}
        theme="blue"
      />}
    <DPLAUsers guides={guides} />
    <FromTheBlog />
    {/* <SocialMedia /> */}
  </MainLayout>;

Home.getInitialProps = async ({ req }) => {
  const currentUrl = getCurrentUrl(req);

  const homepageRes = await fetch(DPLA_HOMEPAGE_ENDPOINT);
  const homepageJson = await homepageRes.json();
  const featuredExhibits = homepageJson.acf.featured_exhibits;
  const featuredExhibitIds = featuredExhibits.map(
    exhibit => exhibit.exhibit_id
  );
  const featuredPrimarySourceSets =
    homepageJson.acf.featured_primary_source_sets;
  const featuredPrimarySourceSetIds = featuredPrimarySourceSets.map(
    set => set.primary_source_set_id
  );

  const itemsRes = await fetch(`${currentUrl}${ITEMS_API_ENDPOINT}`);
  const itemsJson = await itemsRes.json();
  const itemCount = itemsJson.count;
  const headerDescription = homepageJson.acf.header_description.replace(
    HEADER_DESCRIPTION_TOKEN,
    addCommasToNumber(itemCount)
  );

  const pssRes = await fetch(`https://dp.la/primary-source-sets/sets.json`);

  const pssJson = await pssRes.json();
  const exhibitsRes = await fetch(`${currentUrl}${EXHIBITS_ENDPOINT}`);

  const exhibitsJson = await exhibitsRes.json();
  const exhibitions = await Promise.all(
    exhibitsJson
      .filter(exhibit => featuredExhibitIds.includes(String(exhibit.id)))
      .map(async exhibit => {
        const exhibitPageRes = await fetch(
          `${currentUrl}${EXHIBIT_PAGES_ENDPOINT}?exhibit=${exhibit.id}`
        );
        const exhibitJson = await exhibitPageRes.json();

        const itemId = exhibitJson.find(
          exhibit =>
            exhibit.slug === "home-page" ||
            exhibit.slug === "homepage" ||
            exhibit.order === 0
        ).page_blocks[0].attachments[0].item.id;
        const filesRes = await fetch(
          `${currentUrl}${FILES_ENDPOINT}?item=${itemId}`
        );
        const filesJson = await filesRes.json();

        const thumbnailUrl = filesJson[0].file_urls.fullsize;
        return Object.assign({}, exhibit, {
          thumbnailUrl,
          name: exhibit.title,
          id: exhibit.slug
        });
      })
  );

  const aboutMenuRes = await fetch(ABOUT_MENU_ENDPOINT);
  const aboutMenuJson = await aboutMenuRes.json();
  const indexPageItem = aboutMenuJson.items.find(
    item => item.url === GUIDES_ENDPOINT
  );
  const guides = await Promise.all(
    aboutMenuJson.items
      .filter(item => item.menu_item_parent === indexPageItem.object_id)
      .map(async guide => {
        const guideRes = await fetch(guide.url);
        const guideJson = await guideRes.json();
        return Object.assign({}, guide, {
          slug: guide.post_name,
          summary: guideJson.acf.summary,
          title: guideJson.title.rendered,
          displayTitle: guideJson.acf.display_title,
          color: guideJson.acf.color,
          illustration: guideJson.acf.illustration
        });
      })
  );

  return {
    sourceSets: pssJson.itemListElement
      .filter(set => featuredPrimarySourceSetIds.includes(set["@id"]))
      .map(set =>
        Object.assign({}, set, {
          href: `/primary-source-sets/set?set=${extractSourceSetSlug(
            set["@id"]
          )}`,
          as: `/primary-source-sets/${extractSourceSetSlug(set["@id"])}`
        })
      ),
    guides,
    exhibitions: exhibitions.map(exhibition =>
      Object.assign({}, exhibition, {
        href: `/exhibitions/exhibition?exhibition=${exhibition.slug}`,
        as: `/exhibitions/${exhibition.slug}`
      })
    ),
    headerDescription
  };
};

export default Home;
