import { joinIfArray } from "lib";

export const possibleFacets = [
  "sourceResource.type",
  "sourceResource.subject.name",
  "sourceResource.date.begin",
  "sourceResource.date.end",
  "sourceResource.spatial.name",
  "sourceResource.language.name",
  "admin.contributingInstitution",
  "provider.name",
  "rightsCategory"
];

// assumed to be a superset of possibleFacets,
// only active in QA mode
export const qaFacets = [
  "sourceResource.type",
  "sourceResource.subject.name",
  "sourceResource.date.begin",
  "sourceResource.date.end",
  "sourceResource.spatial.name",
  "sourceResource.language.name",
  "sourceResource.collection.title",
  "admin.contributingInstitution",
  "provider.name",
  "intermediateProvider",
  "rightsCategory",
  "rights"
];

export const mapFacetsToURLPrettified = {
  "sourceResource.type": "type",
  "sourceResource.subject.name": "subject",
  "sourceResource.date.begin": "after",
  "sourceResource.date.end": "before",
  "sourceResource.spatial.name": "location",
  "sourceResource.language.name": "language",
  "sourceResource.collection.name": "collection",
  "admin.contributingInstitution": "provider",
  "provider.name": "partner",
  rightsCategory: "rightsCategory",
  intermediateProvider: "intermediateProvider",
  rights: "standardizedRightsStatement",
  tags: "tags"
};

export const mapURLPrettifiedFacetsToUgly = {
  type: "sourceResource.type",
  subject: "sourceResource.subject.name",
  after: "sourceResource.date.begin",
  before: "sourceResource.date.end",
  location: "sourceResource.spatial.name",
  language: "sourceResource.language.name",
  rightsCategory: "rightsCategory",
  collection: "sourceResource.collection.title",
  provider: "admin.contributingInstitution",
  partner: "provider.name",
  intermediateProvider: "intermediateProvider",
  standardizedRightsStatement: "rights",
  tags: "tags"
};

export const prettifiedFacetMap = {
  "sourceResource.type": "Type",
  "sourceResource.subject.name": "Subject",
  "sourceResource.spatial.name": "Location",
  "sourceResource.date.begin": "Date",
  "sourceResource.date.end": "Date",
  "sourceResource.language.name": "Language",
  "sourceResource.collection.title": "Collection",
  "admin.contributingInstitution": "Contributing Institution",
  "provider.name": "Partner",
  rightsCategory: "How Can I Use It?",
  intermediateProvider: "Intermediate Provider",
  rights: "Standardized Rights Statement"
};

export const pageSizeOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" }
];

export const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "a_to_z", label: "A–Z" },
  { value: "z_to_a", label: "Z-A" },
  { value: "old_to_new", label: "Oldest to Newest" },
  { value: "new_to_old", label: "Newest to Oldest" }
];

export const mapSortOptionsToParams = {
  a_to_z: {
    sort_by: "title",
    sort_order: "asc"
  },
  z_to_a: {
    sort_by: "title",
    sort_order: "desc"
  },
  old_to_new: {
    sort_by: "created",
    sort_order: "asc"
  },
  new_to_old: {
    sort_by: "created",
    sort_order: "desc"
  },
  relevance: {
    sort_by: "",
    sort_order: ""
  }
};

export const getSortOptionFromParams = ({ sortBy, sortOrder }) => {
  if (sortBy === "created") {
    return sortOrder === "asc" ? "old_to_new" : "new_to_old";
  } else if (sortBy === "title") {
    return sortOrder === "asc" ? "a_to_z" : "z_to_a";
  } else {
    return "relevance";
  }
};

export const splitAndURIEncodeFacet = facet =>
  joinIfArray(facet, "|")
    .split("|")
    .map(param => encodeURIComponent(param))
    .join("+AND+");

export const DEFAULT_PAGE_SIZE = "20";

export const MAX_PAGE_SIZE = 100;
