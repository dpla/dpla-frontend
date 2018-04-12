import endsWith from "./endsWith";
import removeEndPunctuation from "./removeEndPunctuation";
import joinIfArray from "./joinIfArray";

const truncateString = (theString, length = 200, suffix = "…") => {
  if (!theString) return theString;
  let str = joinIfArray(theString);
  if (str.length > length) {
    str = str.length > length ? str.substr(0, length) : str;
    str = removeEndPunctuation(str);
    str = str + suffix;
  }
  return str;
};

export default truncateString;
