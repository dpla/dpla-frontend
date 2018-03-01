const endsWith = (str, needle) =>
  str ? str.lastIndexOf(needle) === str.length - needle.length : str;

export default endsWith;
