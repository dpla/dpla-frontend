export const markdownLinks = reference => {
  const href = reference.$ref || reference.href;
  if (!href) return `[${reference.children[0]}]`;
  const className = isExternal(href) ? "external" : "";
  return (
    <a href={href} className={className}>
      {reference.children}
    </a>
  );
};

export const wordpressLinks = links => {
  for (var i = 0; i < links.length; i++) {
    var link = links.item(i);
    if (
      !link.classList.contains("btn") &&
      link.hostname !== "dp.la" &&
      link.hostname !== "pro.dp.la" &&
      link.hostname !== "localhost"
    )
      link.classList.add("external");
  }
};

const isExternal = href =>
  href.indexOf("/") !== 0 &&
  href.indexOf("http") === 0 &&
  href.indexOf("http://dp.la") !== 0 &&
  href.indexOf("https://dp.la") !== 0 &&
  href.indexOf("http://pro.dp.la") !== 0 &&
  href.indexOf("https://pro.dp.la") !== 0;
