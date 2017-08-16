import React from "react";

const PDFViewer = ({ pathToFile }) =>
  <iframe
    title="dpla-pdf-viewer"
    src={pathToFile}
    style={{ width: "100%", height: "1000px" }}
    frameBorder="0"
  />;

export default PDFViewer;
