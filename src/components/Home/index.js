import React from "react";

import styles from "./Home.css";
import LandingSection from "./modules/LandingSection";
import OnlineExhibitions from "./modules/OnlineExhibitions";
import PrimarySourceSets from "./modules/PrimarySourceSets";

const Home = () =>
  <div className={styles.home}>
    <LandingSection />
    <OnlineExhibitions />
    <PrimarySourceSets />
  </div>;

export default Home;
