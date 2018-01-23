import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/site";
import { joinIfArray } from "utilFunctions";

export default WrappedComponent =>
  class GaItemWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackItemView = this.trackItemView.bind(this);
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      this.initGa();
      this.trackItemView();
      Router.router.events.on("routeChangeComplete", this.trackItemView);
    }

    // Cleanup, prevents multiple pageviews being counted for a single route.
    componentWillUnmount() {
      Router.router.events.off("routeChangeComplete", this.trackItemView);
    }

    trackItemView() {
      // The pathname technically should not contain any parameters, but in this
      // app, it sometimes does.
      const path = window.location.pathname;
      const search = window.location.search;
      const fullPath = path + search;

      if (fullPath !== this.lastTrackedPath) {
        const itemId = this.props.url.query.itemId;
        const title = joinIfArray(this.props.item.title, ", ");
        const contributor = joinIfArray(this.props.item.contributor, ", ");
        const partner = joinIfArray(this.props.item.partner, ", ");
        ReactGA.event({
          category: `View Item : ${partner}`,
          action: `${contributor}`,
          label: `${itemId} : ${title}`
        });
        this.lastTrackedPath = fullPath;
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
