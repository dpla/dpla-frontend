const joinIfArray = (arrayOrString, separator = " ") => {
  if (Array.isArray(arrayOrString)) return arrayOrString.join(separator);
  if (arrayOrString !== null && typeof arrayOrString === "object") {
    const label = arrayOrString.name || arrayOrString.label || arrayOrString.prefLabel;
    return typeof label === "string" ? label : "";
  }
  return arrayOrString;
};

export default joinIfArray;
