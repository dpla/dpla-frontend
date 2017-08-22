import React from "react";
import { markdown } from "markdown";
import fetch from "isomorphic-fetch";

import MainLayout from "/components/MainLayout";
import PSSFooter from "/components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "/components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "/components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "/components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";

import removeQueryParams from "utilFunctions/removeQueryParams";
import {
  classNames,
  stylesheet
} from "/components/PrimarySourceSetsComponents/SingleSet/TeachersGuide/TeachersGuide.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

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
    <ResourcesTabs
      route={props.url}
      currentTab="additionalResources"
      set={props.set}
    >
      <div
        className={[classNames.markdownWrapper, module].join(" ")}
        dangerouslySetInnerHTML={{
          __html: markdown.toHTML(`1. [${props.set.text.split("1. [")[1]}`)
        }}
      />
    </ResourcesTabs>
    <PSSFooter />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

SingleSet.getInitialProps = async ({ query }) => {
  const setRes = await fetch(
    `https://dp.la/primary-source-sets/sets/${query.set}.json`
  );

  const set = await setRes.json();
  return { set };
};

export default SingleSet;
