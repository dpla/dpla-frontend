// hacky... use only in trusted places
const makeURLsClickable = (str, className) =>
  str.replace(/([h|H]ttps?:.+?)(\s|$)/g, (text, link) => '<a class="' + className + '" href="' + link + '">' + link + '</a>');

export default makeURLsClickable;
