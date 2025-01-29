import React from "react";

import css from "./mediaViewers.module.scss";

function PDFViewer(props) {
  const { pathToFile, height = "650px" } = props;
  return (
    <div className={css.pdfViewer} style={{ height }}>
      <iframe
        title="dpla-pdf-viewer"
        src={`/static/pdfjs/web/viewer.html?file=${pathToFile}#zoom=page-width`}
        style={{ width: "100%", height }}
      />
    </div>
  );
}

export default PDFViewer;
