const joinIfArray = (arrayOrString, separator = " ") =>
  Array.isArray(arrayOrString) ? arrayOrString.join(separator) : arrayOrString;

export default joinIfArray;
