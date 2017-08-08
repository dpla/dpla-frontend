import React from "react";

import styles from "./AllSets.css";

import Filters from "./components/Filters";
import Header from "./components/Header";
import Sets from "./components/Sets";

import mockSets from "./mockSets";

const AllSets = ({ route }) =>
  <div className={styles.allSets}>
    <Header />
    <Filters />
    <Sets sets={mockSets} route={route} />
  </div>;

export default AllSets;
