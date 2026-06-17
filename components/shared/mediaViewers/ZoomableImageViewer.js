import React from "react";
import ReactDOM from "react-dom/server";

import css from "./mediaViewers.module.scss";

function Noscript({ children }) {
  const staticMarkup = ReactDOM.renderToStaticMarkup(children);
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
}

export default class ZoomableImageViewer extends React.Component {

  constructor(props) {
    super(props);
    this.viewer = null;
    this.loading = false;
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    if (!this.viewer && !this.loading && this.containerRef.current) {
      this.loading = true;
      try {
        const OpenSeaDragon = require("openseadragon");
        const url = this.props.pathToFile;
        this.viewer = new OpenSeaDragon({
          element: this.containerRef.current,
          tileSources: {type: "image", url},
          prefixUrl: "/static/images/openseadragon/",
        });
      } finally {
        this.loading = false;
      }
    }
  }

  componentWillUnmount() {
    if (this.viewer) {
      this.viewer.destroy();
    }
    this.viewer = null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.pathToFile !== prevProps.pathToFile && this.viewer) {
      this.viewer.open({ type: "image", url: this.props.pathToFile });
    }
  }

  render() {
    return (
      <div ref={this.containerRef} className={css.zoomableImageViewer} translate="no">
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
