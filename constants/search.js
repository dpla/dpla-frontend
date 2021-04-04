import { joinIfArray } from "lib";

export const tooltips = {
  "Unlimited Re-Use": {
    link: "/about/rights-categories#unlimited",
    text: "Items in this category have no known restrictions and may be freely used and modified without permission. Some attribution may be required depending on the specific rights statement applied to the item. Click for more info."
  },
  "Re-use With Conditions": {
    link: "/about/rights-categories#conditions",
    text: "Items in this category may be used and modified without permission as long as the user complies with stated conditions attached to the item. Click for more info."
  },
  "Re-use, No Modification": {
    link: "/about/rights-categories#no-modifications",
    text: "Items in this category may be used in their current form without permission, as long as the user complies with stated conditions attached to the item. Click for more info."
  },
  "Permission or Fair Use": {
    link: "/about/rights-categories#permission-fair-use",
    text: "Items in this category are in copyright with no restrictions waived (\"all rights reserved\"). Items may be used by seeking permission from the contributing institution or under fair use. Click for more info."
  },
  "Unspecified Rights Status": {
    link: "/about/rights-categories#unspecified",
    text: "Items in this category have not been evaluated for copyright status or their status is uncertain. Users may contact the institution which provided the digital object for more information. Click for more info."
  }
};

export const possibleFacets = [
  "rightsCategory",
  "sourceResource.type",
  "sourceResource.subject.name",
  "sourceResource.date.begin",
  "sourceResource.date.end",
  "sourceResource.spatial.name",
  "sourceResource.language.name",
  "admin.contributingInstitution",
  "provider.name"
];

// assumed to be a superset of possibleFacets,
// only active in QA mode
export const qaFacets = [
  "rightsCategory",
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
  intermediateProvider: "Intermediate Provider",
  rights: "Standardized Rights Statement",
  rightsCategory: "How Can I Use It?"
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
