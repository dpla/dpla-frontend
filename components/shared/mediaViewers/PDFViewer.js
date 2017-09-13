import React from "react";

const PDFViewer = ({ pathToFile, height = "750px" }) =>
  <iframe
    title="dpla-pdf-viewer"
    src={pathToFile}
    style={{ width: "100%", height }}
    frameBorder="0"
  />;

export default PDFViewer;
