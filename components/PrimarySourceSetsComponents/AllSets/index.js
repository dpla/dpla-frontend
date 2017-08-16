import React from "react";

import styles from "./AllSets.css";

import Filters from "./components/Filters";
import Header from "./components/Header";
import Sets from "./components/Sets";

const AllSets = ({ route, sets }) =>
  <div className={styles.allSets}>
    <Header />
    <Filters route={route} />
    <Sets sets={sets} route={route} />
  </div>;

export default AllSets;
