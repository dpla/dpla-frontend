import React from "react";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import TeachersGuide from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import BreadcrumbJsonLd from "components/shared/BreadcrumbJsonLd";

import { removeQueryParams } from "lib";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable, isUpstreamUnavailable, safeJson } from "lib/safeFetch";
import isValidPSSSlug from "lib/isValidPSSSlug";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

function SingleSet({ router, set, teachingGuide, currentFullUrl, temporarilyUnavailable }) {
  if (temporarilyUnavailable) return <ServiceUnavailable />;
  if (!set) return null;
  const breadcrumbs = [
    { title: "Primary Source Sets", url: { pathname: "/primary-source-sets", query: removeQueryParams(router.query, ["set"]) } },
    { title: set.name, search: "" },
  ];
  return (
    <MainLayout
      pageTitle={set.name.replace(/\*/g, "")}
      pageImage={set.repImageUrl || set.thumbnailUrl}
    >
      <BreadcrumbsModule breadcrumbs={breadcrumbs} />
      <BreadcrumbJsonLd breadcrumbs={breadcrumbs} />
      <SourceSetInfo set={set} currentFullUrl={currentFullUrl} />
      <ResourcesTabs currentTab="teachingGuide" set={set}>
        <TeachersGuide teachingGuide={teachingGuide} setName={set.name} />
      </ResourcesTabs>
      <PSSFooter />
    </MainLayout>
  );
}

export async function getServerSideProps({ query, res }) {
  if (!isValidPSSSlug(query.set)) return { notFound: true };
  const currentFullUrl = `${process.env.BASE_URL}/primary-source-sets/${query.set}`;
  const url = `${process.env.API_URL}/pss/sets/${encodeURIComponent(query.set)}?api_key=${process.env.API_KEY}`;
  const setRes = await safeFetch(url);
  if (isUpstreamUnavailable(setRes)) {
    return upstreamUnavailable(res, setRes);
  }
  const setError = checkResponseForSSRSafe(setRes, `set "${query.set}"`);
  if (setError) return setError;
  const set = await safeJson(setRes);
  if (set === null) return upstreamUnavailable(context.res);

  const teachingGuide = set.hasPart.find(
    (item) => item.disambiguatingDescription === "guide",
  );

  const props = washObject({
    set,
    teachingGuide,
    currentFullUrl,
  });

  return {
    props: props,
  };
}

export default withRouter(SingleSet);
