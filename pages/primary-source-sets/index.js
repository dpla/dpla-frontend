import React from "react";

import MainLayout from "../../components/MainLayout";
import AllSets from "../../components/PrimarySourceSetsComponents/AllSets";

const PrimarySourceSets = ({ match }) =>
  <div>
    <MainLayout>
      <AllSets />
    </MainLayout>
  </div>;

export default PrimarySourceSets;
