import React from "react";
import { Document, Page } from "react-pdf";
import throttle from "lodash.throttle";

import Chevron from "../../../static/images/chevron-thick.svg";

import css from "./mediaViewers.scss";

class PDFViewer extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
    width: null
  };

  componentDidMount() {
    this.setDivSize();
    window.addEventListener("resize", throttle(this.setDivSize, 500));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", throttle(this.setDivSize, 500));
  }

  setDivSize = () => {
    this.setState({ width: this.pdfWrapper.getBoundingClientRect().width });
  };

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages, width } = this.state;
    const { pathToFile, height = "650px" } = this.props;
    return (
      <div className={css.pdfViewer} style={{ height }}>
        <div className={css.pdfPagination}>
          {pageNumber > 1 &&
            <button
              aria-controls="pdfViewer"
              aria-label="Previous page"
              onClick={() => {
                this.setState(prevState => ({
                  pageNumber: prevState.pageNumber - 1
                }));
                this.pdfWrapper.scrollTo(0, 0);
              }}
            >
              <Chevron className={css.pdfPrevChevron} aria-label={true} />
            </button>}
          <span aria-live="assertive" className={css.pdfPages}>
            Page {pageNumber} of {numPages}
          </span>
          {pageNumber < numPages &&
            numPages > 1 &&
            <button
              aria-controls="pdfViewer"
              aria-label="Next page"
              onClick={() => {
                this.setState(prevState => ({
                  pageNumber: prevState.pageNumber + 1
                }));
                this.pdfWrapper.scrollTo(0, 0);
              }}
            >
              <Chevron className={css.pdfNextChevron} aria-label={true} />
            </button>}
        </div>
        <div
          id="pdfViewer"
          ref={ref => (this.pdfWrapper = ref)}
          className={css.pdfDocument}
        >
          <Document
            file={pathToFile}
            onLoadSuccess={this.onDocumentLoad}
            options={{ cMapUrl: "cmaps/", cMapPacked: true }}
          >
            <Page pageNumber={pageNumber} width={width} />
          </Document>
        </div>
      </div>
    );
  }
}

export default PDFViewer;
