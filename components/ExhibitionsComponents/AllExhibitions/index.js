import React from "react";

import FeatureHeader from "../../shared/FeatureHeader";
import Exhibitions from "./components/Exhibitions";
import mockExhibitions from "./mockExhibitions";

import { TITLE, DESCRIPTION } from "../../../constants/exhibitions.js";

const AllSets = ({ route }) =>
  <div>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <Exhibitions exhibitions={mockExhibitions} route={route} />
  </div>;

export default AllSets;
