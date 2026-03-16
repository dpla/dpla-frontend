import React from "react";

import MainLayout from "components/MainLayout";
import HomePro from "components/HomePageComponents/HomePro";

import { NEWS_PRO_ENDPOINT, PAGES_ENDPOINT } from "constants/content-pages";
import { API_SETTINGS_ENDPOINT } from "constants/site";
import { washObject } from "lib/washObject";
import { safeFetch } from "lib/safeFetch";

function Home({ news, content }) {
  return (
    <MainLayout hidePageHeader={false} hideSearchBar={true}>
      <div id="main" role="main">
        <HomePro news={news} content={content} />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  // fetch settings and news in parallel (news is independent of home content)
  const [settingsRes, newsRes] = await Promise.all([
    safeFetch(API_SETTINGS_ENDPOINT),
    safeFetch(NEWS_PRO_ENDPOINT),
  ]);
  if (!settingsRes?.ok) {
    return { notFound: true };
  }
  const settingsJson = await settingsRes.json();

  // fetch home content (depends on settings for endpoint)
  const endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.pro_homepage_endpoint}`;
  const homeRes = await safeFetch(endpoint);
  if (!homeRes?.ok) {
    return { notFound: true };
  }
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
