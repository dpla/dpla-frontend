import extractItemId from "./extractItemId";
import removeQueryParams from "./removeQueryParams";

const addLinkInfoToResults = (results, query, pagePath) => {
    pagePath = "/" + (pagePath ?? "item");

    return results.map((item) => {
        return Object.assign({}, item, {
            linkHref: {
                pathname: pagePath,
                query: {
                    ...query,
                    itemId: item.id ? item.id : extractItemId(item["@id"])
                }
            },
            linkAs: {
                pathname: `${pagePath}/${item.id ? item.id : extractItemId(item["@id"])}`,
                query: Object.assign({}, removeQueryParams(query, ["itemId", "list"]))
            }
        });
    });
}

export default addLinkInfoToResults;
