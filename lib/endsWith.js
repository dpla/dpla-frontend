const endsWith = (str, needle) =>
  str && typeof str === "string" ? str.endsWith(needle) : false;

export default endsWith;
