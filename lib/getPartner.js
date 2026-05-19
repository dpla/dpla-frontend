// Given a source (i.e. JSON response from primary source sets API)
// return the partner name.

const getPartner = source => {
  const provider = source?.mainEntity?.[0]?.provider;
  if (!Array.isArray(provider)) return "";
  const entry = provider.find(
    ref => ref.disambiguationDescription === "partner"
  );
  return entry?.name ?? "";
};

export default getPartner;
