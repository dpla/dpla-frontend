import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

import { addCommasToNumber } from "lib";
import {
  TRANSCRIPT_STATUSES,
  TRANSCRIPT_STATUS_LABELS,
  DEFAULT_TRANSCRIPT_STATUS,
  MAX_TRANSCRIPT_TEXT_BYTES,
} from "constants/transcribe";

import css from "./TranscriptionPanel.module.css";

// Per-page transcription editor rendered under the IIIF viewer on the Transcribe local.
// It follows the viewer's current canvas: one <textarea> + status picker + Save, keyed to
// the canvas the user is looking at. On open it hydrates every saved unit for the item
// (GET /api/transcript/{itemId}); Save upserts one canvas (PUT). Drafts are held per
// canvas in memory so flipping pages never loses unsaved edits.
//
// This is a staging-only alpha: there is intentionally no auth on reads or writes yet
// (the site itself is header-gated). See docs/transcribe/transcription-storage.md.

// Mirror the server's UTF-8 byte check (Buffer.byteLength) in the browser so the byte
// counter and the Save guard match what the API enforces. TextEncoder is available in
// every supported browser and in the Node runtime used for SSR.
const encoder = new TextEncoder();
function utf8ByteLength(str) {
  return encoder.encode(str).length;
}

// The limit label never changes, so format it once at module scope.
const MAX_BYTES_LABEL = addCommasToNumber(MAX_TRANSCRIPT_TEXT_BYTES);

function formatUpdatedAt(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString();
}

const EMPTY_DRAFT = { text: "", status: DEFAULT_TRANSCRIPT_STATUS };

