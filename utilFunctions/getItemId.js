import extractItemId from "./extractItemId";

// Given source (i.e. JSON response from PSS API)
// return item's DPLA ID
const getItemId = source => {
  try {
    const id = extractItemId(
      source.mainEntity[0]["dct:references"].filter(
        ref => ref["@type"] === "ore:Aggregation"
      )[0]["@id"]
    );
    return id;
  } finally {
    return "";
  }
};

export default getItemId;
