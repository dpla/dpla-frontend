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
import { API_ENDPOINT, THUMBNAIL_ENDPOINT } from "constants/items";
import { getCurrentUrl, getDefaultThumbnail } from "utilFunctions";

class Search extends React.Component {
  state = {
    showSidebar: false
  };

  toggleFilters = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  render() {
    const { url, results, numberOfActiveFacets } = this.props;
    return (
      <MainLayout isSearchPage={true} route={url}>
        <div className={classNames.wrapper}>
          <OptionsBar
            showFilters={this.state.showSidebar}
            currentPage={url.query.page || 1}
            route={url}
            itemCount={results.count}
            onClickToggleFilters={this.toggleFilters}
            numberOfActiveFacets={numberOfActiveFacets}
          />
          <FiltersList route={url} facets={results.facets} />
          <MainContent
            hideSidebar={!this.state.showSidebar}
            paginationInfo={{
              pageCount: results.count,
              pageSize: url.query.page_size || DEFAULT_PAGE_SIZE,
              currentPage: url.query.page || 1
            }}
            route={url}
            facets={results.facets}
            results={results.docs}
          />
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </MainLayout>
    );
  }
}

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

  const numberOfActiveFacets = facetQueries
    .split(/(&|\+AND\+)/)
    .filter(facet => facet && facet !== "+AND+" && facet !== "&").length;

  const json = await res.json();
  const docs = json.docs.map(result => {
    const thumbnailUrl = result.object
      ? `${currentUrl}${THUMBNAIL_ENDPOINT}/${result.id}`
      : getDefaultThumbnail(result.sourceResource.type);
    return Object.assign({}, result.sourceResource, {
      thumbnailUrl,
      sourceUrl: result.isShownAt,
      useDefaultImage: !result.object
    });
  });
  return { results: Object.assign({}, json, { docs }), numberOfActiveFacets };
};
export default Search;
