export const possibleFacets = [
  "sourceResource.type",
  "sourceResource.subject.name",
  "sourceResource.spatial.name",
  "sourceResource.language.name",
  "dataProvider",
  "provider.name"
];

export const mapFacetsToURLPrettified = {
  "sourceResource.type": "type",
  "sourceResource.subject.name": "subject",
  "sourceResource.spatial.name": "location",
  "sourceResource.language.name": "language",
  dataProvider: "provider",
  "provider.name": "partner"
};

export const mapURLPrettifiedFacetsToUgly = {
  type: "sourceResource.type",
  subject: "sourceResource.subject.name",
  location: "sourceResource.spatial.name",
  language: "sourceResource.language.name",
  provider: "dataProvider",
  partner: "provider.name"
};

export const splitAndURIEncodeFacet = facet =>
  facet.split("|").map(param => encodeURIComponent(param)).join("+AND+");
