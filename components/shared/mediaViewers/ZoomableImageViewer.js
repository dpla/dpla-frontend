import React from "react";
import ReactDOM from "react-dom/server";

import { classNames, stylesheet } from "./mediaViewers.css";

// TODO: maybe move this into a shared directory
//  idea from https://github.com/facebook/react/issues/1252
const Noscript = ({ children }) => {
  const staticMarkup = ReactDOM.renderToStaticMarkup(children);
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

const initOpenSeaDragon = url => {
  const OpenSeaDragon = require("openseadragon");
  return OpenSeaDragon({
    id: "openseadragon1",
    tileSources: { type: "image", url },
    prefixUrl: "/static/images/openseadragon/"
  });
};

export default class ZoomableImageViewer extends React.Component {
  componentDidMount() {
    this.viewer = initOpenSeaDragon(this.props.pathToFile);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pathToFile !== this.props.pathToFile) {
      this.viewer.destroy();
      this.viewer = initOpenSeaDragon(nextProps.pathToFile);
    }
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
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}
