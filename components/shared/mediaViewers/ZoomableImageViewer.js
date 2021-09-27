import React from "react";
import ReactDOM from "react-dom/server";

import css from "./mediaViewers.module.scss";

const viewerId = "openseadragon1";

// TODO: maybe move this into a shared directory
//  idea from https://github.com/facebook/react/issues/1252
const Noscript = ({ children }) => {
  const staticMarkup = ReactDOM.renderToStaticMarkup(children);
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

const initOpenSeaDragon = url => {
  const OpenSeaDragon = require("openseadragon");
  return OpenSeaDragon({
    id: viewerId,
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
      // this works locally. might be necessary to preload the image like in: https://jsfiddle.net/ashraffayad/074navyp/
      this.viewer.open({ type: "image", url: nextProps.pathToFile });
    }
  }

  render() {
    return (
      <div id={viewerId} className={css.zoomableImageViewer}>
        <Noscript>
          <div className={css.noscriptContainer}>
            <img
              className={css.noscriptImg}
              alt=""
              src={this.props.pathToFile}
            />
          </div>
        </Noscript>
      </div>
    );
  }
}
