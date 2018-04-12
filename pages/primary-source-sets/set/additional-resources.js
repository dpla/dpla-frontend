import React from "react";
import fetch from "isomorphic-fetch";
import ReactMarkdown from "react-markdown";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import { PSS_BASE_URL } from "constants/env";
import { getCurrentFullUrl, removeQueryParams } from "utilFunctions";
import {
  classNames,
  stylesheet
} from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide/TeachersGuide.css";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;

const SingleSet = ({ url, set, currentFullUrl }) =>
  <MainLayout route={url} pageTitle={set.name}>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Primary Source Sets",
          url: {
            pathname: "/primary-source-sets",
            query: removeQueryParams(url.query, ["set"])
          }
        },
        { title: set.name, search: "" }
      ]}
      route={url}
    />
    <SourceSetInfo set={set} currentFullUrl={currentFullUrl} />
    <ResourcesTabs route={url} currentTab="additionalResources" set={set}>
      <div className={classNames.content}>
        <div
          className={container}
          role="tabpanel"
          aria-labelledby="tab-teachingguide"
        >
          <ReactMarkdown
            className={`${contentClasses.content} ${container}`}
            source={set.hasPart.find(item => item.name === "Resources").text}
          />
        </div>
      </div>
    </ResourcesTabs>
    <PSSFooter />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

SingleSet.getInitialProps = async ({ query, req }) => {
  const currentFullUrl = getCurrentFullUrl(req);
  const setRes = await fetch(`${PSS_BASE_URL}/sets/${query.set}.json`);

  const set = await setRes.json();
  return { set, currentFullUrl };
};

export default SingleSet;
