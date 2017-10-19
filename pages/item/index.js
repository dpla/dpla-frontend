import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "components/ItemComponents/BreadcrumbsModule";
import Content from "components/ItemComponents/Content";
import FaveAndCiteButtons from "components/shared/FaveAndCiteButtons";
import ShareButton from "components/shared/ShareButton";
import { API_ENDPOINT, THUMBNAIL_ENDPOINT } from "constants/items";
import { getCurrentUrl, getCurrentFullUrl } from "utilFunctions";
import { classNames as utilClassNames } from "css/utils.css";
import { DEFAULT_PAGE_SIZE } from "constants/search";
import {
  possibleFacets,
  mapFacetsToURLPrettified,
  splitAndURIEncodeFacet
} from "constants/search";
import {
  classNames,
  stylesheet
} from "components/ItemComponents/itemComponent.css";
import {
  removeQueryParams,
  joinIfArray,
  getDefaultThumbnail
} from "utilFunctions";

const ItemDetail = ({
  url,
  item,
  currentFullUrl,
  previousItemId,
  nextItemId,
  searchItemCount
}) =>
  <MainLayout route={url} pageTitle={item.title}>
    <BreadcrumbsModule
      searchItemCount={searchItemCount}
      previousItemId={previousItemId}
      nextItemId={nextItemId}
      breadcrumbs={[
        {
          title: url.query.q ? `Search for “${url.query.q}”` : "Search",
          url: {
            pathname: "/search/",
            query: removeQueryParams(url.query, ["itemId"])
          }
        },
        { title: joinIfArray(item.title), search: "" }
      ]}
      route={url}
    />
    <div className={`${utilClassNames.container} ${classNames.contentWrapper}`}>
      <Content item={item} url={url} />
      <div className={classNames.faveAndCiteButtons}>
        <FaveAndCiteButtons toCite="item" />
        <ShareButton
          className={classNames.shareButton}
          currentFullUrl={currentFullUrl}
          toShareText="item"
          title={item.title}
        />
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

ItemDetail.getInitialProps = async ({ query, req }) => {
  const currentFullUrl = getCurrentFullUrl(req);
  const currentUrl = getCurrentUrl(req);

  const res = await fetch(`${currentUrl}${API_ENDPOINT}/${query.itemId}`);
  const json = await res.json();
  const doc = json.docs[0];
  const thumbnailUrl = doc.object
    ? `${currentUrl}${THUMBNAIL_ENDPOINT}/${doc.id}`
    : getDefaultThumbnail(doc.sourceResource.type);
  const date = doc.sourceResource.date && Array.isArray(doc.sourceResource.date)
    ? doc.sourceResource.date[0]
    : doc.sourceResource.date;
  const language = doc.sourceResource.language &&
    Array.isArray(doc.sourceResource.language)
    ? doc.sourceResource.language.map(lang => {
        return lang.name;
      })
    : doc.sourceResource.language;

  let previousItemId;
  let nextItemId;
  let searchItemCount;
  if (query.q && (query.next || query.previous)) {
    const q = query.q;
    const page_size = query.page_size || DEFAULT_PAGE_SIZE;
    const page = query.previous === -1 ? parseInt(query.page, 10) - 1 : (query.page || 1);
    let sort_by = "";
    if (query.sort_by === "title") {
      sort_by = "sourceResource.title";
    } else if (query.sort_by === "created") {
      sort_by = "sourceResource.date.begin";
    }
    const sort_order = query.sort_order || "";

    const facetQueries = possibleFacets
      .map(
        facet =>
          query[mapFacetsToURLPrettified[facet]]
            ? `${facet}=${splitAndURIEncodeFacet(
                query[mapFacetsToURLPrettified[facet]]
              )}`
            : ""
      )
      .filter(facetQuery => facetQuery !== "")
      .join("&");

    const searchRes = await fetch(
      `${currentUrl}${API_ENDPOINT}?q=${q}&page=${page}&page_size=${page_size}&sort_order=${sort_order}&sort_by=${sort_by}&facets=${possibleFacets.join(
        ","
      )}&${facetQueries}`
    );
    const searchJson = await searchRes.json();
    previousItemId = query.previous ? searchJson.docs[query.previous].id : "";
    nextItemId = query.next ? searchJson.docs[query.next].id : "";
    searchItemCount = searchJson.docs.length;
  }

  return {
    currentFullUrl,
    previousItemId,
    nextItemId,
    searchItemCount,
    item: Object.assign({}, doc.sourceResource, {
      thumbnailUrl,
      contributor: doc.dataProvider,
      intermediateProvider: doc.intermediateProvider,
      date: date,
      language: language,
      partner: doc.provider.name,
      sourceUrl: doc.isShownAt,
      useDefaultImage: !doc.object,
      edmRights: doc.rights
    })
  };
};
export default ItemDetail;
