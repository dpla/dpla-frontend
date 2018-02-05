import React from "react";

import HomeHero from "./HomeHero";
import HomePageSlider from "./HomePageSlider";
import DPLAUsers from "./DPLAUsers";
import NewsLane from "shared/NewsLane";
import WebsiteFeature from "shared/WebsiteFeature";
import WPEdit from "shared/WPEdit";

import { stylesheet } from "./HomePageSlider/HomePageSlider.css";
import {
  stylesheet as userStylesheet,
  classNames as userClassNames
} from "./HomeUser.css";
import { stylesheet as guidesStylesheet } from "shared/GuideLink/GuideLink.css";
import { stylesheet as arrowStylesheet } from "shared/CarouselNavArrows/CarouselNavArrows.css";

const HomeUser = ({
  url,
  sourceSets,
  exhibitions,
  guides,
  headerDescription,
  news,
  content
}) =>
  <div className={userClassNames.wrapper}>
    <HomeHero
      headerDescription={headerDescription}
      feature={content.acf.feature}
    />
    <WPEdit page={content} url={url} />
    {content.acf.feature &&
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
    {/* <SocialMedia /> */}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: userStylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: arrowStylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: guidesStylesheet }} />
  </div>;

export default HomeUser;
