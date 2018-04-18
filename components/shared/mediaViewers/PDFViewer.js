import React from "react";
import { Document, Page } from "react-pdf";

import Chevron from "../../../static/images/chevron-thick.svg";

import css from "./mediaViewers.scss";

class PDFViewer extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;
    const { pathToFile, height = "650px" } = this.props;
    return (
      <div className={css.pdfViewer} style={{ height }}>
        <div className={css.pdfPagination}>
          {pageNumber > 1 &&
            <button
              aria-controls="pdfViewer"
              onClick={() =>
                this.setState(prevState => ({
                  pageNumber: prevState.pageNumber - 1
                }))}
            >
              <Chevron className={css.pdfPrevChevron} aria-hidden={true} />
              Previous page
            </button>}
          <span aria-live="assertive" className={css.pdfPages}>
            Page {pageNumber} of {numPages}
          </span>
          {pageNumber < numPages &&
            numPages > 1 &&
            <button
              aria-controls="pdfViewer"
              onClick={() =>
                this.setState(prevState => ({
                  pageNumber: prevState.pageNumber + 1
                }))}
            >
              Next page
              <Chevron className={css.pdfNextChevron} aria-hidden={true} />
            </button>}
        </div>
        <div id="pdfViewer" className={css.pdfDocument}>
          <Document
            file={pathToFile}
            onLoadSuccess={this.onDocumentLoad}
            options={{ cMapUrl: "cmaps/", cMapPacked: true }}
            width={"100%"}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    );
  }
}

export default PDFViewer;
