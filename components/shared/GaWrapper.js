// Credit to Oliver Sartun (aka oartun).
// @see https://github.com/zeit/next.js/issues/160

import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";

import { gaTrackingId } from "constants/env";
import { initGa, getFullPath } from "lib";

export default WrappedComponent =>
  class GaWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackPageview = this.trackPageview.bind(this);
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      initGa();
      this.trackPageview();
      Router.router.events.on("routeChangeComplete", this.trackPageview);
    }

    // Cleanup, prevents multiple pageviews being counted for a single route.
    componentWillUnmount() {
      Router.router.events.off("routeChangeComplete", this.trackPageview);
    }

    trackPageview() {
      const fullPath = getFullPath();

      if (fullPath !== this.lastTrackedPath) {
        ReactGA.pageview(fullPath);
        this.lastTrackedPath = fullPath;
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
