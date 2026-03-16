const joinIfArray = (arrayOrString, separator = " ") => {
  if (Array.isArray(arrayOrString)) return arrayOrString.join(separator);
  if (arrayOrString !== null && typeof arrayOrString === "object") return "";
  return arrayOrString;
};

export default joinIfArray;
