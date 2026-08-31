import extractItemId from "./extractItemId.js";

// The DPLA item id of a PSS source (a JSON response from the PSS API)
// First choice: the ore:Aggregation reference
// Fallback: a dp.la item URL inside the citation text
const getItemId = (source) => {
  const references = source?.mainEntity?.[0]?.["dct:references"];
  if (Array.isArray(references)) {
    const aggregation = references.find(
      (ref) => ref?.["@type"] === "ore:Aggregation",
    );
    const id = aggregation ? extractItemId(aggregation["@id"]) : null;
    if (id) return id;
  }
  const citations = source?.mainEntity?.[0]?.citation;
  for (const entry of Array.isArray(citations) ? citations : []) {
    const match = /dp\.la\/item\/([0-9a-f]{32})/.exec(entry?.text ?? "");
    if (match) return match[1];
  }
  return "";
};

export default getItemId;
