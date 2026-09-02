import joinIfArray from "./joinIfArray.js";

// Titles from a record's sourceResource.collection.
// The field can be one object or an array of objects.
// A title can itself be an array.
// Strings pass through, so a page can flatten on the server first.
const collectionTitles = (collection) =>
  []
    .concat(collection ?? [])
    .map((entry) =>
      typeof entry === "string" ? entry : joinIfArray(entry?.title, ", "),
    )
    .filter(Boolean)
    .join(", ");

export default collectionTitles;
