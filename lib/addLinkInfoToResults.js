import extractItemId from "./extractItemId";

const addLinkInfoToResults = (results) =>
  results.map((item) => {
    return Object.assign({}, item, {
      linkHref: {
        pathname: `/item/${item.id ? item.id : extractItemId(item["@id"])}`,
      },
    });
  });

export default addLinkInfoToResults;
