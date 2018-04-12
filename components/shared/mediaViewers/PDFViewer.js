import React from "react";
import PropTypes from "prop-types";
import Viewer from "mgr-pdf-viewer-react";

class PDFViewer extends React.Component {
  render() {
    const { pathToFile, width, height, containerId } = this.props;

    return (
      <div
        style={{ width: width, height, display: "block", overflow: "scroll" }}
      >
        <Viewer document={{ url: pathToFile }} />
      </div>
    );
  }
}

PDFViewer.propTypes = {
  pathToFile: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  containerId: PropTypes.string
};

PDFViewer.defaultProps = {
  width: "100%",
  height: "650px",
  containerId: "pdf-viewer"
};

export default PDFViewer;
