import React from "react";

import HomeHero from "./HomeHero";
import HomePageSlider from "./HomePageSlider";
import DPLAUsers from "./DPLAUsers";
import FromTheBlog from "./FromTheBlog";
import { stylesheet } from "./HomePageSlider/HomePageSlider.css";
import { stylesheet as guidesStylesheet } from "../shared/GuideLink/GuideLink.css";
import { stylesheet as arrowStylesheet } from "../shared/CarouselNavArrows/CarouselNavArrows.css";

const UserHome = ({ sourceSets, exhibitions, guides, headerDescription }) =>
  <div>
    <HomeHero headerDescription={headerDescription} />
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
    <FromTheBlog />
    {/* <SocialMedia /> */}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: arrowStylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: guidesStylesheet }} />
  </div>;

export default UserHome;
