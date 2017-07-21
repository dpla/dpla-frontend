import React from "react";

import styles from "./Home.css";
import LandingSection from "./components/LandingSection";
import OnlineExhibitions from "./components/OnlineExhibitions";
import PrimarySourceSets from "./components/PrimarySourceSets";
import DPLAUsers from "./components/DPLAUsers";
import SocialMedia from "./components/SocialMedia";
import FromTheBlog from "./components/FromTheBlog";

const Home = () =>
  <div className={styles.home}>
    <LandingSection />
    <OnlineExhibitions />
    <PrimarySourceSets />
    <DPLAUsers />
    <SocialMedia />
    <FromTheBlog />
  </div>;

export default Home;
