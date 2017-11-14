// Credit to Oliver Sartun (aka oartun).
// @see https://github.com/zeit/next.js/issues/160

import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";

// Tracking ID for DPLA TEST.
// TODO: Change tracking ID after we've verified that the tracking is working
// as expected.
const gaTrackingId = "UA-28197764-2";

export default WrappedComponent =>
  class GaWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackPageview = this.trackPageview.bind(this);
    }

    componentDidMount() {
      this.initGa();
      this.trackPageview();
      Router.router.events.on("routeChangeComplete", this.trackPageview);
    }

    componentWillUnmount() {
      Router.router.events.off("routeChangeComplete", this.trackPageview);
    }

    trackPageview(path = document.location.pathname) {
      if (path !== this.lastTrackedPath) {
        ReactGA.pageview(path);
        this.lastTrackedPath = path;
      }
    }

    initGa() {
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize(gaTrackingId);
        window.GA_INITIALIZED = true;
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
