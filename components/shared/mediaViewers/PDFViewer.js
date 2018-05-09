import React from "react";

import css from "./mediaViewers.scss";

class PDFViewer extends React.Component {
  render() {
    const { pathToFile, height = "650px" } = this.props;
    return (
      <div className={css.pdfViewer} style={{ height }}>
        <iframe
          title="dpla-pdf-viewer"
          src={`/static/pdfjs/web/viewer.html?file=${pathToFile}`}
          style={{ width: "100%", height }}
          frameBorder="0"
        />
      </div>
    );
  }
}

export default PDFViewer;
