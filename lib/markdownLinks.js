const INTERNAL_HOSTS = ["dp.la", "pro.dp.la"];

const markdownLinks = reference => {
  const href = reference.$ref || reference.href;
  if (!href) return `[${reference.children[0]}]`;
  const className = isExternal(href) ? "external" : "";
  return (
    <a href={href} className={className}>
      {reference.children}
    </a>
  );
};

const isExternal = href => {
  if (href.indexOf("/") === 0) return false;
  if (href.indexOf("http") !== 0) return false;
  try {
    const { hostname } = new URL(href);
    return !INTERNAL_HOSTS.includes(hostname);
  } catch {
    return false;
  }
};

export default markdownLinks;