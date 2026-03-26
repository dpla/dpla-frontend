import React from "react";

import MainLayout from "components/MainLayout";
import HomePro from "components/HomePageComponents/HomePro";

import { NEWS_PRO_ENDPOINT, PAGES_ENDPOINT } from "constants/content-pages";
import { API_SETTINGS_ENDPOINT } from "constants/site";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSR, wpAuthFetchOptions, wpDraftUrl } from "lib/safeFetch";

function Home({ news, content }) {
  return (
    <MainLayout hidePageHeader={false} hideSearchBar={true}>
      <div id="main" role="main">
        <HomePro news={news} content={content} />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { draftMode } = context;
  const authOptions = wpAuthFetchOptions(draftMode);
  // fetch settings and news in parallel (news is independent of home content)
  const [settingsRes, newsRes] = await Promise.all([
    safeFetch(API_SETTINGS_ENDPOINT),
    safeFetch(NEWS_PRO_ENDPOINT),
  ]);
  const settingsError = checkResponseForSSR(settingsRes);
  if (settingsError) return settingsError;
  const settingsJson = await settingsRes.json();

  // fetch home content (depends on settings for endpoint)
  const baseEndpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.pro_homepage_endpoint}`;
  const endpoint = draftMode ? wpDraftUrl(baseEndpoint) : baseEndpoint;
  const homeRes = await safeFetch(endpoint, authOptions);
  const homeError = checkResponseForSSR(homeRes);
  if (homeError) return homeError;
  const [homeJson, newsItems] = await Promise.all([
    homeRes.json(),
    newsRes?.ok ? newsRes.json() : Promise.resolve([]),
  ]);

  const props = washObject({
    news: newsItems,
    content: homeJson,
  });

  return {
    props: props,
  };
}

export default Home;
