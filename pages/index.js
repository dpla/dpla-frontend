import React from "react";

import MainLayout from "../components/MainLayout";
import LandingSection from "../components/HomePageComponents/LandingSection";
import OnlineExhibitions from "../components/HomePageComponents/OnlineExhibitions";
import PrimarySourceSets from "../components/HomePageComponents/PrimarySourceSets";
import DPLAUsers from "../components/HomePageComponents/DPLAUsers";
import SocialMedia from "../components/HomePageComponents/SocialMedia";
import FromTheBlog from "../components/HomePageComponents/FromTheBlog";

const Home = () =>
  <MainLayout hideSearchBar>
    <LandingSection />
    <OnlineExhibitions />
    <PrimarySourceSets />
    <DPLAUsers />
    <SocialMedia />
    <FromTheBlog />
  </MainLayout>;

export default Home;
