// Parse a IIIF Presentation manifest (API v2 or v3) into a flat, ordered list of
// canvases, each with a single web-displayable image URL. Pure function — no I/O,
// so it can be unit-tested and run server-side in the /api/iiif-manifest route.
//
// v2 canvases live at manifest.sequences[0].canvases[]; v3 canvases at manifest.items[].
// When a canvas exposes a IIIF Image API service we derive a bounded-size image URL
// from it; otherwise we fall back to the static image the manifest references.

const DEFAULT_IMAGE_WIDTH = 1600;

// Resolve a human label from the several shapes IIIF allows:
//   v2: "Page 1" | [{ "@value": "Page 1" }] ; v3: { en: ["Page 1"], none: ["1"] }
function firstLabel(label) {
  if (!label) return null;
  if (typeof label === "string") return label;
  if (Array.isArray(label)) {
    const first = label[0];
    return typeof first === "string" ? first : (first?.["@value"] ?? null);
  }
  if (typeof label === "object") {
    const values = Object.values(label);
    const first = Array.isArray(values[0]) ? values[0][0] : values[0];
    return first != null ? String(first) : null;
  }
  return null;
}

// A IIIF Image API service can be a single object or an array; its id is `id` (v3)
// or `@id` (v2).
function imageServiceId(service) {
  if (!service) return null;
  const svc = Array.isArray(service) ? service[0] : service;
  return svc?.id || svc?.["@id"] || null;
}

// IIIF Image API request: {id}/{region}/{size}/{rotation}/{quality}.{format}.
// A width-only size ("1600,") is valid in both Image API v2 and v3.
function sizedImageUrl(serviceId, width) {
  return `${serviceId.replace(/\/$/, "")}/full/${width},/0/default.jpg`;
}

function canvasFromV2(canvas, width) {
  const resource = canvas?.images?.[0]?.resource;
  const serviceId = imageServiceId(resource?.service);
  const imageUrl = serviceId
    ? sizedImageUrl(serviceId, width)
    : resource?.["@id"] || null;
  if (!imageUrl) return null;
  return { id: canvas["@id"] || null, label: firstLabel(canvas.label), imageUrl };
}

function canvasFromV3(canvas, width) {
  const annotation = canvas?.items?.[0]?.items?.[0];
  const body = Array.isArray(annotation?.body)
    ? annotation.body[0]
    : annotation?.body;
  const serviceId = imageServiceId(body?.service);
  const imageUrl = serviceId ? sizedImageUrl(serviceId, width) : body?.id || null;
  if (!imageUrl) return null;
  return { id: canvas.id || null, label: firstLabel(canvas.label), imageUrl };
}

export function parseIiifManifest(manifest, { width = DEFAULT_IMAGE_WIDTH } = {}) {
  if (!manifest || typeof manifest !== "object") {
    return { count: 0, canvases: [] };
  }

  // Structural version detection: v3 puts canvases in top-level `items`;
  // v2 nests them under `sequences[0].canvases`.
  const raw = Array.isArray(manifest.items)
    ? manifest.items.map((c) => canvasFromV3(c, width))
    : (manifest.sequences?.[0]?.canvases || []).map((c) => canvasFromV2(c, width));

  const canvases = raw
    .filter(Boolean)
    .map((canvas, index) => ({
      ...canvas,
      // Give every page a stable, 1-based label for the page-number UI.
      label: canvas.label || `Page ${index + 1}`,
    }));

  return { count: canvases.length, canvases };
}

export { DEFAULT_IMAGE_WIDTH };
