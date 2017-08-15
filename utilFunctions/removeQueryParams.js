const queryParamsToRemove = ["set", "source", "exhibition"];

const removeQueryParams = (query, paramsToRemove = []) => {
  const dupedQuery = Object.assign({}, query);
  [...queryParamsToRemove, ...paramsToRemove].forEach(
    param => delete dupedQuery[param]
  );
  return dupedQuery;
};

export default removeQueryParams;