export default function TranscriptionPanel({ itemId, canvas }) {
  const canvasId = canvas?.id ?? null;

  // What the server has stored, keyed by canvasId: { text, status, updatedAt }.
  const [saved, setSaved] = useState({});
  // Working drafts, keyed by canvasId: { text, status } — preserved across page nav.
  const [drafts, setDrafts] = useState({});
  const [loadState, setLoadState] = useState("loading"); // loading | ready | error
  const [saveState, setSaveState] = useState("idle"); // idle | saving | error
  const [saveError, setSaveError] = useState(null);

  const savingRef = useRef(false);
  const loadTokenRef = useRef(0);

  // Hydrate all saved units whenever the item changes. A load token guards against a
  // stale in-flight response overwriting state after the itemId has moved on.
  useEffect(() => {
    if (!itemId) return;
    const token = ++loadTokenRef.current;
    setLoadState("loading");
    (async () => {
      try {
        const res = await fetch(
          `/api/transcript/${encodeURIComponent(itemId)}`,
        );
        if (!res.ok) throw new Error(`load failed: ${res.status}`);
        const data = await res.json();
        if (token !== loadTokenRef.current) return;
        const savedMap = {};
        const draftMap = {};
        for (const unit of data.units || []) {
          if (!unit.canvasId) continue;
          const text = unit.text ?? "";
          const status = unit.status ?? DEFAULT_TRANSCRIPT_STATUS;
          savedMap[unit.canvasId] = {
            text,
            status,
            updatedAt: unit.updatedAt ?? null,
          };
          draftMap[unit.canvasId] = { text, status };
        }
        setSaved(savedMap);
        setDrafts(draftMap);
        setLoadState("ready");
      } catch (err) {
        if (token !== loadTokenRef.current) return;
        console.warn(
          "Transcription: could not load transcripts.",
          err?.message ?? err,
        );
        setLoadState("error");
      }
    })();
  }, [itemId]);

  // Clear the transient save indicator when the user navigates to another page.
  useEffect(() => {
    setSaveState("idle");
    setSaveError(null);
  }, [canvasId]);

  const draft = (canvasId && drafts[canvasId]) || EMPTY_DRAFT;
  const savedForCanvas = (canvasId && saved[canvasId]) || null;
  const { text, status } = draft;

  const byteLength = useMemo(() => utf8ByteLength(text), [text]);
  const overLimit = byteLength > MAX_TRANSCRIPT_TEXT_BYTES;
  const dirty = savedForCanvas
    ? text !== savedForCanvas.text || status !== savedForCanvas.status
    : text.trim() !== "" || status !== DEFAULT_TRANSCRIPT_STATUS;

  const updateDraft = useCallback(
    (patch) => {
      if (!canvasId) return;
      setDrafts((prev) => ({
        ...prev,
        [canvasId]: { ...EMPTY_DRAFT, ...prev[canvasId], ...patch },
      }));
      // A fresh edit invalidates the "Saved ✓" indicator.
      setSaveState("idle");
      setSaveError(null);
    },
    [canvasId],
  );

  const handleSave = useCallback(async () => {
    if (!canvasId || savingRef.current || overLimit) return;
    savingRef.current = true;
    setSaveState("saving");
    setSaveError(null);
    try {
      const res = await fetch(
        `/api/transcript/${encodeURIComponent(itemId)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ canvasId, text, status }),
        },
      );
      if (!res.ok) {
        let message = `save failed: ${res.status}`;
        try {
          const body = await res.json();
          if (body?.error) message = body.error;
        } catch {
          /* non-JSON error body — keep the status-code message */
        }
        throw new Error(message);
      }
      const result = await res.json();
      setSaved((prev) => ({
        ...prev,
        [canvasId]: { text, status, updatedAt: result?.updatedAt ?? null },
      }));
      // Saved and no longer dirty → the render shows "Saved ✓" from that fact alone,
      // so there is no distinct "saved" state value to track.
      setSaveState("idle");
    } catch (err) {
      console.warn("Transcription: save failed.", err?.message ?? err);
      setSaveError(err?.message || "Save failed.");
      setSaveState("error");
    } finally {
      savingRef.current = false;
    }
  }, [canvasId, itemId, text, status, overLimit]);

  // A page with no canvas @id in the manifest can't be addressed by the store.
  if (!canvasId) {
    return (
      <section className={css.panel} aria-label="Transcription">
        <p className={css.note}>
          This page can’t be transcribed — the manifest doesn’t give it a canvas
          identifier.
        </p>
      </section>
    );
  }

  const loading = loadState === "loading";
  const saving = saveState === "saving";

  let saveMessage = null;
  let saveMessageClass = css.saveStatus;
  if (saveState === "error") {
    saveMessage = saveError || "Save failed.";
    saveMessageClass = `${css.saveStatus} ${css.saveStatusError}`;
  } else if (dirty) {
    saveMessage = "Unsaved changes";
  } else if (savedForCanvas) {
    saveMessage = "Saved ✓";
    saveMessageClass = `${css.saveStatus} ${css.saveStatusSaved}`;
  }

  const updatedAt = savedForCanvas?.updatedAt
    ? formatUpdatedAt(savedForCanvas.updatedAt)
    : null;

  return (
    <section className={css.panel} aria-label="Transcription">
      <div className={css.header}>
        <h3 className={css.heading}>Transcribe this page</h3>
        {canvas?.label && <span className={css.pageRef}>{canvas.label}</span>}
      </div>

      <p className={css.help}>
        Type what you can read on the page shown above, choose a status, and save.
        Transcriptions are public and unversioned while the site is in alpha.
      </p>

      {loadState === "error" && (
        <p className={`${css.note} ${css.noteError}`} role="alert">
          Existing transcriptions couldn’t be loaded. You can still type and save
          below, but earlier work may not be shown.
        </p>
      )}

      <label className={css.fieldLabel} htmlFor="transcript-text">
        Transcription
      </label>
      <textarea
        id="transcript-text"
        className={css.textarea}
        value={text}
        onChange={(event) => updateDraft({ text: event.target.value })}
        placeholder="Type what you see on this page…"
        rows={10}
        spellCheck
        disabled={loading}
      />

      <div className={css.controls}>
        <div className={css.statusField}>
          <label className={css.fieldLabel} htmlFor="transcript-status">
            Status
          </label>
          <select
            id="transcript-status"
            className={css.select}
            value={status}
            onChange={(event) => updateDraft({ status: event.target.value })}
            disabled={loading}
          >
            {TRANSCRIPT_STATUSES.map((value) => (
              <option key={value} value={value}>
                {TRANSCRIPT_STATUS_LABELS[value] ?? value}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className={css.saveButton}
          onClick={handleSave}
          disabled={saving || overLimit || loading || !dirty}
        >
          {saving ? "Saving…" : "Save"}
        </button>

        {saveMessage && (
          <span className={saveMessageClass} role="status" aria-live="polite">
            {saveMessage}
          </span>
        )}
      </div>

      <div className={css.meta}>
        <span className={overLimit ? css.countOver : css.count}>
          {addCommasToNumber(byteLength)} / {MAX_BYTES_LABEL} bytes
          {overLimit && " — too long to save"}
        </span>
        {updatedAt && (
          <span className={css.updatedAt}>Last saved {updatedAt}</span>
        )}
      </div>
    </section>
  );
}
