import React from "react";
import fetch from "isomorphic-fetch";
import {withRouter} from "next/router";

import {parseCookies} from "nookies";

import MainLayout from "components/MainLayout";
import OptionsBar from "components/SearchComponents/OptionsBar";
import HarmfulContent from "components/shared/HarmfulContent";
import FiltersList from "components/SearchComponents/FiltersList";
import MainContent from "components/SearchComponents/MainContent";

import {
    getItemThumbnail,
    getSearchPageTitle,
    isBalanced
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

import {SITE_ENV, LOCAL_ID} from "constants/env";
import {LOCALS} from "constants/local";

import MaxPageError from "components/SearchComponents/MaxPageError";
import {washObject} from "lib/washObject";

class Search extends React.Component {
    state = {
        showSidebar: false
    };

    toggleFilters = () => {
        this.setState({showSidebar: !this.state.showSidebar});
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

        let itemCount = 0;// default handles unexpected error
        if ("count" in results) {
            if (results.count.value !== undefined) {
                itemCount = results.count.value // ElasticSearch 7
            } else {
                itemCount = results.count // ElasticSearch 6
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
                <HarmfulContent/>
                <FiltersList
                    showFilters={this.state.showSidebar}
                    onClickToggleFilters={this.toggleFilters}
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
                    facets={results.facets}
                    results={results.docs}
                    aboutness={aboutness}
                />}
                {currentPage > MAX_PAGE_SIZE &&
                <MaxPageError maxPage={MAX_PAGE_SIZE} requestedPage={currentPage}/>}
            </MainLayout>
        );
    }
}

export const getServerSideProps = async context => {
    const query = context.query;
    const isLocal = SITE_ENV === "local";
    let local = isLocal ? LOCALS[LOCAL_ID] : {};
    const isQA = parseCookies(context).hasOwnProperty("qa");

    if (query.q && !isBalanced(query.q)) {
        // User gave us something that will blow up, strip it out.
        query.q = query.q.replace(/['"\[\](){}]/, "")
    }

    const q = query.q
        ? encodeURIComponent(query.q.trim())
            .replace(/'/g, "%27")
            .replace(/"/g, "%22")
        : "";

    let filters = isLocal && local.filters ? local.filters : [];
    let tags = isLocal && local.tags ? local.tags : [];
    if (query.tags) {
        const queryTags =
            Array.isArray(query.tags)
                ? query.tags
                : new Array(query.tags);

        tags = tags.concat(queryTags);
    }

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
    if (isLocal && q.length > 0) {
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
        const aboutnessRes = await fetch(url);

        if (aboutnessRes.status !== 200) {
            aboutness = {docs: [], count: 0};

        } else {
            const aboutnessJson = await aboutnessRes.json();
            const aboutnessDocs = aboutnessJson.docs
                .map(result => {
                    const thumbnailUrl = getItemThumbnail(result);
                    return Object.assign({}, result.sourceResource, {
                        thumbnailUrl,
                        id: result.id ? result.id : result.sourceResource["@id"],
                        sourceUrl: result.isShownAt,
                        provider: result.provider && result.provider.name,
                        dataProvider: result.dataProvider && result.dataProvider.name,
                        useDefaultImage: !result.object
                    });
                })
                .splice(0, aboutness_max);
            const aboutnessCount = aboutnessJson.count;
            aboutness = {docs: aboutnessDocs, count: aboutnessCount};
        }
    }

    if (page <= MAX_PAGE_SIZE) {
        const numberOfActiveFacets = facetQueries
            .split(/(&|\+AND\+)/)
            .filter(facet => facet && facet !== "+AND+" && facet !== "&").length;

        const facetsParam = `&facets=${theseFacets.join(",")}&${facetQueries}`;
        const filtersParam = filters.map(x => `&filter=${x}`).join("");
        const tagsParam = tags.map(x => `&tags=${x}`).join("");
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

        // api response for facets
        let json = await res.json();
        const docs = json.docs.map(result => {
            const thumbnailUrl = getItemThumbnail(result);
            const dataProviderFromObj = result.dataProvider && 
                result.dataProvider.name;
            const dataProvider = dataProviderFromObj
                ? dataProviderFromObj
                : result.dataProvider;

            return Object.assign({}, result.sourceResource, {
                thumbnailUrl,
                id: result.id ? result.id : result.sourceResource["@id"],
                sourceUrl: result.isShownAt,
                provider: result.provider && result.provider.name,
                dataProvider: dataProvider,
                useDefaultImage: !result.object
            });
        });

        // fix facets because ES no longer returns them in the requested order
        let newFacets = {};
        theseFacets.forEach(facet => {
            if (json.facets[facet]) newFacets[facet] = json.facets[facet];
        });

        if (tags) {
            newFacets["tags"] = {
                "_type": "terms",
                "terms": tags
            };
        }

        json.facets = newFacets;

        const maxResults = MAX_PAGE_SIZE * page_size;
        const pageCount = json.count > maxResults ? maxResults : json.count;

        const props = washObject({
            results: Object.assign({}, json, {docs}),
            numberOfActiveFacets,
            currentPage: page,
            pageCount,
            pageSize: page_size,
            aboutness: aboutness
        });

        return {
            props: props
        };
    }
};

export default withRouter(Search);
