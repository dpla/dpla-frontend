const MIN_LENGTH = 2;
const MAX_LENGTH = 200;

// Whether the API accepts a facet value from a /search URL, based on length
const isValidFacetQuery = (value) => {
  const apiValue = value.split("|").join(" AND ");
  return apiValue.length >= MIN_LENGTH && apiValue.length <= MAX_LENGTH;
};

export default isValidFacetQuery;
