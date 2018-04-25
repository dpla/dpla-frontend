import React from "react";

import MainLayout from "components/MainLayout";
import HomePro from "components/HomePageComponents/HomePro";

import { NEWS_PRO_ENDPOINT, PAGES_ENDPOINT } from "constants/content-pages";
import { API_SETTINGS_ENDPOINT } from "constants/site";

const Home = ({ url, news, content }) =>
  <MainLayout hidePageHeader={false} hideSearchBar={true} route={url}>
    <div id="main" role="main">
      <HomePro url={url} news={news} content={content} />
    </div>
  </MainLayout>;

Home.getInitialProps = async ({ req }) => {
  // fetch home info
  // 1. fetch the settings from WP
  const settingsRes = await fetch(API_SETTINGS_ENDPOINT);
  const settingsJson = await settingsRes.json();
  // 2. get the corresponding value
  const endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf
    .pro_homepage_endpoint}`;
  // 3. fetch it
  const homeRes = await fetch(endpoint);
  const homeJson = await homeRes.json();

  // fetch news posts
  const newsRes = await fetch(NEWS_PRO_ENDPOINT);
  const newsItems = await newsRes.json();

  return { news: newsItems, content: homeJson };
};

export default Home;
