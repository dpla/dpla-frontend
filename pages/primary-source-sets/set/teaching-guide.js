import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../../components/MainLayout";
import PSSFooter from "../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "../../../components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import TeachersGuide from "../../../components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import removeQueryParams from "utilFunctions/removeQueryParams";

const SingleSet = props =>
  <MainLayout>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Primary Source Sets",
          url: {
            pathname: "/primary-source-sets/",
            query: removeQueryParams(props.url.query, ["set"])
          }
        },
        { title: props.set.name, search: "" }
      ]}
      route={props.url}
    />
    <SourceSetInfo set={props.set} />
    <ResourcesTabs route={props.url} currentTab="teachingGuide" set={props.set}>
      <TeachersGuide
        teachingGuide={props.teachingGuide}
        setName={props.set.name}
        route={props.url}
      />
    </ResourcesTabs>
    <PSSFooter />
  </MainLayout>;

SingleSet.getInitialProps = async ({ query }) => {
  const setRes = await fetch(
    `https://dp.la/primary-source-sets/sets/${query.set}.json`
  );

  const set = await setRes.json();
  const teachingGuideRes = await fetch(
    `${set.hasPart.find(item => item.disambiguatingDescription === "guide")[
      "@id"
    ]}.json`
  );
  const teachingGuide = await teachingGuideRes.json();
  return { set, teachingGuide };
};

export default SingleSet;
