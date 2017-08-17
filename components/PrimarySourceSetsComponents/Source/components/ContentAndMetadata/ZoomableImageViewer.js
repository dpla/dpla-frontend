import React from "react";
import ReactDOM from "react-dom/server";

import { classNames } from "./ContentAndMetadata.css";

// TODO: maybe move this into a shared directory
// https://github.com/facebook/react/issues/1252
const Noscript = ({ children }) => {
  const staticMarkup = ReactDOM.renderToStaticMarkup(children);
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

export default class ZoomableImageViewer extends React.Component {
  componentDidMount() {
    // const OpenSeaDragon = require("static/openseadragon/openseadragon.min.js");
    const OpenSeaDragon = require("openseadragon");
    this.viewer = OpenSeaDragon({
      //eslint-disable-line
      id: "openseadragon1",
      tileSources: {
        type: "image",
        url: this.props.pathToFile
      },
      prefixUrl: "/static/images/openseadragon/"
    });
  }

  render() {
    return (
      <div id="openseadragon1" className={classNames.zoomableImageViewer}>
        <Noscript>
          <div className={classNames.noscriptContainer}>
            <img
              className={classNames.noscriptImg}
              alt=""
              src={this.props.pathToFile}
            />
          </div>
        </Noscript>
      </div>
    );
  }
}
