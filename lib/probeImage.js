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
  img.onload = () => {
    if (img.naturalWidth === 0) onError();
    img.onload = null;
    img.onerror = null;
  };
  img.onerror = () => {
    onError();
    img.onload = null;
    img.onerror = null;
  };
  img.src = url;
};

export default probeImage;
