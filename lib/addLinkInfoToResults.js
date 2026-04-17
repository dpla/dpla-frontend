import extractItemId from "./extractItemId";

const addLinkInfoToResults = (results) =>
  results.map((item) => {
    const id = extractItemId(item.id) || extractItemId(item["@id"]);
    return Object.assign({}, item, {
      linkHref: id ? { pathname: `/item/${id}` } : null,
    });
  });

export default addLinkInfoToResults;
