import React from "react";
import PropTypes from "prop-types";
import PDFObject from "pdfobject";

class PDFViewer extends React.Component {
  componentDidMount() {
    const { pathToFile, containerId } = this.props;

    PDFObject.embed(pathToFile, `#${containerId}`);
  }

  render() {
    const { pathToFile, width, height, containerId } = this.props;

    return <div style={{ width, height }} id={containerId} />;
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
