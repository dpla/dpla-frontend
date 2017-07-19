import React from "react";

import styles from "./PrimarySourceSets.css";

import Filters from "./modules/Filters";
import Header from "./modules/Header";
import Sets from "./modules/Sets";

import mockSets from "./mockSets";

const PrimarySourceSets = () =>
  <div className={styles.primarySourceSets}>
    <Header />
    <Filters />
    <Sets sets={mockSets} />
  </div>;

export default PrimarySourceSets;
