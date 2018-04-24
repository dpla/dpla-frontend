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
import { DEFAULT_PAGE_SIZE } from "constants/search";
import { API_ENDPOINT, THUMBNAIL_ENDPOINT } from "constants/items";

import { getCurrentUrl, getDefaultThumbnail, getSearchPageTitle } from "lib";

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
      <MainLayout
        isSearchPage={true}
        route={url}
        pageTitle={getSearchPageTitle(url.query.q)}
      >
        <OptionsBar
          showFilters={this.state.showSidebar}
          currentPage={url.query.page || 1}
          route={url}
          itemCount={results.count}
          onClickToggleFilters={this.toggleFilters}
          numberOfActiveFacets={numberOfActiveFacets}
        />
        <FiltersList
          showFilters={this.state.showSidebar}
          onClickToggleFilters={this.toggleFilters}
          route={url}
          facets={results.facets}
        />
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
      </MainLayout>
    );
  }
}

Search.getInitialProps = async ({ query, req }) => {
  const currentUrl = getCurrentUrl(req);
  const q = query.q
    ? encodeURIComponent(query.q).replace(/'/g, "%27").replace(/"/g, "%22")
    : "";
  const page_size = query.page_size || DEFAULT_PAGE_SIZE;
  const page = query.page || 1;
  let sort_by = "";
  if (query.sort_by === "title") {
    sort_by = "sourceResource.title";
  } else if (query.sort_by === "created") {
    sort_by = "sourceResource.date.begin";
  }
  const sort_order = query.sort_order || "";

  let hasDates = false;

  const facetQueries = possibleFacets
    .map(facet => {
      if (facet.indexOf("sourceResource.date") !== -1 && !hasDates) {
        hasDates = true; // do it only once for date queries
        // the date “facets” from ES do not map to the way the API expects requests
        // remove whatever is after the last periot (“begin” or “end”)
        facet = facet.replace(".begin", "");
        facet = facet.replace(".end", "");
        // dates are special (also all those pretty/uglifiers shold be one object instead of three but ¯\_(ツ)_/¯)
        let dateQuery = [];
        let beginYear = "";
        let endYear = "";
        if (query.after && !isNaN(Number(query.after))) {
          beginYear = Number(query.after);
          dateQuery.push(`${facet}.after=${beginYear}-01-01`);
        }
        if (query.before && !isNaN(Number(query.before))) {
          endYear = Number(query.before);
          dateQuery.push(`${facet}.before=${endYear}-12-31`);
        }
        return dateQuery.join("&");
      }
      // everyone else
      if (
        query[mapFacetsToURLPrettified[facet]] &&
        facet.indexOf("sourceResource.date") === -1
      ) {
        return `${facet}=${splitAndURIEncodeFacet(
          query[mapFacetsToURLPrettified[facet]]
        )}`;
      }
      return "";
    })
    .filter(facetQuery => facetQuery !== "")
    .join("&");

  const url = `${currentUrl}${API_ENDPOINT}?exact_field_match=true&q=${q}&page=${page}&page_size=${page_size}&sort_order=${sort_order}&sort_by=${sort_by}&facets=${possibleFacets.join(
    ","
  )}&${facetQueries}`;

  const res = await fetch(url);

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
      id: result.id ? result.id : result.sourceResource["@id"],
      sourceUrl: result.isShownAt,
      provider: result.provider && result.provider.name,
      dataProvider: result.dataProvider,
      useDefaultImage: !result.object
    });
  });

  return { results: Object.assign({}, json, { docs }), numberOfActiveFacets };
};
export default Search;
