// Given a DPLA item record (i.e. a JSON response from the DPLA API)
// Return parsed values from the record.
// Return values may be strings or arrays.
const parseDplaItemRecord = dplaItemJson => {
  const doc = dplaItemJson && dplaItemJson.docs && dplaItemJson.docs[0];
  const sourceResource = doc && doc.sourceResource;
  const dataProviderFromObj = doc && doc.dataProvider && doc.dataProvider.name;
  const dataProvider = dataProviderFromObj 
    ? dataProviderFromObj
    : doc && doc.dataProvider;

  return {
    partner: doc && doc.provider && doc.provider.name,
    dataProvider: dataProvider,
    title: sourceResource && sourceResource.title
  };
};

export default parseDplaItemRecord;
