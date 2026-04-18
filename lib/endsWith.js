const endsWith = (str, needle) =>
  typeof str === "string" ? str.endsWith(needle) : false;

export default endsWith;
