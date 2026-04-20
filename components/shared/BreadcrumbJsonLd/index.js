import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_USER_BASE_URL || "";

/**
 * Resolves a breadcrumb url value (string or Next.js href object) to an
 * absolute URL string, or null if the breadcrumb has no navigable URL
 * (i.e. it represents the current page).
 */
function resolveUrl(url) {
  if (!url) return null;
  if (typeof url === "string") return BASE_URL + url;
  if (url.pathname) return BASE_URL + url.pathname;
  return null;
}

/**
 * Renders a schema.org BreadcrumbList JSON-LD script tag from a breadcrumbs
 * array that matches the shape used by the shared BreadcrumbsModule component.
 *
 * Breadcrumbs whose url resolves to null (current-page entries) are included
 * in the list without an `item` URL, which is valid per the spec.
 */
function BreadcrumbJsonLd({ breadcrumbs }) {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) return null;

  const itemListElement = breadcrumbs.map((breadcrumb, index) => {
    const href = resolveUrl(breadcrumb.url);
    const entry = {
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.title,
    };
    if (href) entry.item = href;
    return entry;
  });

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
    />
  );
}

export default BreadcrumbJsonLd;
