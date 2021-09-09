import React from "react";

import HomeHero from "./HomeHero";
import HomePageSlider from "./HomePageSlider";
import DPLAUsers from "./DPLAUsers";
import NewsLane from "shared/NewsLane";
import StayInformed from "shared/StayInformed";
import WebsiteFeature from "shared/WebsiteFeature";
import WPEdit from "shared/WPEdit";

import css from "./HomeUser.module.scss";

const HomeUser = ({
  url,
  sourceSets,
  exhibitions,
  guides,
  headerDescription,
  news,
  content
}) =>
  <div className={css.wrapper}>
    <HomeHero
      headerDescription={headerDescription}
      feature={content.acf.feature}
    />
    <WPEdit page={content} url={url} />
    {content.acf.feature &&
      content.acf.feature.title !== "" &&
      <WebsiteFeature
        title={content.acf.feature.title}
        text={content.acf.feature.text}
        buttonText={content.acf.feature.button_text}
        buttonUrl={content.acf.feature.button_url}
        imageSrc={content.acf.feature.image}
      />}
    {exhibitions &&
      exhibitions.length > 0 &&
      <HomePageSlider
        items={exhibitions}
        title="Online Exhibitions"
        browseLinkUrl="/exhibitions"
        browseLinkName="Exhibitions"
        slidesToShow={3.5}
      />}
    {sourceSets &&
      sourceSets.length > 0 &&
      <HomePageSlider
        items={sourceSets}
        title="Primary Source Sets"
        browseLinkUrl="/primary-source-sets"
        browseLinkName="Sets"
        slidesToShow={4.5}
        theme="blue"
      />}
    <DPLAUsers guides={guides} />
    <NewsLane title="DPLA News" items={news} />
    <StayInformed />
  </div>;

export default HomeUser;
