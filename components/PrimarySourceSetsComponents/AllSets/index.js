import React from "react";

import FiltersBar from "./components/FiltersBar";
import FeatureHeader from "shared/FeatureHeader";
import SetsList from "./components/SetsList";

import { TITLE, DESCRIPTION } from "constants/primarySourceSets.js";

const AllSets = ({ router, sets }) =>
  <div>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <FiltersBar
      subjects={sets.hasPart[0].itemListElement}
      timePeriods={sets.hasPart[1].itemListElement}
    />
    <SetsList sets={sets} />
  </div>;

export default AllSets;
