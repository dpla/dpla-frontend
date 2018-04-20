// hacky... use only in trusted places
const makeURLsClickable = (str, className) => {
  const clazz = arguments.length > 2 ? 'class="' + className + '" ' : "";
  return str.replace(
    /([h|H]ttps?:.+?)(\s|$)/g,
    (text, link) => "<a " + clazz + ' href="' + link + '">' + link + "</a>"
  );
};

export default makeURLsClickable;
