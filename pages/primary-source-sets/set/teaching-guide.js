import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../../components/MainLayout";
import PSSFooter from "../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "../../../components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import TeachersGuide from "../../../components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import removeQueryParams from "utilFunctions/removeQueryParams";

const SingleSet = ({ url, set, teachingGuide, currentPath }) =>
  <MainLayout route={url} pageTitle={set.name}>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Primary Source Sets",
          url: {
            pathname: "/primary-source-sets/",
            query: removeQueryParams(url.query, ["set"])
          }
        },
        { title: set.name, search: "" }
      ]}
      route={url}
    />
    <SourceSetInfo set={set} />
    <ResourcesTabs route={url} currentTab="teachingGuide" set={set}>
      <TeachersGuide
        teachingGuide={teachingGuide}
        setName={set.name}
        route={url}
        currentPath={currentPath}
      />
    </ResourcesTabs>
    <PSSFooter />
  </MainLayout>;

SingleSet.getInitialProps = async ({ query, req }) => {
  const setRes = await fetch(
    `https://dp.la/primary-source-sets/sets/${query.set}.json`
  );

  const currentPath = req
    ? `${req.get("Host")}/primary-source-sets/${query.set}`
    : "";

  const set = await setRes.json();
  const teachingGuideRes = await fetch(
    `${set.hasPart.find(item => item.disambiguatingDescription === "guide")[
      "@id"
    ]}.json`
  );
  const teachingGuide = await teachingGuideRes.json();
  return { set, teachingGuide, currentPath };
};

export default SingleSet;
