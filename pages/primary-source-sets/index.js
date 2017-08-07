import React from "react";

import MainLayout from "../../components/MainLayout";
import AllSets from "../../components/PrimarySourceSetsComponents/AllSets";
import PSSFooter from "../../components/PrimarySourceSetsComponents/PSSFooter";

const PrimarySourceSets = ({ url }) =>
  <div>
    <MainLayout>
      <AllSets route={url} />
      <PSSFooter />
    </MainLayout>
  </div>;

export default PrimarySourceSets;
