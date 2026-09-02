import { buildGaEvent, GA_EVENTS } from "lib";

// Fields shared by every GA event an item page fires
const fields = (item) => ({
  itemId: item.id,
  title: item.title,
  partner: item.partner,
  contributor: item.contributor,
  collection: item.collection,
});

export const itemViewEvent = (item) =>
  buildGaEvent(GA_EVENTS.ITEM_VIEW, fields(item));

export const clickThroughEvent = (item) =>
  buildGaEvent(GA_EVENTS.CLICK_THROUGH, fields(item));
