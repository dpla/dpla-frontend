import React from "react";

import MainLayout from "components/MainLayout";
import HomePro from "components/HomePageComponents/HomePro";

import { NEWS_PRO_ENDPOINT, PAGES_ENDPOINT } from "constants/content-pages";
import { API_SETTINGS_ENDPOINT } from "constants/site";
import { washObject } from "lib/washObject";

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
  // fetch home info
  // 1. fetch the settings from WP
  const settingsRes = await fetch(API_SETTINGS_ENDPOINT);
  if (!settingsRes.ok) {
    if (settingsRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load settings.");
  }
  const settingsJson = await settingsRes.json();
  // 2. get the corresponding value
  const endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.pro_homepage_endpoint}`;
  // 3. fetch it
  const homeRes = await fetch(endpoint);
  if (!homeRes.ok) {
    if (homeRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load home.");
  }
  const homeJson = await homeRes.json();

  // fetch news posts
  const newsRes = await fetch(NEWS_PRO_ENDPOINT);
  const newsItems = newsRes.ok ? await newsRes.json() : [];

  const props = washObject({
    news: newsItems,
    content: homeJson,
  });

  return {
    props: props,
  };
}

export default Home;
