const truncateString = (theString, length = 200, suffix = "…") => {
  let str = theString;
  if (str.length > length) {
    str = str.length > length ? str.substr(0, length) : str;
    str = str.length >= length &&
      (str.endsWith(" ") ||
        str.endsWith(".") ||
        str.endsWith(",") ||
        str.endsWith("…"))
      ? str.slice(0, str.length - 1) + suffix
      : str + suffix;
  }
  return str;
};

export default truncateString;
