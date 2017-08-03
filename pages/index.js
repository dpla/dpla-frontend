import React from "react";

import Head from "../components/Head";
import LandingSection from "../components/HomePageComponents/LandingSection";
import OnlineExhibitions from "../components/HomePageComponents/OnlineExhibitions";
import PrimarySourceSets from "../components/HomePageComponents/PrimarySourceSets";
import DPLAUsers from "../components/HomePageComponents/DPLAUsers";
import SocialMedia from "../components/HomePageComponents/SocialMedia";
import FromTheBlog from "../components/HomePageComponents/FromTheBlog";

import {
  classNames,
  stylesheet
} from "../components/HomePageComponents/Home.css";

const Home = () =>
  <div className={classNames.home}>
    <Head />
    <LandingSection />
    <OnlineExhibitions />
    <PrimarySourceSets />
    <DPLAUsers />
    <SocialMedia />
    <FromTheBlog />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Home;
