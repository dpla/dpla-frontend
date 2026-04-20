import React from "react";
import { useRouter, withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import BreadcrumbJsonLd from "components/shared/BreadcrumbJsonLd";
import ContentAndMetadata from "components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata";
import SourceCarousel from "components/PrimarySourceSetsComponents/Source/components/SourceCarousel";

import { extractSourceId } from "lib";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable, isUpstreamUnavailable } from "lib/safeFetch";
import isValidPSSSlug from "lib/isValidPSSSlug";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

const videoIcon = "/static/placeholderImages/Video.svg";
const audioIcon = "/static/placeholderImages/Sound.svg";

function Source({ source, set, currentSourceIdx, prevSourceUrl, nextSourceUrl, temporarilyUnavailable }) {
  const router = useRouter();
  if (temporarilyUnavailable) return <ServiceUnavailable />;
  if (!source || !set) return null;

  const breadcrumbs = [
    { title: "Primary Source Sets", url: { pathname: "/primary-source-sets" } },
    { title: set.name, url: { pathname: `/primary-source-sets/${router.query.set}` } },
    { title: source.name, url: "" },
  ];

  const headLinks = [
    prevSourceUrl && <link key="prev" rel="prev" href={prevSourceUrl} />,
    nextSourceUrl && <link key="next" rel="next" href={nextSourceUrl} />,
  ].filter(Boolean);

  return (
    <MainLayout
      pageTitle={source.name}
      pageImage={source.thumbnailUrl}
      headLinks={headLinks.length ? headLinks : undefined}
    >
      <BreadcrumbsModule breadcrumbs={breadcrumbs} />
      <BreadcrumbJsonLd breadcrumbs={breadcrumbs} />
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
  if (isUpstreamUnavailable(sourceRes) || isUpstreamUnavailable(setRes)) {
    return upstreamUnavailable(context.res, sourceRes, setRes);
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
    (s) => s["@id"] === sourceId,
  );

  const sources = setJson.hasPart.filter(
    (p) => p.disambiguatingDescription === "source",
  );
  const currentInSourcesIdx = sources.findIndex((s) => s["@id"] === sourceId);
  const baseUrl = (process.env.NEXT_PUBLIC_USER_BASE_URL || "").replace(/\/+$/, "");
  const prevSourceUrl =
    currentInSourcesIdx > 0
      ? `${baseUrl}/primary-source-sets/${set}/sources/${extractSourceId(sources[currentInSourcesIdx - 1]["@id"])}`
      : null;
  const nextSourceUrl =
    currentInSourcesIdx !== -1 && currentInSourcesIdx < sources.length - 1
      ? `${baseUrl}/primary-source-sets/${set}/sources/${extractSourceId(sources[currentInSourcesIdx + 1]["@id"])}`
      : null;

  const props = washObject({
    source: sanitizedSourceJson,
    set: { ...setJson, hasPart: parts },
    currentSourceIdx,
    prevSourceUrl,
    nextSourceUrl,
  });

  return { props };
}

export default withRouter(Source);
