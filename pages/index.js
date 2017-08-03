import React from "react";

import Head from "../components/Head";
import LandingSection from "../components/HomePage/LandingSection";
import OnlineExhibitions from "../components/HomePage/OnlineExhibitions";
import PrimarySourceSets from "../components/HomePage/PrimarySourceSets";
import DPLAUsers from "../components/HomePage/DPLAUsers";
import SocialMedia from "../components/HomePage/SocialMedia";
import FromTheBlog from "../components/HomePage/FromTheBlog";

import { classNames, stylesheet } from "../components/HomePage/Home.css";

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
