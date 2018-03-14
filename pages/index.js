import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import HomeUser from "components/HomePageComponents/HomeUser";

import {
  getCurrentUrl,
  extractSourceSetSlug,
  addCommasToNumber,
  getMenuItemUrl
} from "utilFunctions";

import { NUMBER_OF_USER_GUIDES_TO_SHOW } from "constants/home";
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
import {
  PAGES_ENDPOINT,
  ABOUT_MENU_ENDPOINT,
  NEWS_USER_ENDPOINT
} from "constants/content-pages";
import { PSS_BASE_URL, API_SETTINGS_ENDPOINT } from "constants/site";
import { SITE_ENV } from "constants/env";

const Home = ({
  url,
  sourceSets,
  guides,
  exhibitions,
  headerDescription,
  news,
  content
}) =>
  <MainLayout
    hidePageHeader={SITE_ENV === "user"}
    hideSearchBar={SITE_ENV === "pro"}
    route={url}
  >
    <div id="main" role="main">
      <HomeUser
        sourceSets={sourceSets}
        exhibitions={exhibitions}
        guides={guides}
        headerDescription={headerDescription}
        news={news}
        content={content}
        url={url}
      />
    </div>
  </MainLayout>;

Home.getInitialProps = async ({ req }) => {
  const currentUrl = getCurrentUrl(req);

  // fetch home info
  // 1. fetch the settings from WP
  const settingsRes = await fetch(API_SETTINGS_ENDPOINT);
  const settingsJson = await settingsRes.json();
  // 2. get the corresponding value
  const endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.homepage_endpoint}`;
  const guides_endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf
    .guides_endpoint}`;
  // 3. fetch it
  const homeRes = await fetch(endpoint);
  const homepageJson = await homeRes.json();

  // fetch featured exhibits data

  const featuredExhibits = homepageJson.acf.featured_exhibits;
  const featuredExhibitIds = featuredExhibits.map(
    exhibit => exhibit.exhibit_id
  );

  const exhibitsRes = await fetch(`${currentUrl}${EXHIBITS_ENDPOINT}`);

  const exhibitsJson = await exhibitsRes.json();
  const featuredExhibitions = [];
  if (exhibitsJson.length > 0)
    featuredExhibitIds.forEach(id => {
      const featuredExhibit = exhibitsJson.find(
        exhibit => exhibit.id === parseInt(id, 10)
      );
      if (featuredExhibit) {
        featuredExhibitions.push(
          Object.assign({}, featuredExhibit, {
            href: `/exhibitions/exhibition?exhibition=${featuredExhibit.slug}`,
            as: `/exhibitions/${featuredExhibit.slug}`
          })
        );
      }
    });
  const featuredExhibitionsWithData = await Promise.all(
    featuredExhibitions.map(async exhibit => {
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

  // fetch featured primary source sets data

  const featuredPrimarySourceSets =
    homepageJson.acf.featured_primary_source_sets;

  const sourceSets = [];
  featuredPrimarySourceSets.forEach(featuredSet => {
    if (featuredSet) {
      const setWithLinkInfo = Object.assign({}, featuredSet, {
        href: `/primary-source-sets/set?set=${featuredSet.primary_source_set_id}`,
        as: `/primary-source-sets/${featuredSet.primary_source_set_id}`,
        repImageUrl: featuredSet.image_url
      });
      sourceSets.push(setWithLinkInfo);
    }
  });

  // fetch item count

  const itemsRes = await fetch(
    `${currentUrl}${ITEMS_API_ENDPOINT}?page_size=1`
  );
  const itemsJson = await itemsRes.json();
  const itemCount = itemsJson.count;
  const headerDescription = homepageJson.acf.header_description.replace(
    HEADER_DESCRIPTION_TOKEN,
    addCommasToNumber(itemCount)
  );

  // fetch user guides data

  const aboutMenuRes = await fetch(ABOUT_MENU_ENDPOINT);
  const aboutMenuJson = await aboutMenuRes.json();
  const indexPageItem = aboutMenuJson.items.find(
    item => item.url === guides_endpoint
  );
  const guides = await Promise.all(
    aboutMenuJson.items
      .filter(item => item.menu_item_parent === indexPageItem.object_id)
      .slice(0, NUMBER_OF_USER_GUIDES_TO_SHOW)
      .map(async guide => {
        const guideRes = await fetch(getMenuItemUrl(guide));
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

  // fetch news posts
  const newsRes = await fetch(NEWS_USER_ENDPOINT);
  const newsItems = await newsRes.json();

  return {
    sourceSets,
    guides,
    exhibitions: featuredExhibitionsWithData,
    headerDescription,
    news: newsItems,
    content: homepageJson
  };
};

export default Home;
