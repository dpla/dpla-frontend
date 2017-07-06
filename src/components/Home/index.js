import React from "react";

import styles from "./Home.css";
import LandingSection from "./modules/LandingSection";
import OnlineExhibitions from "./modules/OnlineExhibitions";
import PrimarySourceSets from "./modules/PrimarySourceSets";
import DPLAUsers from "./modules/DPLAUsers";

const Home = () =>
  <div className={styles.home}>
    <LandingSection />
    <OnlineExhibitions />
    <PrimarySourceSets />
    <DPLAUsers />
  </div>;

export default Home;
