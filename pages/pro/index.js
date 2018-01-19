import React from "react";

import MainLayout from "components/MainLayout";
import HomePro from "components/HomePageComponents/HomePro";

import { SITE_ENV } from "constants/env";
import { NEWS_HOME_ENDPOINT } from "constants/content-pages";

const Home = ({ url, news }) =>
  <MainLayout
    hidePageHeader={SITE_ENV === "user"}
    hideSearchBar={SITE_ENV === "pro"}
    route={url}
  >
    <div id="main">
      <HomePro news={news} />
    </div>
  </MainLayout>;

Home.getInitialProps = async ({ req }) => {
  // fetch news posts
  const newsRes = await fetch(NEWS_HOME_ENDPOINT);
  const newsItems = await newsRes.json();

  return { news: newsItems };
};

export default Home;
