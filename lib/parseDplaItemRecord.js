// Takes a DPLA item record, a JSON response from the DPLA API.
// Returns the fields the exhibition GA events need.
// Names them as buildGaEvent expects.
// Values may be strings, arrays, or objects.
import getDataProviderName from "./getDataProviderName.js";

const parseDplaItemRecord = (dplaItemJson) => {
  const doc = dplaItemJson?.docs?.[0];
  const sourceResource = doc?.sourceResource;

  return {
    title: sourceResource?.title,
    partner: doc?.provider?.name,
    contributor: getDataProviderName(doc?.dataProvider),
    collection: sourceResource?.collection,
  };
};

export default parseDplaItemRecord;
