import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../../components/MainLayout";
import PSSFooter from "../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "../../../components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import TeachersGuide from "../../../components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";
import { removeQueryParams, getCurrentFullUrl } from "utilFunctions";
import { PSS_BASE_URL } from "constants/site";

const SingleSet = ({ url, set, teachingGuide, currentPath, currentFullUrl }) =>
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
    <SourceSetInfo set={set} currentFullUrl={currentFullUrl} />
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
  const currentFullUrl = getCurrentFullUrl(req);
  const setRes = await fetch(`${PSS_BASE_URL}/sets/${query.set}.json`);

  const currentPath = req
    ? `${req.get("Host")}/primary-source-sets/${query.set}`
    : "";

  const set = await setRes.json();
  const guidePage = set.hasPart.find(
    item => item.disambiguatingDescription === "guide"
  )["@id"];
  const guideEndpoint =
    guidePage.replace(/^.*primary-source-sets(.*)/, `${PSS_BASE_URL}$1`) +
    ".json";
  const teachingGuideRes = await fetch(guideEndpoint);
  const teachingGuide = await teachingGuideRes.json();
  return { set, teachingGuide, currentPath, currentFullUrl };
};

export default SingleSet;
