import React from "react";

import MainLayout from "components/MainLayout";

import HomeHero from "components/HomePageComponents/HomeHero";
import WebsiteFeature from "shared/WebsiteFeature";

function QA() {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  return (
    <MainLayout hidePageHeader={true} hideSearchBar={true}>
      <div id="main" role="main">
        <HomeHero feature={true} headerDescription={"Content QA"} />
        <WebsiteFeature
          title={"Notice: QA Environment"}
          text={
            "This is an internal interface not meant for end users. For the full experience, please visit DPLA's home page."
          }
          buttonText={"Go to DPLA"}
          buttonUrl={"https://dp.la"}
        />
      </div>
    </MainLayout>
  );
}

export default QA;
