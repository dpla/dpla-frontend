import React from "react";

import MainLayout from "components/MainLayout";
import HomeHero from "components/HomePageComponents/HomeHero";
import LocalIntro from "components/HomePageComponents/LocalIntro";
import { LOCAL_ID } from "constants/env";
import { join } from "path";
import fs from 'fs';
import {washObject} from "lib/washObject";

const Home = ({ content }) =>
  <MainLayout hidePageHeader={true} hideSearchBar={true}>
    <div id="main" role="main">
      <HomeHero />
      <LocalIntro content={content} />
    </div>
  </MainLayout>;


export async function getServerSideProps() {
  const localStaticDirectory = join(process.cwd(), 'public', 'static', 'local');
  const markdownPath = join(localStaticDirectory, LOCAL_ID, "homepage.md");
  const pageMarkdown = await fs.promises.readFile(markdownPath, { encoding: "utf8"});

  const props = washObject({
    content: pageMarkdown
  });

  return {
    props: props
  };
}

export default Home;
