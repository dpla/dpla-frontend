import endsWith from "./endsWith";

const removeEndPunctuation = theString => {
  if (!theString) return theString;
  let str = theString;
  str = str.length >= 1 &&
    (endsWith(str, " ") ||
      endsWith(str, ".") ||
      endsWith(str, ",") ||
      endsWith(str, ":") ||
      endsWith(str, ";") ||
      endsWith(str, "…"))
    ? str.slice(0, str.length - 1)
    : str;
  return str;
};

export default removeEndPunctuation;
