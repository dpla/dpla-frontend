import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import AllSets from "components/PrimarySourceSetsComponents/AllSets";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import { PSS_BASE_URL } from "constants/env";
import { TITLE } from "constants/primarySourceSets";

const PrimarySourceSets = ({ url, sets }) =>
  <div>
    <MainLayout route={url} pageTitle={TITLE}>
      <div id="main" role="main">
        <AllSets route={url} sets={sets} />
      </div>
      <PSSFooter />
    </MainLayout>
  </div>;

PrimarySourceSets.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `${PSS_BASE_URL}/sets.json?order=${query.order}&tags%5B%5D=${query.subject}&tags%5B%5D=${query.timePeriod}`
  );

  const json = await res.json();
  return { sets: json };
};

export default PrimarySourceSets;
