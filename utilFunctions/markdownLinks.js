const markdownLinks = reference => {
  const href = reference.$ref || reference.href;
  if (!href) return `[${reference.children[0]}]`;
  const className = href.indexOf("http://dp.la") !== 0 &&
    href.indexOf("https://dp.la") !== 0 &&
    href.indexOf("https://pro.dp.la")
    ? "external"
    : "";
  return (
    <a href={href} class={className}>
      {reference.children}
    </a>
  );
};

export default markdownLinks;
