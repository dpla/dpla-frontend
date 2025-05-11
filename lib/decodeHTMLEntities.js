const decodeHTMLEntities = (str) =>
  str.replace(/&#(\w+);/g, (m, n) => String.fromCharCode(n));

export default decodeHTMLEntities;
