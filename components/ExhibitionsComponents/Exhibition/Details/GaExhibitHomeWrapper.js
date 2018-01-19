import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/site";
import { joinIfArray } from "utilFunctions";

export default WrappedComponent =>
  class GaExhibitHomeWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackItemView = this.trackExhibitHomeView.bind(this);
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      this.initGa();
      this.trackExhibitHomeView();
      Router.router.events.on("routeChangeComplete", this.trackExhibitHomeView);
    }

    // Cleanup, prevents multiple pageviews being counted for a single route.
    componentWillUnmount() {
      Router.router.events.off(
        "routeChangeComplete",
        this.trackExhibitHomeView
      );
    }

    trackExhibitHomeView() {
      // The pathname technically should not contain any parameters, but in this
      // app, it sometimes does.
      const path = window.location.pathname;
      const search = window.location.search;
      const fullPath = path + search;

      if (fullPath !== this.lastTrackedPath) {
        const itemId = this.props.exhibition.dplaItemId;
        const dplaItemJson = this.props.exhibition.dplaItemJson;

        const partner = joinIfArray(
          dplaItemJson &&
            dplaItemJson.docs &&
            dplaItemJson.docs[0] &&
            dplaItemJson.docs[0].provider &&
            dplaItemJson.docs[0].provider.name,
          ", "
        );

        const contributor = joinIfArray(
          dplaItemJson &&
            dplaItemJson.docs &&
            dplaItemJson.docs[0] &&
            dplaItemJson.docs[0].dataProvider,
          ", "
        );

        const title = joinIfArray(
          dplaItemJson &&
            dplaItemJson.docs &&
            dplaItemJson.docs[0] &&
            dplaItemJson.docs[0].sourceResource &&
            dplaItemJson.docs[0].sourceResource.title,
          ", "
        );

        ReactGA.event({
          category: `View Exhibition Item : ${partner}`,
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
