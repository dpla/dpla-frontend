import React from "react";
import fetch from "isomorphic-fetch";
import ReactMarkdown from "react-markdown";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";

import { PSS_BASE_URL } from "constants/env";
import { getCurrentFullUrl, removeQueryParams } from "lib";
import { markdownLinks } from "lib/externalLinks";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";
import css from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide/TeachersGuide.scss";

const SingleSet = ({ url, set, currentFullUrl }) =>
  <MainLayout
    route={url}
    pageTitle={set.name.replace(/\*/g, "")}
    pageImage={set.repImageUrl || set.thumbnailUrl}
  >
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

export default SingleSet;
