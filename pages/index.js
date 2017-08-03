import React from "react";

import LandingSection from "../components/HomePage/LandingSection";
import OnlineExhibitions from "../components/HomePage/OnlineExhibitions";
import PrimarySourceSets from "../components/HomePage/PrimarySourceSets";
import DPLAUsers from "../components/HomePage/DPLAUsers";
import SocialMedia from "../components/HomePage/SocialMedia";
import FromTheBlog from "../components/HomePage/FromTheBlog";

import { classNames, stylesheet } from "../components/HomePage/Home.css";

const Home = () =>
  <div className={classNames.home}>
    <LandingSection />
    <OnlineExhibitions />
    <PrimarySourceSets />
    <DPLAUsers />
    <SocialMedia />
    <FromTheBlog />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Home;
