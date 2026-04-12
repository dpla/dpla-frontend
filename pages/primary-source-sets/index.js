import React from "react";

import MainLayout from "components/MainLayout";
import AllSets from "components/PrimarySourceSetsComponents/AllSets";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import {washObject} from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable } from "lib/safeFetch";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

import {
  subjectOptions,
  timePeriodOptions,
  TITLE,
} from "constants/primarySourceSets";

function PrimarySourceSets({ sets, temporarilyUnavailable }) {
  if (temporarilyUnavailable) return <ServiceUnavailable />;
  return (
    <div>
      <MainLayout pageTitle={TITLE}>
        <div id="main" role="main" data-cy={"pss-home"}>
          <AllSets sets={sets}/>
        </div>
        <PSSFooter/>
      </MainLayout>
    </div>
  );
}

export async function getServerSideProps({ query, res }) {
  const findTimePeriod = query.timePeriod && query.timePeriod !== "all-time-periods" ? timePeriodOptions.find(
    (option) => option.value === query.timePeriod,
  ) : null;
  const timePeriod = findTimePeriod?.label;

  const findSubject = query.subject && query.subject !== "all-subjects" ? subjectOptions.find(
    (subject) => subject.value === query.subject,
  ) : null;
  const subject = findSubject?.label;

  let filter = "";
  if (timePeriod && subject) {
    filter = `&filter=about.name:${encodeURIComponent(timePeriod)}+AND+${encodeURIComponent(subject)}`;
  } else if (timePeriod) {
    filter = `&filter=about.name:${encodeURIComponent(timePeriod)}`;
  } else if (subject) {
    filter = `&filter=about.name:${encodeURIComponent(subject)}`;
  }
  const url = `${process.env.API_URL}/pss/sets?api_key=${process.env.API_KEY}${filter}`;
  const fetchRes = await safeFetch(url);
  if (!fetchRes) {
    return upstreamUnavailable(res);
  }
  const resError = checkResponseForSSRSafe(fetchRes, "PSS sets");
  if (resError) return resError;
  const json = await fetchRes.json();
  const props = washObject({
    sets: json,
  });
  return {
    props: props,
  };
}

export default PrimarySourceSets;
