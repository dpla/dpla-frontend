import collectionTitles from "./collectionTitles.js";
import joinIfArray from "./joinIfArray.js";

// GA4 event names use letters, digits and underscores.
// They start with a letter and stay under 40 characters.
// `label` is the event_category prefix of the legacy event lib/gtag.js sends.
export const GA_EVENTS = {
  ITEM_VIEW: { name: "item_view", label: "View Item" },
  CLICK_THROUGH: { name: "click_through", label: "Click Through" },
  BROWSE_ITEM: { name: "browse_item", label: "Browse Item" },
  EXHIBITION_ITEM_VIEW: {
    name: "exhibition_item_view",
    label: "View Exhibition Item",
  },
  PRIMARY_SOURCE_VIEW: {
    name: "primary_source_view",
    label: "View Primary Source",
  },
};

// Single owner of the GA item-event shape: { name, label, params }
// Callers pass raw record values
// Arrays and collection objects are flattened 
// Extra fields become GA4 parameters under their own names
// A core field wins over an extra with the same name
const buildGaEvent = (
  { name, label },
  { itemId, title, partner, contributor, collection, ...extra },
) => ({
  name,
  label,
  params: {
    ...extra,
    dpla_id: itemId,
    item_title: joinIfArray(title, ", "),
    partner: joinIfArray(partner, ", "),
    contributor: joinIfArray(contributor, ", "),
    collection: collectionTitles(collection),
  },
});

export default buildGaEvent;
