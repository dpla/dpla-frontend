const removeQueryParams = (query, paramsToRemove) => {
  const dupedQuery = Object.assign({}, query);
  paramsToRemove.forEach(param => delete dupedQuery[param]);
  return dupedQuery;
};

export default removeQueryParams;
