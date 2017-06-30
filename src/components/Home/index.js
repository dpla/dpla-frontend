import React from "react";

import styles from "./Home.css";
import LandingSection from "./modules/LandingSection";
import OnlineExhibitions from "./modules/OnlineExhibitions";

const Home = () =>
  <div className={styles.home}>
    <LandingSection />
    <OnlineExhibitions />
  </div>;

export default Home;
