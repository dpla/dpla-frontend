export const possibleFacets = [
  "sourceResource.type",
  "sourceResource.subject.name",
  "sourceResource.spatial.name",
  "sourceResource.date.begin",
  "sourceResource.language.name",
  "dataProvider",
  "provider.name"
];

export const mapFacetsToURLPrettified = {
  "sourceResource.type": "type",
  "sourceResource.subject.name": "subject",
  "sourceResource.spatial.name": "location",
  "sourceResource.date.begin": "date",
  "sourceResource.language.name": "language",
  dataProvider: "provider",
  "provider.name": "partner"
};

export const mapURLPrettifiedFacetsToUgly = {
  type: "sourceResource.type",
  subject: "sourceResource.subject.name",
  location: "sourceResource.spatial.name",
  date: "sourceResource.date.begin",
  language: "sourceResource.language.name",
  provider: "dataProvider",
  partner: "provider.name"
};

export const prettifiedFacetMap = {
  "sourceResource.type": "Type",
  "sourceResource.subject.name": "Subject",
  "sourceResource.spatial.name": "Location",
  "sourceResource.language.name": "Language",
  "sourceResource.date.begin": "Date",
  dataProvider: "Contributing Institution",
  "provider.name": "Partner"
};

export const splitAndURIEncodeFacet = facet =>
  facet.split("|").map(param => encodeURIComponent(param)).join("+AND+");

export const DEFAULT_PAGE_SIZE = "20";
