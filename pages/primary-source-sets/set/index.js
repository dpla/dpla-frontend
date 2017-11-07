import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../../components/MainLayout";
import PSSFooter from "../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import RelatedSets from "../../../components/PrimarySourceSetsComponents/SingleSet/RelatedSets";
import ResourcesTabs from "../../../components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import SourceSetSources from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetSources";
import { removeQueryParams, getCurrentFullUrl } from "utilFunctions";
import { PSS_BASE_URL } from "constants/site";

const videoIcon = "/static/placeholderImages/Video.svg";
const audioIcon = "/static/placeholderImages/Sound.svg";

const SingleSet = ({ set, url, currentFullUrl }) =>
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
    <ResourcesTabs route={url} currentTab="sourceSet" set={set}>
      <SourceSetSources
        sources={set.hasPart.filter(
          item => item.disambiguatingDescription === "source"
        )}
        route={url}
      />
    </ResourcesTabs>
    <RelatedSets sets={set.isRelatedTo} />
    <PSSFooter />
  </MainLayout>;

SingleSet.getInitialProps = async ({ query, req }) => {
  const currentFullUrl = getCurrentFullUrl(req);
  const res = await fetch(`${PSS_BASE_URL}/sets/${query.set}.json`);
  const json = await res.json();
  const parts = json.hasPart.map(part => {
    let thumbnailUrl = part.thumbnailUrl;
    let useDefaultImage = false;
    const type =
      part.mainEntity && part.mainEntity[0] && part.mainEntity[0]["@type"];
    if (type === "AudioObject") {
      thumbnailUrl = audioIcon;
      useDefaultImage = true;
    } else if (type === "VideoObject") {
      thumbnailUrl = videoIcon;
      useDefaultImage = true;
    }
    return Object.assign({}, part, { thumbnailUrl, useDefaultImage });
  });
  return { set: Object.assign({}, json, { hasPart: parts }), currentFullUrl };
};

export default SingleSet;
