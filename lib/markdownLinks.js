const markdownLinks = (reference) => {
  const href = reference.$ref || reference.href;
  if (!href) return `[${reference.children[0]}]`;
  const className = isExternal(href) ? "external" : "";
  return (
    <a href={href} className={className}>
      {reference.children}
    </a>
  );
};

const isExternal = (href) =>
  href.indexOf("/") !== 0 &&
  href.indexOf("http") === 0 &&
  href.indexOf("http://dp.la") !== 0 &&
  href.indexOf("https://dp.la") !== 0 &&
  href.indexOf("http://pro.dp.la") !== 0 &&
  href.indexOf("https://pro.dp.la") !== 0;

export default markdownLinks;
