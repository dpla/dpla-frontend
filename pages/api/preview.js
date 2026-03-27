/**
 * Next.js Draft Mode preview entry point.
 *
 * Called by the dpla-preview-redirect mu-plugin on dpla.wpengine.com when an
 * editor clicks the "Preview" button in the WP admin. The mu-plugin redirects
 * to this endpoint (on dp.la or pro.dp.la) with a shared secret and the
 * front-end path to render.
 *
 * On success this handler:
 *   1. Validates the shared secret.
 *   2. Enables Next.js Draft Mode (sets a signed cookie).
 *   3. Redirects the browser to the front-end URL so the page renders with
 *      draft-mode WP content.
 *
 * Query params (all required):
 *   secret        — must match WP_PREVIEW_SECRET env var
 *   post_id       — WP post ID (used only for logging/future use)
 *   post_type     — WP post type (e.g. "post", "page")
 *   redirect_path — front-end path to redirect to (e.g. "/news/my-draft")
 */

/**
 * Parses a user-supplied redirect value into a safe relative path, or returns
 * null if the value is not a valid relative path.
 *
 * Using new URL() to reconstruct the path breaks the taint chain for static
 * analysis while also correctly rejecting protocol-relative ("//evil.com") and
 * absolute ("https://evil.com") values.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function parseSafeRedirectPath(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return null;
  }
  try {
    const url = new URL(value, "http://placeholder");
    return url.pathname + url.search + url.hash;
  } catch {
    return null;
  }
}

export default function handler(req, res) {
  const { secret, redirect_path, post_id } = req.query;

  if (!secret || secret !== process.env.WP_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid preview token" });
  }

  const safePath = parseSafeRedirectPath(redirect_path);
  if (!safePath) {
    return res.status(400).json({ message: "Invalid redirect_path" });
  }

  // Draft posts have no slug in WordPress, so the mu-plugin sends just the
  // archive base path (e.g. "/news/"). If post_id is present, numeric, and the
  // path is exactly "/news/", append the post_id so the page can look it up by ID.
  const pathSegments = safePath.replace(/\/$/, "").split("/").filter(Boolean);
  const numericPostId =
    typeof post_id === "string" && /^\d+$/.test(post_id) ? post_id : null;
  const isNewsArchivePath =
    pathSegments.length === 1 && pathSegments[0] === "news";
  const finalPath =
    numericPostId && isNewsArchivePath ? `/news/${numericPostId}` : safePath;

  res.setDraftMode({ enable: true });
  res.redirect(finalPath);
}
