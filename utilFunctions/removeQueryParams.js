const queryParams = ["set", "source"];

const removeQueryParams = query => {
  const dupedQuery = Object.assign({}, query);
  queryParams.forEach(param => delete dupedQuery[param]);
  return dupedQuery;
};

export default removeQueryParams;
