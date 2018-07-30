import extractItemId from "./extractItemId";
import removeQueryParams from "./removeQueryParams";

const addLinkInfoToResults = (results, query) =>
  results.map((item, idx) => {
    // const previous = idx > 0 ? idx - 1 : "";
    // const next = idx < results.length - 1 ? idx + 1 : null;
    return Object.assign({}, item, {
      linkHref: {
        pathname: "/item",
        query: {
          ...query,
          itemId: item.id ? item.id : extractItemId(item["@id"])
        } //, previous, next }
      },
      linkAs: {
        pathname: `/item/${item.id ? item.id : extractItemId(item["@id"])}`,
        query: Object.assign({}, removeQueryParams(query, ["itemId", "list"])) //, {
        //   next,
        //   previous
        // })
      }
    });
  });

export default addLinkInfoToResults;
