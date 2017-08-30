import React from "react";

import Filters from "./components/Filters";
import FeatureHeader from "../../shared/FeatureHeader";
import SetsList from "./components/SetsList";

import { TITLE, DESCRIPTION } from "../../../constants/primarySourceSets.js";

const AllSets = ({ route, sets }) =>
  <div>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <Filters route={route} />
    <SetsList sets={sets} route={route} />
  </div>;

export default AllSets;
