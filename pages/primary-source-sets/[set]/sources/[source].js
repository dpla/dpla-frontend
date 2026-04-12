import React from "react";
import { useRouter, withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ContentAndMetadata from "components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata";
import SourceCarousel from "components/PrimarySourceSetsComponents/Source/components/SourceCarousel";

import { removeQueryParams } from "lib";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable } from "lib/safeFetch";
import isValidPSSSlug from "lib/isValidPSSSlug";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

const videoIcon = "/static/placeholderImages/Video.svg";
const audioIcon = "/static/placeholderImages/Sound.svg";

function Source({ source, set, currentSourceIdx, temporarilyUnavailable }) {
  const router = useRouter();
  if (temporarilyUnavailable) return <ServiceUnavailable />;
  if (!source || !set) return null;
  return (
    <MainLayout pageTitle={source.name} pageImage={source.thumbnailUrl}>
      <BreadcrumbsModule
        breadcrumbs={[
          {
            title: "Primary Source Sets",
            url: {
              pathname: "/primary-source-sets",
            },
          },
          {
            title: set.name,
            url: {
              pathname: `/primary-source-sets/${router.query.set}`,
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

export async function getServerSideProps(context) {
  const set = context.params?.set;
  const source = context.params?.source;
  if (!isValidPSSSlug(set) || !isValidPSSSlug(source)) return { notFound: true };
  const [sourceRes, setRes] = await Promise.all([
    safeFetch(`${process.env.API_URL}/pss/sources/${encodeURIComponent(source)}?api_key=${process.env.API_KEY}`),
    safeFetch(`${process.env.API_URL}/pss/sets/${encodeURIComponent(set)}?api_key=${process.env.API_KEY}`),
  ]);
  if (!sourceRes || !setRes) {
    return upstreamUnavailable(context.res);
  }
  const sourceError = checkResponseForSSRSafe(sourceRes, `source "${source}"`);
  if (sourceError) return sourceError;
  const setError = checkResponseForSSRSafe(setRes, `set "${set}"`);
  if (setError) return setError;

  const [sourceText, setJson] = await Promise.all([sourceRes.text(), setRes.json()]);
  const sanitizedSourceJson = JSON.parse(sourceText.replace(/\r\n/gi, ""));
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
