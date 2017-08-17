import React from "react";

import { classNames } from "./ContentAndMetadata.css";

export default class ZoomableImageViewer extends React.Component {
  componentDidMount() {
    // const OpenSeaDragon = require("static/openseadragon/openseadragon.min.js");
    const OpenSeaDragon = require("openseadragon");
    this.viewer = OpenSeaDragon({ //eslint-disable-line
      id: "openseadragon1",
      tileSources: {
        type: "image",
        url: this.props.imageUrl
      },
      prefixUrl: "/static/images/openseadragon/"
    });
  }

  render() {
    return (
      <div id="openseadragon1" className={classNames.zoomableImageViewer} />
    );
  }
}
