import React from "react";

import MainLayout from "components/MainLayout";
import HomeUser from "components/HomePageComponents/HomeUser";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

import { exhibitHomePage, loadExhibition } from "lib/exhibitionsStatic";

import { addCommasToNumber, getMenuItemUrl } from "lib";

import {
  HEADER_DESCRIPTION_TOKEN,
  NUMBER_OF_USER_GUIDES_TO_SHOW,
} from "constants/home";

import {
  ABOUT_MENU_ENDPOINT,
  NEWS_USER_ENDPOINT,
  PAGES_ENDPOINT,
} from "constants/content-pages";

import { API_SETTINGS_ENDPOINT } from "constants/site";
import { washObject } from "lib/washObject";
import { safeFetch, wpAuthFetchOptions, wpDraftUrl, isUpstreamUnavailable, upstreamUnavailable } from "lib/safeFetch";

function Home({
  sourceSets,
  guides,
  exhibitions,
  headerDescription,
  news,
  content,
  temporarilyUnavailable,
}) {
  if (temporarilyUnavailable) return <ServiceUnavailable />;
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  return (
    <MainLayout
      hidePageHeader={siteEnv === "user"}
      hideSearchBar={siteEnv === "pro"}
    >
      <div id="main" role="main">
        <HomeUser
          sourceSets={sourceSets}
          exhibitions={exhibitions}
          guides={guides}
          headerDescription={headerDescription}
          news={news}
          content={content}
        />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  if (process.env.NEXT_PUBLIC_SITE_ENV === "local") {
    return {
      notFound: true,
    };
  }

  const { draftMode } = context;
  const authOptions = wpAuthFetchOptions(draftMode);

  try {
  // fetch home info
  // 1. fetch the settings from WP
  const settingsRes = await safeFetch(API_SETTINGS_ENDPOINT);
  if (isUpstreamUnavailable(settingsRes)) return upstreamUnavailable(context.res, settingsRes);
  if (!settingsRes?.ok) return { notFound: true };
  const settingsJson = await settingsRes.json();
  // 2. get the corresponding value
  const baseEndpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.homepage_endpoint}`;
  const endpoint = draftMode ? wpDraftUrl(baseEndpoint) : baseEndpoint;
  const guidesEndpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.guides_endpoint}`;
  // 3. fetch it (safeFetch is used here for consistent error handling)
  const homeRes = await safeFetch(endpoint, authOptions);
  if (isUpstreamUnavailable(homeRes)) return upstreamUnavailable(context.res, homeRes);
  if (!homeRes?.ok) {
    return { notFound: true };
  }
  const homepageJson = await homeRes.json();

  // fetch featured exhibits data
  const featuredExhibitSlugs = homepageJson.acf.featured_exhibits;

  const featuredExhibits = await Promise.all(
    featuredExhibitSlugs.map(async (exhibit) => {
      const exhibitJson = await loadExhibition(exhibit.exhibit_id);
      const homePage = exhibitHomePage(exhibitJson);
      const thumbnailUrl =
        homePage.page_blocks[0].attachments[0].files[0].file_urls.fullsize;

      return {
        name: exhibitJson.title,
        repImageUrl: thumbnailUrl,
        thumbnailUrl,
        featured: false,
        href: `/exhibitions/${exhibitJson.slug}`,
      };
    }),
  );

  // fetch featured primary source sets data
  const featuredPrimarySourceSets =
    homepageJson.acf.featured_primary_source_sets;

  const sourceSets = [];
  featuredPrimarySourceSets.forEach((featuredSet) => {
    if (featuredSet) {
      const setWithLinkInfo = {
        ...featuredSet,
        href: `/primary-source-sets/${featuredSet.primary_source_set_id}`,
        repImageUrl: featuredSet.image_url,
      };
      sourceSets.push(setWithLinkInfo);
    }
  });

  // fetch item count
  let headerDescription = homepageJson.acf.header_description;
  const apiUrl = `${process.env.API_URL}/items?page_size=0&api_key=${process.env.API_KEY}`;
  const itemsRes = await safeFetch(apiUrl);
  let itemCount = 0; // default handles unexpected error
  if (itemsRes?.ok) {
    const itemsJson = await itemsRes.json();

    if ("count" in itemsJson) {
      if (itemsJson.count.value !== undefined) {
        itemCount = itemsJson.count.value; // ElasticSearch 7
      } else {
        itemCount = itemsJson.count; // ElasticSearch 6
      }
    }
    headerDescription = headerDescription.replace(
      HEADER_DESCRIPTION_TOKEN,
      addCommasToNumber(itemCount),
    );
  } else {
    headerDescription = headerDescription.replace(
      HEADER_DESCRIPTION_TOKEN,
      "over 50,000,000",
    );
  }

  // fetch user guides data
  let guides = [];
  const aboutMenuRes = await safeFetch(ABOUT_MENU_ENDPOINT);
  if (!aboutMenuRes?.ok) {
    console.log("Unable to load user guides.", aboutMenuRes?.status);
  } else {
    const aboutMenuJson = await aboutMenuRes.json();
    const indexPageItem = aboutMenuJson.items.find(
      (item) => item.url === guidesEndpoint,
    );
    if (indexPageItem) {
      guides = (
        await Promise.all(
          aboutMenuJson.items
            .filter((item) => item.menu_item_parent === indexPageItem.object_id)
            .slice(0, NUMBER_OF_USER_GUIDES_TO_SHOW)
            .map(async (guide) => {
              const guideRes = await safeFetch(getMenuItemUrl(guide));
              if (!guideRes?.ok) {
                console.log("Unable to load guide.", guide.post_name, guideRes?.status);
                return null;
              }
              const guideJson = await guideRes.json();
              return {
                ...guide,
                slug: guideJson.slug ?? guide.post_name,
                summary: guideJson.acf.summary,
                title: guideJson.title.rendered,
                displayTitle: guideJson.acf.display_title,
                color: guideJson.acf.color,
                illustration: guideJson.acf.illustration,
              };
            }),
        )
      ).filter(Boolean);
    }
  }

  // fetch news posts
  let newsItems = [];
  const newsRes = await safeFetch(NEWS_USER_ENDPOINT);
  if (!newsRes?.ok) {
    console.log("Unable to load news posts.", newsRes?.status);
  } else {
    newsItems = await newsRes.json();
  }

  return {
    props: washObject({
      sourceSets,
      guides,
      exhibitions: featuredExhibits,
      headerDescription,
      news: newsItems,
      content: homepageJson,
    }),
  };
  } catch (e) {
    console.error("[SSR] getServerSideProps failed:", e);
    // Only treat network-level fetch failures (TypeError with a cause set by
    // undici) as upstream unavailability. All other errors (shape mismatches,
    // app bugs) surface as 500s so they don't get silently masked as 503.
    if (e instanceof TypeError && e.cause) {
      return upstreamUnavailable(context.res);
    }
    throw e;
  }
}

export default Home;
