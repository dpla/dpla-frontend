import React from "react";

const PDFViewer = ({ pathToFile, height = "650px" }) => (
  <iframe
    title="dpla-pdf-viewer"
    src={`https://docs.google.com/gview?url=${pathToFile}&embedded=true`}
    style={{ width: "100%", height, display: "block" }}
    frameBorder="0"
  />
);

export default PDFViewer;
