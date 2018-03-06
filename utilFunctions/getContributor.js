// Given a source (i.e. JSON response from primary source sets API)
// return the contributor name.

const getContributor = source => {
  try {
    const contributor = source.mainEntity[0]["provider"].filter(
      ref => ref["disambiguationDescription"] == "contributing institution"
    )[0]["name"];
    return contributor;
  } finally {
    return "";
  }
};

export default getContributor;
