import extractItemId from "./extractItemId";

// Given source (i.e. JSON response from PSS API)
// return item's DPLA ID
const getItemId = source =>
  extractItemId(
    source.mainEntity[0]["dct:references"].filter(
      ref => ref["@type"] === "ore:Aggregation"
    )[0]["@id"]
  );

export default getItemId;
