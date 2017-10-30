import endsWith from "./endsWith";
import removeEndPunctuation from "./removeEndPunctuation";

const truncateString = (theString, length = 200, suffix = "…") => {
  if (!theString) return theString;
  let str = theString;
  if (str.length > length) {
    str = str.length > length ? str.substr(0, length) : str;
    str = removeEndPunctuation(str);
    str = str + suffix;
  }
  return str;
};

export default truncateString;
