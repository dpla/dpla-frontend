import React from "react";

import css from "./IIIFViewer.module.css";

// Full-image page viewer for items that carry a IIIF manifest. Fetches the parsed
// canvas list from /api/iiif-manifest/<itemId> (same origin — see that route), then
// drives OpenSeaDragon in sequenceMode so each page's image loads only when viewed.
// A clickable page-number bar navigates between canvases.
//
// OpenSeaDragon touches window/document, so — like ZoomableImageViewer — it is
// require()'d inside a lifecycle method that only runs in the browser, never at import.
export default class IIIFViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "loading", canvases: [], currentPage: 0 };
    this.containerRef = React.createRef();
    this.viewer = null;
    this._mounted = false;
    this._loadToken = 0;
  }

  componentDidMount() {
    this._mounted = true;
    this.loadManifest();
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = null;
    }
  }

  componentDidUpdate(prevProps) {
    // The item page reuses this component across client-side navigation, so a new
    // itemId must tear down the old viewer and load the new manifest.
    if (prevProps.itemId !== this.props.itemId) {
      if (this.viewer) {
        this.viewer.destroy();
        this.viewer = null;
      }
      this.setState({ status: "loading", canvases: [], currentPage: 0 });
      this.loadManifest();
    }
  }

  async loadManifest() {
    // Guard against a stale in-flight response replacing state after the itemId
    // has changed (or the component unmounted).
    const token = ++this._loadToken;
    try {
      const res = await fetch(
        `/api/iiif-manifest/${encodeURIComponent(this.props.itemId)}`,
      );
      if (!res.ok) throw new Error(`manifest request failed: ${res.status}`);
      const data = await res.json();
      if (!this._mounted || token !== this._loadToken) return;
      const canvases = Array.isArray(data.canvases) ? data.canvases : [];
      if (canvases.length === 0) {
        this.setState({ status: "empty" });
        return;
      }
      this.setState({ status: "ready", canvases }, () => {
        if (token === this._loadToken) this.initViewer(canvases);
      });
    } catch (err) {
      console.warn("IIIF viewer: could not load manifest.", err?.message ?? err);
      if (this._mounted && token === this._loadToken) {
        this.setState({ status: "error" });
      }
    }
  }

  initViewer(canvases) {
    if (this.viewer || !this.containerRef.current) return;
    const OpenSeaDragon = require("openseadragon");
    this.viewer = new OpenSeaDragon({
      element: this.containerRef.current,
      prefixUrl: "/static/images/openseadragon/",
      // Use the canvas drawer, not OSD 6's default WebGL drawer. WebGL textures
      // require CORS-clean images, but provider images are cross-origin, so the
      // default fails ("Error creating texture in WebGL") and renders blank until
      // an interaction forces a redraw. The canvas drawer renders cross-origin
      // images regardless of CORS, so it works across all providers — not just
      // CORS-compliant ones — and perf is a non-issue for a single web-sized page.
      drawer: "canvas",
      tileSources: canvases.map((c) => ({ type: "image", url: c.imageUrl })),
      sequenceMode: true,
      showSequenceControl: false, // we render our own page bar
      showNavigator: false,
      showNavigationControl: true,
    });
    this.viewer.addHandler("page", (event) => {
      if (this._mounted) this.setState({ currentPage: event.page });
    });
  }

  goToPage(index) {
    if (this.viewer) this.viewer.goToPage(index);
  }

  render() {
    const { status, canvases, currentPage } = this.state;
    const hasPages = status === "ready" && canvases.length > 1;
    return (
      <div className={css.iiifViewer}>
        <div className={css.stage}>
          {/* OpenSeaDragon owns this node; keep React children out of it. */}
          <div ref={this.containerRef} className={css.osdContainer} translate="no" />
          {status !== "ready" && (
            <div className={css.overlay} role="status">
              {status === "loading" && "Loading page viewer…"}
              {status === "empty" && "No page images are available for this item."}
              {status === "error" && "The page viewer could not be loaded."}
            </div>
          )}
        </div>

        {hasPages && (
          <div className={css.pageBarWrapper}>
            <button
              type="button"
              className={css.pageArrow}
              aria-label="Previous page"
              disabled={currentPage <= 0}
              onClick={() => this.goToPage(currentPage - 1)}
            >
              &lsaquo;
            </button>
            <nav className={css.pageBar} aria-label="Pages">
              {canvases.map((canvas, index) => (
                <button
                  key={canvas.id || index}
                  type="button"
                  className={`${css.pageButton} ${
                    index === currentPage ? css.pageButtonActive : ""
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={index === currentPage ? "true" : undefined}
                  onClick={() => this.goToPage(index)}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
            <button
              type="button"
              className={css.pageArrow}
              aria-label="Next page"
              disabled={currentPage >= canvases.length - 1}
              onClick={() => this.goToPage(currentPage + 1)}
            >
              &rsaquo;
            </button>
          </div>
        )}
        {status === "ready" && (
          <p className={css.pageStatus}>
            Page {currentPage + 1} of {canvases.length}
          </p>
        )}
      </div>
    );
  }
}
