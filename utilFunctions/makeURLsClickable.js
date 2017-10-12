// hacky... use only in trusted places
const makeURLsClickable = str =>
  str.replace(/(http.+?)(\s|$)/g, (text, link) => '<a href="'+ link +'">'+ link +'</a>');

export default makeURLsClickable;
