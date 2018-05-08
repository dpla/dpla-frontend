import React from "react";

import css from "./mediaViewers.scss";

class PDFViewer extends React.Component {
  render() {
    const { pathToFile, height = "650px" } = this.props;
    return (
      <div className={css.pdfViewer} style={{ height }}>
        <iframe
          title="dpla-pdf-viewer"
          src={
            "/static/pdfjs/web/viewer.html?file=https://d2jf00asb0fe6y.cloudfront.net/mormon-migration_03_1d178923d61d4ec0bae5926368556953.pdf"
          }
          style={{ width: "100%", height }}
          frameBorder="0"
        />
      </div>
    );
  }
}

export default PDFViewer;
