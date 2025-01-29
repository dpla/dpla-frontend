import React from "react";
import ReactDOM from "react-dom/server";

import css from "./mediaViewers.module.scss";
import * as PropTypes from "prop-types";

const viewerId = "openseadragon1";

function Noscript(props) {
  let { children } = props;
  const staticMarkup = ReactDOM.renderToStaticMarkup(children);
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
}

Noscript.propTypes = { children: PropTypes.any };

const initOpenSeaDragon = (url) => {
  const OpenSeaDragon = require("openseadragon");
  return OpenSeaDragon({
    id: viewerId,
    tileSources: { type: "image", url },
    prefixUrl: "/static/images/openseadragon/",
  });
};

export default class ZoomableImageViewer extends React.Component {
  componentDidMount() {
    this.viewer = initOpenSeaDragon(this.props.pathToFile);
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
