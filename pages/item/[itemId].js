import React, { useEffect } from "react";
import { useRouter } from "next/router";

import MainLayout from "components/MainLayout";
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

import css from "components/ItemComponents/itemComponent.module.scss";
import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import donateCss from "stylesheets/donate.module.scss";
import Button from "components/shared/Button";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable, isUpstreamUnavailable } from "lib/safeFetch";
import { DPLA_ITEM_ID_REGEX } from "constants/items";

export default function ItemDetail({ item, temporarilyUnavailable, randomItemId, isQA, pageDescription, canonicalUrl }) {
  const { query } = useRouter();
  useEffect(() => {
    const storageKey = `503-reload-attempts:${window.location.pathname}`;
    if (!temporarilyUnavailable) {
      // Clear the counter so future outages on the same path auto-refresh again.
      try { sessionStorage.removeItem(storageKey); } catch {}
      return;
    }
    // sessionStorage can throw in private-browsing or restricted environments;
    // skip auto-reload rather than retrying without a cap.
    let timer;
    try {
      const attempts = parseInt(sessionStorage.getItem(storageKey) || "0", 10);
      if (attempts >= 3) return;
      timer = setTimeout(() => {
        sessionStorage.setItem(storageKey, String(attempts + 1));
        window.location.reload();
      }, 10000);
    } catch {
      // sessionStorage unavailable — auto-reload skipped to avoid an uncapped loop.
    }
    return () => clearTimeout(timer);
  }, [temporarilyUnavailable, query.itemId]);

  if (temporarilyUnavailable) {
    return (
      <MainLayout>
        <div className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}>
          <div className="row">
            <div className={`${utils.colMd2} ${utils.colXs12}`} />
            <main
              id="main"
              role="main"
              className={`${contentCss.content} ${donateCss.thankYou} ${utils.colMd8} ${utils.colXs12}`}
            >
              <h1>This item is temporarily unavailable.</h1>
              <p>
                We&rsquo;re having a brief issue loading this item. This page may
                refresh automatically a few times.
              </p>
              <Button type="primary" onClick={() => window.location.reload()}>
                Try again now
              </Button>
            </main>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!item) return null;
  const metadataBase = `/item/${item.id}`;
  return (
    <MainLayout pageTitle={item.title} pageImage={item.thumbnailUrl} pageDescription={pageDescription} canonicalUrl={canonicalUrl}>
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
            spatialName={item.spatial ? item.spatial.name : item.spatial}
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
  const randomItemId = isQA ? await getRandomItemIdAsync() : null;
  if (!DPLA_ITEM_ID_REGEX.test(itemId)) {
    return notFound;
  }

  const itemUrl = new URL(process.env.API_URL);
  itemUrl.pathname += "/items/";
  itemUrl.pathname += itemId;
  itemUrl.searchParams.set("api_key", process.env.API_KEY);

  const res = await safeFetch(itemUrl);
  if (isUpstreamUnavailable(res)) {
    console.warn(`[SSR] Item ${itemId}: ${!res ? "network error" : "503 after retry"}`);
    return upstreamUnavailable(context.res, res);
  }
  const errorResult = checkResponseForSSRSafe(res, "Item");
  if (errorResult) return errorResult;
  let data;
  try {
    data = await res.json();
  } catch {
    return notFound;
  }
  if (!("docs" in data) || data.docs.length < 1) {
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
      ? doc.sourceResource.language.map((lang) => {
          return lang.name;
        })
      : doc.sourceResource.language;
  const dataProvider = getDataProviderName(doc.dataProvider);
  const strippedDoc = { ...doc, originalRecord: "" };
  delete strippedDoc.originalRecord;

  const descriptionText = joinIfArray(doc.sourceResource.description, " ");
  const pageDescription = descriptionText
    ? truncateString(descriptionText, 155)
    : truncateString(
        `${joinIfArray(doc.sourceResource.title, ", ")}, a ${joinIfArray(doc.sourceResource.type, ", ")} from ${doc.provider.name}`,
        155
      );
  const canonicalUrl = `${process.env.NEXT_PUBLIC_USER_BASE_URL}/item/${doc.id}`;

  const props = washObject({
    item: {
      ...doc.sourceResource,
      id: doc.id,
      thumbnailUrl,
      contributor: dataProvider,
      intermediateProvider: doc.intermediateProvider,
      date: date,
      language: language,
      contributingInstitution: dataProvider,
      partner: doc.provider.name,
      sourceUrl: doc.isShownAt,
      useDefaultImage: !doc.object,
      edmRights: doc.rights,
      doc: strippedDoc,
      originalRecord: doc.originalRecord,
      filecoin: doc.filecoin,
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
