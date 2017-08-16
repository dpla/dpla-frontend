import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../components/MainLayout";
import AllSets from "../../components/PrimarySourceSetsComponents/AllSets";
import PSSFooter from "../../components/PrimarySourceSetsComponents/PSSFooter";

import mockSets from "../../components/PrimarySourceSetsComponents/AllSets/mockSets";

const PrimarySourceSets = ({ url, sets }) =>
  <div>
    <MainLayout>
      <AllSets route={url} sets={sets} />
      <PSSFooter />
    </MainLayout>
  </div>;

PrimarySourceSets.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `https://dp.la/primary-source-sets/sets.json?order=${query.order}&tags%5B%5D=${query.subject}&tags%5B%5D=${query.timePeriod}`
  );

  const json = await res.json();
  return {
    // TODO: sub in real data for mockSet
    sets: json.itemListElement.map(element =>
      Object.assign({}, mockSets[0], element)
    )
  };
};

export default PrimarySourceSets;
