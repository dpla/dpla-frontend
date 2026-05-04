import React from "react";

import MainLayout from "components/MainLayout";
import HomePro from "components/HomePageComponents/HomePro";

import { NEWS_PRO_ENDPOINT, PAGES_ENDPOINT } from "constants/content-pages";
import { API_SETTINGS_ENDPOINT } from "constants/site";
import { washObject } from "lib/washObject";
import { checkResponseForSSRSafe, wpAuthFetchOptions, wpDraftUrl, upstreamUnavailable, isUpstreamUnavailable, safeJson } from "lib/safeFetch";
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
  if (isUpstreamUnavailable(settingsRes)) {
    return upstreamUnavailable(context.res, settingsRes, newsRes);
  }
  if (isUpstreamUnavailable(newsRes)) {
    await Promise.allSettled([newsRes?.body?.cancel?.()]);
  }
  const settingsError = checkResponseForSSRSafe(settingsRes, "Pro settings");
  if (settingsError) return settingsError;
  const settingsJson = await safeJson(settingsRes);
  if (settingsJson === null) return upstreamUnavailable(context.res, newsRes);

  // fetch home content (depends on settings for endpoint)
  const baseEndpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.pro_homepage_endpoint}`;
  const endpoint = draftMode ? wpDraftUrl(baseEndpoint) : baseEndpoint;
  const homeRes = await cachedSafeFetch(endpoint, authOptions);
  if (isUpstreamUnavailable(homeRes)) {
    return upstreamUnavailable(context.res, newsRes, homeRes);
  }
  const homeError = checkResponseForSSRSafe(homeRes, "Pro homepage");
  if (homeError) return homeError;
  const [homeJson, newsItems] = await Promise.all([
    safeJson(homeRes),
    newsRes?.ok ? safeJson(newsRes) : Promise.resolve([]),
  ]);
  if (homeJson === null) return upstreamUnavailable(context.res);

  const props = washObject({
    news: newsItems ?? [],
    content: homeJson,
  });

  return {
    props: props,
  };
}

export default Home;
