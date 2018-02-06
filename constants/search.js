export const possibleFacets = [
  "sourceResource.type",
  "sourceResource.subject.name",
  "sourceResource.spatial.name",
  "sourceResource.language.name",
  "intermediateProvider",
  "dataProvider",
  "provider.name"
];

export const mapFacetsToURLPrettified = {
  "sourceResource.type": "type",
  "sourceResource.subject.name": "subject",
  "sourceResource.spatial.name": "location",
  "sourceResource.language.name": "language",
  intermediateProvider: "provider",
  dataProvider: "dataProvider",
  "provider.name": "partner"
};

export const mapURLPrettifiedFacetsToUgly = {
  type: "sourceResource.type",
  subject: "sourceResource.subject.name",
  location: "sourceResource.spatial.name",
  language: "sourceResource.language.name",
  provider: "intermediateProvider",
  dataProvider: "dataProvider",
  partner: "provider.name"
};

export const splitAndURIEncodeFacet = facet =>
  facet.split("|").map(param => encodeURIComponent(param)).join("+AND+");

export const DEFAULT_PAGE_SIZE = "20";
