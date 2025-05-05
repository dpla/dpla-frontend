import React from "react";

import MainLayout from "components/MainLayout";
import HomeHero from "components/HomePageComponents/HomeHero";
import LocalIntro from "components/HomePageComponents/LocalIntro";
import { join } from "path";
import fs from "fs";
import { washObject } from "lib/washObject";

function Home({ content }) {
  return (
    <MainLayout hidePageHeader={true} hideSearchBar={true}>
      <div id="main" role="main">
        <HomeHero />
        <LocalIntro content={content} />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
  const localStaticDirectory = join(process.cwd(), "public", "static", "local");
  const markdownPath = join(localStaticDirectory, localId, "homepage.md");
  const pageMarkdown = await fs.promises.readFile(markdownPath, {
    encoding: "utf8",
  });

  const props = washObject({
    content: pageMarkdown,
  });

  return {
    props: props,
  };
}

export default Home;
