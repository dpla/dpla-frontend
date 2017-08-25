import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../components/MainLayout";
import LandingSection from "../components/HomePageComponents/LandingSection";
import OnlineExhibitions from "../components/HomePageComponents/OnlineExhibitions";
import PrimarySourceSets from "../components/HomePageComponents/PrimarySourceSets";
import DPLAUsers from "../components/HomePageComponents/DPLAUsers";
import SocialMedia from "../components/HomePageComponents/SocialMedia";
import FromTheBlog from "../components/HomePageComponents/FromTheBlog";

const Home = ({ sourceSets }) =>
  <MainLayout hideSearchBar>
    <LandingSection />
    <OnlineExhibitions />
    <PrimarySourceSets sourceSets={sourceSets} />
    <DPLAUsers />
    <SocialMedia />
    <FromTheBlog />
  </MainLayout>;

Home.getInitialProps = async () => {
  const res = await fetch(`https://dp.la/primary-source-sets/sets.json`);

  const json = await res.json();
  return { sourceSets: json.itemListElement.slice(0, 4) };
};

export default Home;
