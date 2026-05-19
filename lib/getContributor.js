// Given a source (i.e. JSON response from primary source sets API)
// return the contributor name.

const getContributor = source => {
  const provider = source?.mainEntity?.[0]?.provider;
  if (!Array.isArray(provider)) return "";
  const entry = provider.find(
    ref => ref.disambiguationDescription === "contributing institution"
  );
  return entry ? entry.name : "";
};

export default getContributor;
