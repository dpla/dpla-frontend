// Given a source (i.e. JSON response from primary source sets API)
// return the partner name.

const getPartner = source => {
  const provider = source.mainEntity[0]["provider"]
    ? source.mainEntity[0]["provider"]
    : "";
  let providerName = "";
  if (provider instanceof Array) {
    // This works with a more recent iteration of the PSS API.
    providerName = provider.filter(
      ref => ref["disambiguationDescription"] == "partner"
    )[0]["name"];
  } else {
    // This works with the original version of the PSS API.
    providerName = provider.name;
  }
  return providerName;
};

export default getPartner;
