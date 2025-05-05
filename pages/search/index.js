import React from "react";
import { withRouter } from "next/router";
import MainLayout from "components/MainLayout";
import HarmfulContent from "components/shared/HarmfulContent";
import OptionsBar from "components/SearchComponents/OptionsBar";
import FiltersList from "components/SearchComponents/FiltersList";
import MainContent from "components/SearchComponents/MainContent";

import { getItemThumbnail, getSearchPageTitle, isBalanced } from "lib";

import {
  possibleFacets,
  qaFacets,
  mapFacetsToURLPrettified,
  splitAndURIEncodeFacet,
  pageSizeOptions,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from "constants/search";

import { LOCALS } from "constants/local";

import MaxPageError from "components/SearchComponents/MaxPageError";
import { washObject } from "lib/washObject";
import FilterQueryError from "components/SearchComponents/FilterQueryError";

class Search extends React.Component {
  state = {
    showSidebar: false,
  };

  toggleFilters = () => {
    this.setState((prevState) => ({ showSidebar: !prevState.showSidebar }));
  };

  render() {
    const {
      router,
      results,
      numberOfActiveFacets,
      pageCount,
      currentPage,
      pageSize,
      aboutness,
      filterQueryError,
      maxPageError,
    } = this.props;

    let itemCount = 0; // default handles unexpected error
    if ("count" in results) {
      if (results.count.value !== undefined) {
        itemCount = results.count.value; // ElasticSearch 7
      } else {
        itemCount = results.count; // ElasticSearch 6
      }
    }

    return (
      <MainLayout
        isSearchPage={true}
        pageTitle={getSearchPageTitle(router.query.q)}
      >
        <OptionsBar
          showFilters={this.state.showSidebar}
          currentPage={currentPage}
          itemCount={itemCount}
          onClickToggleFilters={this.toggleFilters}
          numberOfActiveFacets={numberOfActiveFacets}
        />
        <HarmfulContent />
        <FiltersList
          showFilters={this.state.showSidebar}
          onClickToggleFilters={this.toggleFilters}
          facets={results.facets}
        />
        {currentPage <= MAX_PAGE_SIZE && (
          <MainContent
            hideSidebar={!this.state.showSidebar}
            paginationInfo={{
              pageCount: pageCount,
              pageSize: pageSize || DEFAULT_PAGE_SIZE,
              currentPage: currentPage,
            }}
            facets={results.facets}
            results={results.docs}
            aboutness={aboutness}
          />
        )}
        {maxPageError && (
          <MaxPageError maxPage={MAX_PAGE_SIZE} requestedPage={currentPage} />
        )}
        {filterQueryError && <FilterQueryError />}
      </MainLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;

  const query = context.query;
  const isLocal = siteEnv === "local";
  let local = isLocal ? LOCALS[localId] : {};
  const isQA = false;

  if (query.q && !isBalanced(query.q)) {
    // User gave us something that will blow up, strip it out.
    query.q = query.q.replace(/['"\[\](){}]/g, "");
  }

  if (query.q) {
    // unescaped slashes and colons will blow up the API query
    query.q = query.q.replace("/", "").replace(":", "");
  }

  let q = query.q
    ? encodeURIComponent(query.q.trim())
        .replace(/'/g, "%27")
        .replace(/"/g, "%22")
    : "";

  if (q.length > 200) {
    q = q.substring(0, 200);
  }

  let filters = isLocal && local.filters ? local.filters : [];
  let tags = isLocal && local.tags ? local.tags : [];
  if (query.tags) {
    const queryTags = Array.isArray(query.tags)
      ? query.tags
      : new Array(query.tags);

    tags = tags.concat(queryTags);
  }

  let hasDates = false;
  const theseFacets = isQA ? qaFacets : possibleFacets;

  const queryArray = theseFacets
    .map((facet) => {
      if (facet.indexOf("sourceResource.date") !== -1 && !hasDates) {
        hasDates = true; // do it only once for date queries
        // the date “facets” from ES do not map to the way the API expects requests
        // remove whatever is after the last period (“begin” or “end”)
        facet = facet.replace(".begin", "");
        facet = facet.replace(".end", "");
        // dates are special (also all those pretty/uglifiers should be one object instead of three but ¯\_(ツ)_/¯)
        let dateQuery = [];
        let beginYear = "";
        let endYear = "";
        if (query.before && !isNaN(Number(query.before))) {
          beginYear = Number(query.before);
          const beginYearString = String(beginYear).padStart(4, "0");
          dateQuery.push(`${facet}.before=${beginYearString}-01-01`);
        }
        if (query.after && !isNaN(Number(query.after))) {
          endYear = Number(query.after);
          const endYearString = String(endYear).padStart(4, "0");
          dateQuery.push(`${facet}.after=${endYearString}-12-31`);
        }
        return dateQuery.join("&");
      }
      // everyone else
      if (
        query[mapFacetsToURLPrettified[facet]] &&
        facet.indexOf("sourceResource.date") === -1
      ) {
        return `${facet}=${splitAndURIEncodeFacet(
          query[mapFacetsToURLPrettified[facet]],
        )}`;
      }
      return "";
    })
    .filter((facetQuery) => facetQuery !== "");

  const facetQueries = queryArray.join("&");

  const isUnfilteredQuery =
    (!q || q.length < 2) &&
    filters.length === 0 &&
    tags.length === 0 &&
    !facetQueries;

  if (isUnfilteredQuery) {
    return {
      props: {
        filterQueryError: true,
        results: [],
      },
    };
  }

  let sort_by = "";
  if (query.sort_by === "title") {
    sort_by = "sourceResource.title";
  } else if (query.sort_by === "created") {
    sort_by = "sourceResource.date.begin";
  }
  const sort_order = query.sort_order || "";

  let page_size = query.page_size || DEFAULT_PAGE_SIZE;
  const acceptedPageSizes = pageSizeOptions.map((item) => item.value);
  if (acceptedPageSizes.indexOf(page_size) === -1) {
    page_size = DEFAULT_PAGE_SIZE;
  }

  let page = query.page || 1;

  // get the aboutness links
  let aboutness = {};
  if (isLocal && q.length > 2) {
    const aboutness_max = 4;
    const provider = local["provider"];
    const location = local["locationFacet"];
    const subject = local["subjectFacet"];
    const apiKey = process.env.API_KEY;
    const apiUrl = process.env.API_URL;
    const query =
      `${encodeURIComponent(q)}%20AND%20` +
      `(sourceResource.spatial.name:${location}` +
      `%20OR%20sourceResource.subject.name:${subject})` +
      `%20AND%20NOT%20provider.name:${provider}&`;
    const url =
      `${apiUrl}/items?api_key=${apiKey}` +
      `&exact_field_match=true&q=${query}`;

    let aboutnessJson = { docs: [], count: 0 };
    try {
      const res = await fetch(url);
      if (res.ok) aboutnessJson = await res.json();
    } catch (error) {
      // Purposefully ignoring errors for aboutness requests
    }

    const aboutnessDocs = aboutnessJson.docs
      .map((result) => {
        const thumbnailUrl = getItemThumbnail(result);
        return {
          ...result.sourceResource,
          thumbnailUrl,
          id: result.id ? result.id : result.sourceResource["@id"],
          sourceUrl: result.isShownAt,
          provider: result.provider && result.provider.name,
          dataProvider: result.dataProvider && result.dataProvider.name,
          useDefaultImage: !result.object,
        };
      })
      .splice(0, aboutness_max);
    const aboutnessCount = aboutnessJson.count;
    aboutness = { docs: aboutnessDocs, count: aboutnessCount };
  }

  if (page > MAX_PAGE_SIZE) {
    return {
      props: {
        maxPageError: true,
        currentPage: page,
        results: [],
      },
    };
  } else {
    const numberOfActiveFacets = facetQueries
      .split(/(&|\+AND\+)/)
      .filter((facet) => facet && facet !== "+AND+" && facet !== "&").length;

    const facetsParam = `&facets=${theseFacets.join(",")}&${facetQueries}`;
    const filtersParam = filters.map((x) => `&filter=${x}`).join("");
    const tagsParam = tags.map((x) => `&tags=${x}`).join("");
    const url =
      `${process.env.API_URL}/items` +
      `?api_key=${process.env.API_KEY}` +
      `&exact_field_match=true` +
      `&q=${q}` +
      `&page=${page}` +
      `&page_size=${page_size}` +
      `&sort_order=${sort_order}` +
      `&sort_by=${sort_by}` +
      facetsParam +
      filtersParam +
      tagsParam;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();

    // api response for facets
    const docs = json.docs.map((result) => {
      const thumbnailUrl = getItemThumbnail(result);
      const dataProviderFromObj =
        result.dataProvider && result.dataProvider.name;
      const dataProvider = dataProviderFromObj || result.dataProvider;

      return {
        ...result.sourceResource,
        thumbnailUrl,
        id: result.id ? result.id : result.sourceResource["@id"],
        sourceUrl: result.isShownAt,
        provider: result.provider && result.provider.name,
        dataProvider: dataProvider,
        useDefaultImage: !result.object,
      };
    });

    // order facets per ui requirements
    const newFacets = {};
    theseFacets.forEach((facet) => {
      if (json.facets[facet]) newFacets[facet] = json.facets[facet];
    });

    if (tags) {
      newFacets["tags"] = {
        _type: "terms",
        terms: tags,
      };
    }

    json.facets = newFacets;

    const maxResults = MAX_PAGE_SIZE * page_size;
    const pageCount = json.count > maxResults ? maxResults : json.count;

    const props = washObject({
      results: { ...json, docs },
      numberOfActiveFacets,
      currentPage: page,
      pageCount,
      pageSize: page_size,
      aboutness: aboutness,
      filterQueryError: false,
    });

    return {
      props: props,
    };
  }
}

export default withRouter(Search);
