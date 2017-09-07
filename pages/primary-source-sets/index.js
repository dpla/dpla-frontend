import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../components/MainLayout";
import AllSets from "../../components/PrimarySourceSetsComponents/AllSets";
import PSSFooter from "../../components/PrimarySourceSetsComponents/PSSFooter";

const PrimarySourceSets = ({ url, sets }) =>
  <div>
    <MainLayout route={url}>
      <AllSets route={url} sets={sets} />
      <PSSFooter />
    </MainLayout>
  </div>;

PrimarySourceSets.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `https://dp.la/primary-source-sets/sets.json?order=${query.order}&tags%5B%5D=${query.subject}&tags%5B%5D=${query.timePeriod}`
  );

  const json = await res.json();
  return { sets: json };
};

export default PrimarySourceSets;
