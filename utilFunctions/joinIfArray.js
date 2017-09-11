const joinIfArray = arrayOrString =>
  Array.isArray(arrayOrString) ? arrayOrString.join(" ") : arrayOrString;

export default joinIfArray;
