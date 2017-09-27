import React from "react";
import ReactDOM from "react-dom/server";

import { classNames, stylesheet } from "./mediaViewers.css";

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
      // this is the only way that seems to work; this.viewer.destroy and
      // this.viewer.open break things, seemingly because of our API proxying
      // and server-side rendering
      const { parentNode } = this.ref;
      parentNode.removeChild(this.ref);
      const newDiv = document.createElement("div");
      newDiv.setAttribute("id", viewerId);
      newDiv.setAttribute("class", classNames.zoomableImageViewer);
      parentNode.appendChild(newDiv);
      this.ref = parentNode.querySelector(`#${viewerId}`);
      this.viewer = initOpenSeaDragon(nextProps.pathToFile);
    }
  }

  render() {
    return (
      <div>
        <div
          ref={ref => (this.ref = !this.ref ? ref : this.ref)}
          id={viewerId}
          className={classNames.zoomableImageViewer}
        >
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
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}
