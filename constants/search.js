export const possibleFacets = [
  "sourceResource.type",
  "sourceResource.subject.name",
  "sourceResource.date.begin",
  "sourceResource.date.end",
  "sourceResource.spatial.name",
  "sourceResource.language.name",
  "admin.contributingInstitution",
  "provider.name"
];

export const mapFacetsToURLPrettified = {
  "sourceResource.type": "type",
  "sourceResource.subject.name": "subject",
  "sourceResource.date.begin": "after",
  "sourceResource.date.end": "before",
  "sourceResource.spatial.name": "location",
  "sourceResource.language.name": "language",
  "admin.contributingInstitution": "provider",
  "provider.name": "partner"
};

export const mapURLPrettifiedFacetsToUgly = {
  type: "sourceResource.type",
  subject: "sourceResource.subject.name",
  after: "sourceResource.date.begin",
  before: "sourceResource.date.end",
  location: "sourceResource.spatial.name",
  language: "sourceResource.language.name",
  provider: "admin.contributingInstitution",
  partner: "provider.name"
};

export const prettifiedFacetMap = {
  "sourceResource.type": "Type",
  "sourceResource.subject.name": "Subject",
  "sourceResource.spatial.name": "Location",
  "sourceResource.date.begin": "Date",
  "sourceResource.date.end": "Date",
  "sourceResource.language.name": "Language",
  "admin.contributingInstitution": "Contributing Institution",
  "provider.name": "Partner"
};

import { joinIfArray } from "utilFunctions";

export const splitAndURIEncodeFacet = facet =>
  joinIfArray(facet)
    .split("|")
    .map(param => encodeURIComponent(param))
    .join("+AND+");

export const DEFAULT_PAGE_SIZE = "20";
