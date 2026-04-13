/**
 * Probes a URL to determine whether it resolves to a usable image, then calls
 * onError if it doesn't.
 *
 * Why not just rely on the <img> element's onerror?  onerror fires on network
 * errors and 4xx responses, but NOT on 5xx responses (e.g. 504 Gateway
 * Timeout): the browser considers a 5xx a successful HTTP load, it just can't
 * decode the body as an image.  Checking naturalWidth === 0 in onload catches
 * that case — the image "loaded" but has no displayable pixels.
 */
const probeImage = (url, onError) => {
  const img = document.createElement("img");
  let cancelled = false;

  const cleanup = () => {
    img.onload = null;
    img.onerror = null;
  };

  img.onload = () => {
    if (!cancelled && img.naturalWidth === 0) onError();
    cleanup();
  };
  img.onerror = () => {
    if (!cancelled) onError();
    cleanup();
  };
  img.src = url;

  // Returns a disposer. Call it to cancel a pending probe — e.g. in
  // componentWillUnmount or when the URL changes before the probe finishes.
  return () => {
    cancelled = true;
    cleanup();
    img.src = "";
  };
};

export default probeImage;
