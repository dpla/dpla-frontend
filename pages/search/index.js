import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import OptionsBar from "components/SearchComponents/OptionsBar";
import FiltersList from "components/SearchComponents/FiltersList";
import MainContent from "components/SearchComponents/MainContent";
import {
  possibleFacets,
  mapFacetsToURLPrettified,
  splitAndURIEncodeFacet
} from "constants/search";
import {
  classNames,
  stylesheet
} from "components/SearchComponents/SearchComponents.css";
import { DEFAULT_PAGE_SIZE } from "constants/search";
import { API_ENDPOINT } from "constants/items";
import { getCurrentUrl } from "utilFunctions";

const Search = ({ url, results }) =>
  <MainLayout route={url}>
    <div className={classNames.wrapper}>
      <OptionsBar route={url} itemCount={results.count} />
      <FiltersList route={url} facets={results.facets} />
      <MainContent
        paginationInfo={{
          pageCount: results.count,
          pageSize: url.query.page_size || DEFAULT_PAGE_SIZE,
          currentPage: url.query.page || 1
        }}
        route={url}
        facets={results.facets}
        results={results.docs.map(doc =>
          Object.assign({}, doc.sourceResource, {
            thumbnailUrl: Array.isArray(doc.object)
              ? doc.object[0]
              : doc.object,
            sourceUrl: doc.isShownAt
          })
        )}
      />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

Search.getInitialProps = async ({ query, req }) => {
  const currentUrl = getCurrentUrl(req);
  const q = query.q || "";
  const page_size = query.page_size || DEFAULT_PAGE_SIZE;
  const page = query.page || 1;
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

  const res = await fetch(
    `${currentUrl}${API_ENDPOINT}?q=${q}&page=${page}&page_size=${page_size}&sort_order=${sort_order}&sort_by=${sort_by}&facets=${possibleFacets.join(
      ","
    )}&${facetQueries}`
  );

  const json = await res.json();
  return { results: json };
};
export default Search;
