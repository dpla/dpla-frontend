import React from "react";

import styles from "./PrimarySourceSets.css";
import { module } from "../../utils.css";

import Filters from "./modules/Filters";
import Header from "./modules/Header";
import Sets from "./modules/Sets";
import OtherInfo from "./modules/OtherInfo";

import mockSets from "./mockSets";

const PrimarySourceSets = () =>
  <div className={styles.primarySourceSets}>
    <Header />
    <Filters />
    <Sets sets={mockSets} />
    <OtherInfo />
  </div>;

export default PrimarySourceSets;
