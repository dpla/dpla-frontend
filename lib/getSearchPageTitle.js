// Text for meta title elements for the search page.

const getSearchPageTitle = (queryTerms) => {
  const pageTitle =
    queryTerms === undefined || queryTerms === ""
      ? "Search Results"
      : `${queryTerms} | Search Results`;

  return pageTitle;
};

export default getSearchPageTitle;
