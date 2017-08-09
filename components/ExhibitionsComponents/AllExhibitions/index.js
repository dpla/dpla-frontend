import React from "react";

import Header from "./components/Header";
import Exhibitions from "./components/Exhibitions";

import mockExhibitions from "./mockExhibitions";

const AllSets = ({ route }) =>
  <div>
    <Header />
    <Exhibitions exhibitions={mockExhibitions} route={route} />
  </div>;

export default AllSets;
