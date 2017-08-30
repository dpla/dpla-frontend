import React from "react";

import styles from "./AllSets.css";

import Filters from "./components/Filters";
import FeatureHeader from "../../shared/FeatureHeader";
import Sets from "./components/Sets";

import { TITLE, DESCRIPTION } from "../../../constants/primarySourceSets.js";

const AllSets = ({ route, sets }) =>
  <div className={styles.allSets}>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <Filters route={route} />
    <Sets sets={sets} route={route} />
  </div>;

export default AllSets;
