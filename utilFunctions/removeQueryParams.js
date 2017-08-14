const queryParamsToRemove = ["set", "source", "exhibition"];

const removeQueryParams = query => {
  const dupedQuery = Object.assign({}, query);
  queryParamsToRemove.forEach(param => delete dupedQuery[param]);
  return dupedQuery;
};

export default removeQueryParams;
