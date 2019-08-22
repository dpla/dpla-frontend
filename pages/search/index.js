import React from "react";
import fetch from "isomorphic-fetch";
import { withRouter } from "next/router";

import { parseCookies } from "nookies";

import MainLayout from "components/MainLayout";
import OptionsBar from "components/SearchComponents/OptionsBar";
import FiltersList from "components/SearchComponents/FiltersList";
import MainContent from "components/SearchComponents/MainContent";

import {
  getCurrentUrl,
  getDefaultThumbnail,
  getSearchPageTitle,
  joinIfArray
} from "lib";

import {
  possibleFacets,
  qaFacets,
  mapFacetsToURLPrettified,
  splitAndURIEncodeFacet,
  pageSizeOptions,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE
} from "constants/search";
import {
  API_ENDPOINT,
  THUMBNAIL_ENDPOINT,
  LOCAL_ABOUT_ENDPOINT
} from "constants/items";
import { SITE_ENV, LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

import MaxPageError from "components/SearchComponents/MaxPageError";

class Search extends React.Component {
  state = {
    showSidebar: false
  };

  toggleFilters = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  render() {
    const {
      router,
      results,
      numberOfActiveFacets,
      pageCount,
      currentPage,
      pageSize,
      aboutness
    } = this.props;

    var itemCount = 0 // default handles unexpected error
    if ("count" in results) {
      if (results.count.value != undefined) {
        itemCount = results.count.value // ElasticSearch 7
      } else {
        itemCount = results.count // ElasticSearch 6
      }
    }

    return (
      <MainLayout
        isSearchPage={true}
        route={router}
        pageTitle={getSearchPageTitle(router.query.q)}
      >
        <OptionsBar
          showFilters={this.state.showSidebar}
          currentPage={currentPage}
          route={router}
          itemCount={itemCount}
          onClickToggleFilters={this.toggleFilters}
          numberOfActiveFacets={numberOfActiveFacets}
        />
        <FiltersList
          showFilters={this.state.showSidebar}
          onClickToggleFilters={this.toggleFilters}
          route={router}
          facets={results.facets}
        />
        {currentPage <= MAX_PAGE_SIZE &&
          <MainContent
            hideSidebar={!this.state.showSidebar}
            paginationInfo={{
              pageCount: pageCount,
              pageSize: pageSize || DEFAULT_PAGE_SIZE,
              currentPage: currentPage
            }}
            route={router}
            facets={results.facets}
            results={results.docs}
            aboutness={aboutness}
          />}
        {currentPage > MAX_PAGE_SIZE &&
          <MaxPageError maxPage={MAX_PAGE_SIZE} requestedPage={currentPage} />}
      </MainLayout>
    );
  }
}

Search.getInitialProps = async context => {
  const query = context.query;
  const req = context.req;
  const isLocal = SITE_ENV === "local";
  const isQA = parseCookies(context).hasOwnProperty("qa");
  const currentUrl = getCurrentUrl(req);
  const q = query.q
    ? encodeURIComponent(query.q).replace(/'/g, "%27").replace(/"/g, "%22")
    : "";

  let hasDates = false;
  const theseFacets = isQA ? qaFacets : possibleFacets;

  const queryArray = theseFacets
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
    .filter(facetQuery => facetQuery !== "");

  if (isLocal) {
    queryArray.push(`provider.name=${LOCALS[LOCAL_ID].provider}`);
  }

  const facetQueries = queryArray.join("&");

  let sort_by = "";
  if (query.sort_by === "title") {
    sort_by = "sourceResource.title";
  } else if (query.sort_by === "created") {
    sort_by = "sourceResource.date.begin";
  }
  const sort_order = query.sort_order || "";

  let page_size = query.page_size || DEFAULT_PAGE_SIZE;
  const acceptedPageSizes = pageSizeOptions.map(item => item.value);
  if (acceptedPageSizes.indexOf(page_size) === -1) {
    page_size = DEFAULT_PAGE_SIZE;
  }

  let page = query.page || 1;

  // get the aboutness links
  let aboutness = {};
  if (isLocal) {
    const aboutness_max = 4;
    const aboutnessUrl = `${currentUrl}${LOCAL_ABOUT_ENDPOINT}?q=${q}`;
    const aboutnessRes = await fetch(aboutnessUrl);
    if (aboutnessRes.status != 200) {
      aboutness = { docs: [], count: 0 };
    } else {
      const aboutnessJson = await aboutnessRes.json();
      const aboutnessDocs = aboutnessJson.docs
        .map(result => {
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
        })
        .splice(0, aboutness_max);
      const aboutnessCount = aboutnessJson.count;
      aboutness = { docs: aboutnessDocs, count: aboutnessCount };
    }
  }

  if (page <= MAX_PAGE_SIZE) {
    const numberOfActiveFacets = facetQueries
      .split(/(&|\+AND\+)/)
      .filter(facet => facet && facet !== "+AND+" && facet !== "&").length;

    const url = `${currentUrl}${API_ENDPOINT}?exact_field_match=true&q=${q}&page=${page}&page_size=${page_size}&sort_order=${sort_order}&sort_by=${sort_by}&facets=${theseFacets.join(
      ","
    )}&${facetQueries}`;

    const res = await fetch(url);

    let json = await res.json();
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

    // fix facets because ES no longer returns them in the requested order
    let newFacets = {};
    theseFacets.forEach(facet => {
      if (json.facets[facet]) newFacets[facet] = json.facets[facet];
    });
    json.facets = newFacets;

    const maxResults = MAX_PAGE_SIZE * page_size;
    const pageCount = json.count > maxResults ? maxResults : json.count;

    return {
      results: Object.assign({}, json, { docs }),
      numberOfActiveFacets,
      currentPage: page,
      pageCount,
      pageSize: page_size,
      aboutness: aboutness
    };
  }
};

export default withRouter(Search);
