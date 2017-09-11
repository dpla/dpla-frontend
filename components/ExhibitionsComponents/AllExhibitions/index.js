import React from "react";

import FeatureHeader from "../../shared/FeatureHeader";
import ExhibitionsList from "./components/ExhibitionsList";
import mockExhibitions from "./mockExhibitions";

import { TITLE, DESCRIPTION } from "../../../constants/exhibitions.js";

const AllSets = ({ route, exhibitions }) =>
  <div>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <ExhibitionsList exhibitions={exhibitions} route={route} />
  </div>;

export default AllSets;
