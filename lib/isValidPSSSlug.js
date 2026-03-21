const PSS_SLUG_RE = /^[a-z0-9-]+$/i;

export default function isValidPSSSlug(slug) {
  return PSS_SLUG_RE.test(slug);
}
