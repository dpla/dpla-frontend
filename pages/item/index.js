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
  paginationInfo,
  searchItemCount
}) =>
  <MainLayout route={url} pageTitle={item.title}>
    <BreadcrumbsModule
      searchItemCount={searchItemCount}
      paginationInfo={paginationInfo}
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
  const page_size = parseInt(query.page_size, 10) || DEFAULT_PAGE_SIZE;
  const page = parseInt(query.page, 10) || 1;
  const q = query.q;

  let previousItemPage = page;
  let nextItemPage = page;
  let previousItemId;
  let nextItemId;
  let searchItemCount;
  if (query.next || query.previous) {
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

    let currentPage = page;
    if (query.previous % page_size === 0) {
      currentPage = page + 1;
    }

    const searchRes = await fetch(
      `${currentUrl}${API_ENDPOINT}?q=${q}&page=${currentPage}&page_size=${page_size}&sort_order=${sort_order}&sort_by=${sort_by}&facets=${possibleFacets.join(
        ","
      )}&${facetQueries}`
    );
    const searchJson = await searchRes.json();
    searchItemCount = searchJson.count;

    const nextIdx = query.next % page_size;
    if (
      query.next > page * page_size - 1 &&
      searchItemCount > page * page_size
    ) {
      nextItemPage = page + 1;
      const nextPageRes = await fetch(
        `${currentUrl}${API_ENDPOINT}?q=${q}&page=${nextItemPage}&page_size=${page_size}&sort_order=${sort_order}&sort_by=${sort_by}&facets=${possibleFacets.join(
          ","
        )}&${facetQueries}`
      );
      const nextPageJson = await nextPageRes.json();
      nextItemId = nextPageJson.docs[nextIdx].id;
    } else {
      nextItemId = query.next ? searchJson.docs[nextIdx].id : "";
    }

    const previousIdx = query.previous % page_size;
    if (query.previous < page * page_size - 1 && page - 1 > 0) {
      previousItemPage = page - 1;
      const previousPageRes = await fetch(
        `${currentUrl}${API_ENDPOINT}?q=${q}&page=${previousItemPage}&page_size=${page_size}&sort_order=${sort_order}&sort_by=${sort_by}&facets=${possibleFacets.join(
          ","
        )}&${facetQueries}`
      );
      const previousPageJson = await previousPageRes.json();
      previousItemId = previousPageJson.docs[previousIdx].id;
    } else {
      previousItemId = query.previous ? searchJson.docs[previousIdx].id : "";
    }
  }

  return {
    currentFullUrl,
    paginationInfo: {
      next: {
        id: nextItemId,
        page: nextItemPage
      },
      previous: {
        id: previousItemId,
        page: previousItemPage
      }
    },
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
