import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "../../../../components/MainLayout";
import PSSFooter from "../../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ContentAndMetadata from "../../../../components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata";
import SourceCarousel from "../../../../components/PrimarySourceSetsComponents/Source/components/SourceCarousel";

import removeQueryParams from "utilFunctions/removeQueryParams";

const videoIcon = "/static/placeholderImages/Video.svg";
const audioIcon = "/static/placeholderImages/Sound.svg";

const Source = ({ url, source, set, currentSourceIdx }) =>
  <MainLayout route={url} pageTitle={source.name}>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: "Primary Source Sets",
          url: {
            pathname: "/primary-source-sets",
            query: removeQueryParams(url.query, ["source", "set"])
          }
        },
        {
          title: set.name,
          as: {
            pathname: `/primary-source-sets/${url.query.set}`,
            query: removeQueryParams(url.query, ["source", "set"])
          },
          url: {
            pathname: "/primary-source-sets/set/",
            query: Object.assign({}, removeQueryParams(url.query, ["source"]))
          }
        },
        { title: source.name, url: "" }
      ]}
      route={url}
    />
    <ContentAndMetadata source={source} />
    <SourceCarousel
      sources={set.hasPart.filter(
        item => item.disambiguatingDescription === "source"
      )}
      currentSourceIdx={currentSourceIdx}
      route={url}
      set={set}
    />
    <PSSFooter />
  </MainLayout>;

Source.getInitialProps = async ({ query }) => {
  const sourceRes = await fetch(
    `https://dp.la/primary-source-sets/sources/${query.source}.json`
  );
  const sourceJson = await sourceRes.json();

  const setRes = await fetch(
    `https://dp.la/primary-source-sets/sets/${query.set}.json`
  );
  const setJson = await setRes.json();
  const parts = setJson.hasPart.map(part => {
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

  const sourceId = sourceJson["@id"];
  const currentSourceIdx = setJson.hasPart
    .slice(1)
    .findIndex(source => source["@id"] === sourceId);

  return {
    source: sourceJson,
    set: Object.assign({}, setJson, { hasPart: parts }),
    currentSourceIdx
  };
};

export default Source;
