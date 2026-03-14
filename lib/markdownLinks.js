const isInternalHost = hostname =>
  hostname === "dp.la" ||
  hostname.endsWith(".dp.la") ||
  hostname === "dpla.wpengine.com" ||
  hostname === "localhost";

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
  if (href.startsWith("/") && !href.startsWith("//")) return false;
  try {
    const { protocol, hostname } = new URL(href);
    if (protocol !== "http:" && protocol !== "https:") return false;
    return !isInternalHost(hostname.toLowerCase());
  } catch {
    return false;
  }
};

export default markdownLinks;