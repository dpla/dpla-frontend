import React from "react";
import fetch from "isomorphic-fetch";
const markdownit = require("markdown-it")({ html: true });

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
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const markdownit = require("markdown-it")({ html: true });
const { container } = utilClassNames;

const SingleSet = ({ url, set }) =>
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
    <ResourcesTabs route={url} currentTab="additionalResources" set={set}>
      <div className={classNames.content}>
        <div className={container}>
          <div
            className={`${contentClasses.content} ${container}`}
            dangerouslySetInnerHTML={{
              __html: markdownit.render(
                set.hasPart.find(item => item.name === "Resources").text
              )
            }}
          />
        </div>
      </div>
    </ResourcesTabs>
    <PSSFooter />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

SingleSet.getInitialProps = async ({ query }) => {
  const setRes = await fetch(
    `https://dp.la/primary-source-sets/sets/${query.set}.json`
  );

  const set = await setRes.json();
  return { set };
};

export default SingleSet;
