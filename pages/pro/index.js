import React from "react";

import MainLayout from "components/MainLayout";
import HomePro from "components/HomePageComponents/HomePro";

import { NEWS_PRO_ENDPOINT, PAGES_ENDPOINT } from "constants/content-pages";
import { API_SETTINGS_ENDPOINT } from "constants/site";
import { washObject } from "lib/washObject";
import { checkResponseForSSRSafe, wpAuthFetchOptions, wpDraftUrl, upstreamUnavailable } from "lib/safeFetch";
import { cachedSafeFetch } from "lib/wpCache";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

function Home({ news, content, temporarilyUnavailable }) {
  if (temporarilyUnavailable) return <ServiceUnavailable />;
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
    cachedSafeFetch(API_SETTINGS_ENDPOINT),
    cachedSafeFetch(NEWS_PRO_ENDPOINT),
  ]);
  if (!settingsRes) {
    return upstreamUnavailable(context.res);
  }
  const settingsError = checkResponseForSSRSafe(settingsRes, "Pro settings");
  if (settingsError) return settingsError;
  const settingsJson = await settingsRes.json();

  // fetch home content (depends on settings for endpoint)
  const baseEndpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.pro_homepage_endpoint}`;
  const endpoint = draftMode ? wpDraftUrl(baseEndpoint) : baseEndpoint;
  const homeRes = await cachedSafeFetch(endpoint, authOptions);
  if (!homeRes) {
    return upstreamUnavailable(context.res);
  }
  const homeError = checkResponseForSSRSafe(homeRes, "Pro homepage");
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
