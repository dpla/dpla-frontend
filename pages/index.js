import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../components/MainLayout";
import HomeHero from "../components/HomePageComponents/HomeHero";
import HomePageSlider from "../components/HomePageComponents/HomePageSlider";
import DPLAUsers from "../components/HomePageComponents/DPLAUsers";
import SocialMedia from "../components/HomePageComponents/SocialMedia";
import FromTheBlog from "../components/HomePageComponents/FromTheBlog";

// TODO: remove when we have real data for exhibitions
const sampleImage = "static/placholderImages/sample-image.jpeg";

const mockExhibitionsData = [
  {
    name: "Building the First Transcontinental Railroad",
    thumbnailUrl: sampleImage,
    id: 0,
    isFeatured: true
  },
  {
    name: "Race to the Moon",
    thumbnailUrl: sampleImage,
    id: 1,
    isFeatured: false
  },
  {
    name: "In Focus: The Evolution of the Personal Camera",
    thumbnailUrl: sampleImage,
    id: 2,
    isFeatured: false
  },
  {
    name: "Design Tenets",
    thumbnailUrl: sampleImage,
    id: 3,
    isFeatured: false
  }
];

const Home = ({ sourceSets }) =>
  <MainLayout hideSearchBar>
    <HomeHero />
    <HomePageSlider
      items={mockExhibitionsData}
      title="Online Exhibitions"
      browseLinkUrl="/exhibitions"
      browseLinkName="Exhibitions"
    />
    <HomePageSlider
      items={sourceSets}
      title="Primary Source Sets"
      browseLinkUrl="/primary-source-sets"
      browseLinkName="Sets"
      slidesToShow={4}
      theme="blue"
    />
    <DPLAUsers />
    <FromTheBlog />
    <SocialMedia />
  </MainLayout>;

Home.getInitialProps = async () => {
  const res = await fetch(`https://dp.la/primary-source-sets/sets.json`);

  const json = await res.json();
  return { sourceSets: json.itemListElement.slice(0, 4) };
};

export default Home;
