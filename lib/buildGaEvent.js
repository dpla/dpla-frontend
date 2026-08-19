import joinIfArray from "./joinIfArray";

// Single owner of the GA item-event shape
const buildGaEvent = (type, { itemId, title, partner, contributor }) => ({
  type,
  itemId,
  title: joinIfArray(title, ", "),
  partner: joinIfArray(partner, ", "),
  contributor: joinIfArray(contributor, ", "),
});

export default buildGaEvent;
