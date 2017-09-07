import React from "react";

import FiltersBar from "./components/FiltersBar";
import FeatureHeader from "../../shared/FeatureHeader";
import SetsList from "./components/SetsList";

import { TITLE, DESCRIPTION } from "../../../constants/primarySourceSets.js";

const AllSets = ({ route, sets }) =>
  <div>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <FiltersBar
      route={route}
      subjects={sets.hasPart[0].itemListElement}
      timePeriods={sets.hasPart[1].itemListElement}
    />
    <SetsList sets={sets} route={route} />
  </div>;

export default AllSets;
