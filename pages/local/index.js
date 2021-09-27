import React from "react";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import HomeHero from "components/HomePageComponents/HomeHero";
import LocalIntro from "components/HomePageComponents/LocalIntro";

import { getCurrentUrl } from "lib";

import { LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

const Home = ({ router, content }) =>
  <MainLayout hidePageHeader={true} hideSearchBar={true} route={router}>
    <div id="main" role="main">
      <HomeHero />
      <LocalIntro content={content} />
    </div>
  </MainLayout>;

Home.getInitialProps = async ({ req }) => {
  const fullUrl = getCurrentUrl(req);
  const markdownUrl = `${fullUrl}/static/local/${LOCALS[LOCAL_ID].theme}/homepage.md`;
  const markdownResponse = await fetch(markdownUrl);
  const pageMarkdown = await markdownResponse.text();

  return {
    content: pageMarkdown
  };
};

export default withRouter(Home);
