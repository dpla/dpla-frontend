import React from "react";
import {withRouter} from "next/router";
import Markdown from "react-markdown";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";

import {removeQueryParams, markdownLinks} from "lib";

import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import css from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide/TeachersGuide.module.scss";
import {washObject} from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable, isUpstreamUnavailable } from "lib/safeFetch";
import isValidPSSSlug from "lib/isValidPSSSlug";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

function SingleSet({ router, set, currentFullUrl, temporarilyUnavailable }) {
  if (temporarilyUnavailable) return <ServiceUnavailable />;
  if (!set) return null;
  return (
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
              query: removeQueryParams(router.query, ["set"]),
            },
          },
          {title: set.name, search: ""},
        ]}
      />
      <SourceSetInfo set={set} currentFullUrl={currentFullUrl}/>
      <ResourcesTabs currentTab="additionalResources" set={set}>
        <div className={css.content}>
          <div
            className={utils.container}
            role="tabpanel"
            aria-labelledby="tab-additionalresources"
          >
            <Markdown
              className={`${contentCss.content} ${utils.container}`}
              components={{
                a(reference) {
                  return markdownLinks(reference);
                },
              }}
            >
              {set.hasPart.find((item) => item.name === "Resources").text}
            </Markdown>
          </div>
        </div>
      </ResourcesTabs>
      <PSSFooter/>
    </MainLayout>
  );
}

export async function getServerSideProps({ query, res }) {
  if (!isValidPSSSlug(query.set)) return { notFound: true };
  const currentFullUrl = `${process.env.BASE_URL}/primary-source-sets/${query.set}`;
  const setRes = await safeFetch(
    `${process.env.API_URL}/pss/sets/${encodeURIComponent(query.set)}?api_key=${process.env.API_KEY}`,
  );
  if (isUpstreamUnavailable(setRes)) {
    await setRes?.body?.cancel();
    return upstreamUnavailable(res);
  }
  const setError = checkResponseForSSRSafe(setRes, `set "${query.set}"`);
  if (setError) return setError;
  const set = await setRes.json();
  const props = washObject({
    set,
    currentFullUrl,
  });
  return {
    props: props,
  };
}

export default withRouter(SingleSet);
