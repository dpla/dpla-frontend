import React from "react";

import MainLayout from "components/MainLayout";
import ServiceUnavailable from "components/shared/ServiceUnavailable";
import CiteButton from "components/shared/CiteButton";
import BreadcrumbsModule from "components/ItemComponents/BreadcrumbsModule";
import HarmfulContent from "components/shared/HarmfulContent";
import Content from "components/ItemComponents/Content";
import QA from "components/ItemComponents/Content/QA";
import CheckableLists from "components/ListComponents/CheckableLists";

import {
  getDataProviderName,
  getItemThumbnail,
  getRandomItemIdAsync,
  joinIfArray,
  truncateString,
} from "lib";

import SearchResultsNav from "components/ItemComponents/SearchResultsNav";

import css from "components/ItemComponents/itemComponent.module.css";
import utils from "stylesheets/utils.module.css";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable, isUpstreamUnavailable, safeJson } from "lib/safeFetch";
import { DPLA_ITEM_ID_REGEX } from "constants/items";

export default function ItemDetail({ item, temporarilyUnavailable, retryAfter, randomItemId, isQA, pageDescription, canonicalUrl }) {
  if (temporarilyUnavailable) {
    return (
      <ServiceUnavailable
        heading="This item is temporarily unavailable."
        message="We’re having a brief issue loading this item. Please try again in a moment."
        retryAfter={retryAfter}
      />
    );
  }

  if (!item) return null;
  const metadataBase = `/item/${item.id}`;
  return (
    <MainLayout pageTitle={joinIfArray(item.title, ", ")} pageImage={item.thumbnailUrl} pageDescription={pageDescription} canonicalUrl={canonicalUrl}>
      <SearchResultsNav />
      <BreadcrumbsModule
        breadcrumbs={[
          {
            title: item.partner,
            url: {
              pathname: "/search",
              search: `?partner="${item.partner}"`,
            },
          },
          {
            title: item.contributingInstitution,
            url: {
              pathname: "/search",
              search: `?partner="${item.partner}"&provider="${item.contributingInstitution}"`,
            },
          },
          {
            title: truncateString(joinIfArray(item.title, ", ")),
            url: {
              pathname: "",
            },
          },
        ]}
      />
      <HarmfulContent />
      {isQA && <QA item={item} randomItemId={randomItemId} />}
      <main
        id="main"
        role="main"
        className={`${utils.container} ${css.contentWrapper}`}
      >
        <Content item={item} />
        <div className={css.faveAndCiteButtons}>
          <div className={css.metadataLinks}>
            <h2>Metadata</h2>
            <ul>
              <li><a href={`${metadataBase}.raw`}>Original record</a></li>
              <li><a href={`${metadataBase}.json`}>Enriched JSON-LD</a></li>
            </ul>
          </div>
          <CiteButton
            creator={item.creator}
            displayDate={item.date ? item.date.displayDate : item.date}
            spatialName={item.spatialName}
            sourceUrl={item.sourceUrl}
            className={css.citeButton}
            toCiteText="item"
            title={joinIfArray(item.title, ", ")}
          />
          <CheckableLists itemId={item.id} />
        </div>
      </main>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const notFound = {
    notFound: true,
  };
  const itemId = context.params?.itemId;
  if (!itemId) {
    return notFound;
  }
  const isQA = process.env.NEXT_PUBLIC_SITE_ENV === "cqa";
  if (!DPLA_ITEM_ID_REGEX.test(itemId)) {
    return notFound;
  }
  const randomItemId = isQA ? await getRandomItemIdAsync() : null;

  const itemUrl = new URL(process.env.API_URL);
  itemUrl.pathname += "/items/";
  itemUrl.pathname += itemId;
  itemUrl.searchParams.set("api_key", process.env.API_KEY);

  const res = await safeFetch(itemUrl);
  if (isUpstreamUnavailable(res)) return upstreamUnavailable(context.res, res);
  const errorResult = checkResponseForSSRSafe(res, "Item");
  if (errorResult) return errorResult;
  // A non-JSON body is a degraded upstream, not a missing item. Don't 404.
  const data = await safeJson(res);
  if (data === null) return upstreamUnavailable(context.res, res);
  if (!Array.isArray(data.docs) || data.docs.length < 1) {
    return notFound;
  }

  const doc = data.docs[0];
  const thumbnailUrl = getItemThumbnail(doc);
  const date =
    doc.sourceResource.date && Array.isArray(doc.sourceResource.date)
      ? doc.sourceResource.date[0]
      : doc.sourceResource.date;
  const language =
    doc.sourceResource.language && Array.isArray(doc.sourceResource.language)
      ? doc.sourceResource.language.map((lang) => lang?.name).filter(Boolean)
      : doc.sourceResource.language;
  const spatialName = Array.isArray(doc.sourceResource.spatial)
    ? doc.sourceResource.spatial.map((s) => s?.name).filter(Boolean).join(", ")
    : doc.sourceResource.spatial?.name;
  const dataProvider = getDataProviderName(doc.dataProvider);
  const { originalRecord, ...strippedDoc } = doc;

  const descriptionText = joinIfArray(doc.sourceResource.description, " ");
  const providerText = doc.provider?.name ? ` from ${doc.provider.name}` : "";
  const pageDescription = descriptionText
    ? truncateString(descriptionText, 155)
    : truncateString(
        `${joinIfArray(doc.sourceResource.title, ", ")}, a ${joinIfArray(doc.sourceResource.type, ", ")}${providerText}`,
        155
      );
  const canonicalUrl = `${process.env.NEXT_PUBLIC_USER_BASE_URL}/item/${doc.id}`;

  const props = washObject({
    item: {
      ...doc.sourceResource,
      id: doc.id ?? itemId,
      thumbnailUrl,
      thumbnailSourceUrl: doc.object,
      contributor: dataProvider,
      intermediateProvider: doc.intermediateProvider,
      date: date,
      language: language,
      contributingInstitution: dataProvider,
      partner: doc.provider?.name ?? "",
      sourceUrl: doc.isShownAt,
      useDefaultImage: !doc.object,
      spatialName,
      edmRights: doc.rights,
      doc: strippedDoc,
      originalRecord,
      filecoin: doc.filecoin,
      iiifManifest: doc.iiifManifest,
    },
    randomItemId,
    isQA,
    pageDescription,
    canonicalUrl,
  });

  return {
    props: props,
  };
}
