import React from "react";
import ReactDOM from "react-dom/server";

import css from "./mediaViewers.module.scss";

const viewerId = "openseadragon1";

function Noscript({ children }) {
  const staticMarkup = ReactDOM.renderToStaticMarkup(children);
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
}

export default class ZoomableImageViewer extends React.Component {
  componentDidMount() {
    if (!this.viewer && !this.loading) {
      this.loading = true;
      try {
        const OpenSeaDragon = require("openseadragon");
        const url = this.props.pathToFile;

        this.viewer = new OpenSeaDragon({
          id: viewerId,
          tileSources: {type: "image", url},
          prefixUrl: "/static/images/openseadragon/",
        });
      } finally {
        this.loading = false;
      }
    }
  }

  componentWillUnmount() {
    this.viewer = null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.pathToFile !== prevProps.pathToFile) {
      // this works locally. might be necessary to preload the image like in: https://jsfiddle.net/ashraffayad/074navyp/
      this.viewer.open({ type: "image", url: this.props.pathToFile });
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
