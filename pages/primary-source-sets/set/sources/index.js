import React from "react";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ContentAndMetadata from "components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata";
import SourceCarousel from "components/PrimarySourceSetsComponents/Source/components/SourceCarousel";

import { removeQueryParams } from "lib";
import { washObject } from "lib/washObject";

const videoIcon = "/static/placeholderImages/Video.svg";
const audioIcon = "/static/placeholderImages/Sound.svg";

function Source(props) {
  const { router, source, set, currentSourceIdx } = props;
  return (
    <MainLayout pageTitle={source.name} pageImage={source.thumbnailUrl}>
      <BreadcrumbsModule
        breadcrumbs={[
          {
            title: "Primary Source Sets",
            url: {
              pathname: "/primary-source-sets",
              query: removeQueryParams(router.query, ["source", "set"]),
            },
          },
          {
            title: set.name,
            as: {
              pathname: `/primary-source-sets/${router.query.set}`,
              query: removeQueryParams(router.query, ["source", "set"]),
            },
            url: {
              pathname: "/primary-source-sets/set",
              query: {
                ...removeQueryParams(router.query, ["source"]),
              },
            },
          },
          { title: source.name, url: "" },
        ]}
      />
      <div id="main" role="main">
        <ContentAndMetadata source={source} />
      </div>
      <SourceCarousel
        sources={set.hasPart.filter(
          (item) => item.disambiguatingDescription === "source",
        )}
        currentSourceIdx={currentSourceIdx}
        set={set}
      />
      <PSSFooter />
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const sourceRes = await fetch(
    `${process.env.API_URL}/pss/sources/${encodeURIComponent(query.source)}?api_key=${process.env.API_KEY}`,
  );
  if (!sourceRes.ok) {
    //treating all fetch errors as 404 due to API bug
    return {
      notFound: true,
    };
  }
  const sourceJson = await sourceRes.text();
  const sanitizedSourceJson = JSON.parse(sourceJson.replace(/\r\n/gi, ""));

  const setRes = await fetch(
    `${process.env.API_URL}/pss/sets/${encodeURIComponent(query.set)}?api_key=${process.env.API_KEY}`,
  );
  if (!setRes.ok) {
    if (setRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Unable to load set.");
  }

  const setJson = await setRes.json();
  const parts = setJson.hasPart.map((part) => {
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
    return { ...part, thumbnailUrl, useDefaultImage };
  });

  const sourceId = sanitizedSourceJson["@id"];
  const currentSourceIdx = setJson.hasPart.findIndex(
    (source) => source["@id"] === sourceId,
  );

  const props = washObject({
    source: sanitizedSourceJson,
    set: { ...setJson, hasPart: parts },
    currentSourceIdx,
  });

  return { props };
}

export default withRouter(Source);
