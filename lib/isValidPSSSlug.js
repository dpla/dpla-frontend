const PSS_SLUG_RE = /^[a-z0-9-]+$/i;

export default function isValidPSSSlug(slug) {
  return typeof slug === "string" && PSS_SLUG_RE.test(slug);
}
