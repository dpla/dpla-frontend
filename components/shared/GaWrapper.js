// Credit to Oliver Sartun (aka oartun).
// @see https://github.com/zeit/next.js/issues/160

import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/site";

export default WrappedComponent =>
  class GaWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackPageview = this.trackPageview.bind(this);
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      this.initGa();
      this.trackPageview();
      Router.router.events.on("routeChangeComplete", this.trackPageview);
    }

    // Cleanup, prevents multiple pageviews being counted for a single route.
    componentWillUnmount() {
      Router.router.events.off("routeChangeComplete", this.trackPageview);
    }

    trackPageview(path = window.location.pathname) {
      if (path !== this.lastTrackedPath) {
        ReactGA.pageview(path);
        this.lastTrackedPath = path;
      }
    }

    // Initialization will occur on the initial pageload, and also when
    // switching between pages of different types.
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
