import { buildGaEvent } from "lib";

const clickThroughEvent = (item) =>
  buildGaEvent("Click Through", {
    itemId: item.id,
    title: item.title,
    partner: item.partner,
    contributor: item.contributor,
  });

export default clickThroughEvent;
