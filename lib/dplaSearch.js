import {getItemThumbnail} from "./index";
import {
    DEFAULT_PAGE_SIZE,
    mapFacetsToURLPrettified,
    MAX_PAGE_SIZE,
    pageSizeOptions,
    possibleFacets,
    qaFacets,
    splitAndURIEncodeFacet
} from "../constants/search";
import {API_ENDPOINT} from "../constants/items";
import fetch from "isomorphic-fetch";

const artifactSearchLocal = () => {}

const bookSearchUser = () => {}


// takes a query and optional parameters and translates it to an API search URL

function getFacetQueries(theseFacets, query) {
    let hasDates = false;
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

    return queryArray.join("&");
}

function getSortBy(query) {
    let sort_by = "";
    if (query.sort_by === "title") {
        sort_by = "sourceResource.title";
    } else if (query.sort_by === "created") {
        sort_by = "sourceResource.date.begin";
    }
    return sort_by;
}

function getPageSize(query) {
    const pageSizeArg = query.page_size || DEFAULT_PAGE_SIZE;
    const acceptedPageSizes = pageSizeOptions.map(item => item.value);
    if (acceptedPageSizes.indexOf(pageSizeArg) === -1) {
        return DEFAULT_PAGE_SIZE;
    } else {
        return pageSizeArg;
    }
}

function getQ(query) {
    return query.q
        ? encodeURIComponent(query.q.trim())
            .replace(/'/g, "%27")
            .replace(/"/g, "%22")
        : "";
}

function getPage(query) {
    return query.page || 1;
}

function getTagFilters(query, filters) {
    if (query.tags) {
        const tags = Array.isArray(query.tags) ? query.tags : new Array(query.tags);
        filters = filters.concat(tags.map(tag => `tags:${tag}`));
    }

    return filters;
}

function getSortOrder(query) {
    return query.sort_order || "";
}

async function performSearch(url) {
    const res = await fetch(url);
    const json = await res.json();
    const docs = json.docs.map(result => {
        const thumbnailUrl = getItemThumbnail(result);
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

    if (tags) {
        newFacets["tags"] = {
            "_type" : "terms",
            "terms" : tags
        };
    }

    json.facets = newFacets;

    const maxResults = MAX_PAGE_SIZE * pageSize;
    const pageCount = json.count > maxResults ? maxResults : json.count;

    return {
        results: Object.assign({}, json, { docs }),
        numberOfActiveFacets,
        currentPage: page,
        pageCount,
        pageSize: pageSize,
        aboutness: aboutness
    };
}

const artifactSearchUser = async (query, tags, isQA) => {

    const page = getPage(query);

    if (page > MAX_PAGE_SIZE) {
        // short circuit -- we're out of here
        return {}  // todo need more in the object?
    }

    const q = getQ(query);
    const filters = getTagFilters(query, [])
    const theseFacets = isQA ? qaFacets : possibleFacets;
    const facetQueries = getFacetQueries(theseFacets, query);
    const sortBy = getSortBy(query);
    const pageSize = getPageSize(query);
    const sortOrder = getSortOrder(query);


    const numberOfActiveFacets = facetQueries
        .split(/(&|\+AND\+)/)
        .filter(facet => facet && facet !== "+AND+" && facet !== "&").length;

    const facetsParam = `&facets=${theseFacets.join(",")}&${facetQueries}`;
    const filtersParam = filters.map(x => `&filter=${x}`).join("");
    const url = `${currentUrl}${API_ENDPOINT}?exact_field_match=true&q=${q}&page=${page}&page_size=${pageSize}&sort_order=${sortOrder}&sort_by=${sortBy}${facetsParam}${filtersParam}`;

}


const getFacetQuery = (query, facetList) => {
    let hasDates = false;
    return facetList
        .map(facet => {
            if (facet.indexOf("sourceResource.date") !== -1 && !hasDates) {
                hasDates = true; // do it only once for date queries
                // the date “facets” from ES do not map to the way the API expects requests
                // remove whatever is after the last periot (“begin” or “end”)
                facet = facet.replace(".begin", "");
                facet = facet.replace(".end", "");
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

            } else if (
                query[mapFacetsToURLPrettified[facet]] &&
                facet.indexOf("sourceResource.date") === -1
            ) {
                return `${facet}=${splitAndURIEncodeFacet(
                    query[mapFacetsToURLPrettified[facet]]
                )}`;

            } else {
                return "";
            }
        })
        .filter(facetQuery => facetQuery !== "")
        .join("&")
}
