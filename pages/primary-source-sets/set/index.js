import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../../components/MainLayout";
import PSSFooter from "../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import RelatedSets from "../../../components/PrimarySourceSetsComponents/SingleSet/RelatedSets";
import ResourcesTabs from "../../../components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import SourceSetSources from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetSources";

import removeQueryParams from "/utilFunctions/removeQueryParams";

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
    <ResourcesTabs route={props.url} currentTab="sourceSet" set={props.set}>
      <SourceSetSources
        sources={props.set.hasPart.filter(
          item => item.disambiguatingDescription === "source"
        )}
        route={props.url}
      />
    </ResourcesTabs>
    <RelatedSets sets={props.set.isRelatedTo.slice(0, 4)} />
    <PSSFooter />
  </MainLayout>;

SingleSet.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `https://dp.la/primary-source-sets/sets/${query.set}.json`
  );

  const json = await res.json();
  return { set: json };
};

export default SingleSet;
