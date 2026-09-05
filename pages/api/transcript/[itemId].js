// Save/load transcription units for an item. Same-origin route on the Transcribe app,
// behind the alpha header gate; talks to DynamoDB via the ECS task role.
// See docs/transcribe/transcription-storage.md.

import { DPLA_ITEM_ID_REGEX } from "constants/items";
import {
  TRANSCRIPT_STATUSES,
  MAX_TRANSCRIPT_TEXT_BYTES,
  MAX_CANVAS_ID_CHARS,
} from "constants/transcribe";
import { getTranscriptsForItem, putCanvasTranscript } from "lib/transcriptStore";

// Narrows Next's 1mb default to what this route actually accepts. Next statically
// analyses this export, so the value has to be a literal and cannot reference
// MAX_TRANSCRIPT_REQUEST_BYTES in constants/transcribe — lib/transcriptRequestLimit.test.mjs
// asserts the two match. Only has any effect because server.js mounts no app-level body
// parser — see the comment there.
export const config = {
  api: { bodyParser: { sizeLimit: 768192 } },
};

function getErrorMessage(err) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Unknown error";
}

export default async function handler(req, res) {
  const { itemId } = req.query;
  if (typeof itemId !== "string" || !DPLA_ITEM_ID_REGEX.test(itemId)) {
    res.status(404).json({ error: "Not found." });
    return;
  }

  if (req.method === "GET") {
    try {
      const { units, itemStatus } = await getTranscriptsForItem(itemId);
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json({ itemId, units, itemStatus });
    } catch (err) {
      console.error("Error loading transcripts.", { message: getErrorMessage(err) });
      res.status(502).json({ error: "Could not load transcripts." });
    }
    return;
  }

  if (req.method === "PUT") {
    const { canvasId, text, status } = req.body ?? {};
    if (
      typeof canvasId !== "string" ||
      canvasId.length === 0 ||
      canvasId.length > MAX_CANVAS_ID_CHARS
    ) {
      res.status(400).json({ error: "Invalid canvasId." });
      return;
    }
    if (typeof text !== "string") {
      res.status(400).json({ error: "text must be a string." });
      return;
    }
    if (Buffer.byteLength(text, "utf8") > MAX_TRANSCRIPT_TEXT_BYTES) {
      res
        .status(413)
        .json({ error: `text exceeds ${MAX_TRANSCRIPT_TEXT_BYTES} bytes.` });
      return;
    }
    if (!TRANSCRIPT_STATUSES.includes(status)) {
      res.status(400).json({ error: "Invalid status." });
      return;
    }
    try {
      const result = await putCanvasTranscript({ itemId, canvasId, text, status });
      res.status(200).json(result);
    } catch (err) {
      console.error("Error saving transcript.", { message: getErrorMessage(err) });
      res.status(502).json({ error: "Could not save transcript." });
    }
    return;
  }

  res.setHeader("Allow", "GET, PUT");
  res.status(405).json({ error: "Method not allowed" });
}
