// Given a source (i.e. JSON response from primary source sets API)
// return the contributor name.

const getContributor = (source) => {
  let contributor = "";
  try {
    contributor = source.mainEntity[0]["provider"].filter(
      (ref) => ref["disambiguationDescription"] == "contributing institution",
    )[0]["name"];
  } catch (e) {}
  return contributor;
};

export default getContributor;
