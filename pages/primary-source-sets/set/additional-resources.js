import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-fetch";
import ReactMarkdown from "react-markdown";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";

import { PSS_BASE_URL } from "constants/env";
import { getCurrentFullUrl, removeQueryParams, markdownLinks } from "lib";

import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import css from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide/TeachersGuide.module.scss";

const SingleSet = ({ router, set, currentFullUrl }) =>
  <MainLayout
    pageTitle={set.name.replace(/\*/g, "")}
    pageImage={set.repImageUrl || set.thumbnailUrl}
  >
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Primary Source Sets",
          url: {
            pathname: "/primary-source-sets",
            query: removeQueryParams(router.query, ["set"])
          }
        },
        { title: set.name, search: "" }
      ]}
    />
    <SourceSetInfo set={set} currentFullUrl={currentFullUrl} />
    <ResourcesTabs currentTab="additionalResources" set={set}>
      <div className={css.content}>
        <div
          className={utils.container}
          role="tabpanel"
          aria-labelledby="tab-additionalresources"
        >
          <ReactMarkdown
            className={`${contentCss.content} ${utils.container}`}
            source={set.hasPart.find(item => item.name === "Resources").text}
            renderers={{
              linkReference: reference => markdownLinks(reference),
              link: reference => markdownLinks(reference)
            }}
          />
        </div>
      </div>
    </ResourcesTabs>
    <PSSFooter />
  </MainLayout>;

SingleSet.getInitialProps = async ({ query, req }) => {
  const currentFullUrl = getCurrentFullUrl(req);
  const setRes = await fetch(`${PSS_BASE_URL}/sets/${query.set}.json`);

  const set = await setRes.json();
  return { set, currentFullUrl };
};

export default withRouter(SingleSet);
