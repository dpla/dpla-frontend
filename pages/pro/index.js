import React from "react";

import MainLayout from "components/MainLayout";
import HomePro from "components/HomePageComponents/HomePro";

import { NEWS_PRO_ENDPOINT, PAGES_ENDPOINT, PRO_HOMEPAGE_ID } from "constants/content-pages";
import { washObject } from "lib/washObject";
import { checkResponseForSSRSafe, wpAuthFetchOptions, wpAcfUrl, wpDraftUrl, upstreamUnavailable, isUpstreamUnavailable, safeJson } from "lib/safeFetch";
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
  // fetch home content and news in parallel (news is independent of home content)
  const baseEndpoint = wpAcfUrl(`${PAGES_ENDPOINT}/${PRO_HOMEPAGE_ID}`);
  const endpoint = draftMode ? wpDraftUrl(baseEndpoint) : baseEndpoint;
  const [homeRes, newsRes] = await Promise.all([
    cachedSafeFetch(endpoint, authOptions),
    cachedSafeFetch(wpAcfUrl(NEWS_PRO_ENDPOINT)),
  ]);
  if (isUpstreamUnavailable(homeRes)) {
    return upstreamUnavailable(context.res, homeRes, newsRes);
  }
  if (isUpstreamUnavailable(newsRes)) {
    await Promise.allSettled([newsRes?.body?.cancel?.()]);
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
