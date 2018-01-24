import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import {
  joinIfArray,
  bindLinkEvent,
  trackGaEvent,
  initGa
} from "utilFunctions";

export default WrappedComponent =>
  class GaItemWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackItemView = this.trackItemView.bind(this);
      this.itemId = this.props.url.query.itemId;
      this.title = joinIfArray(this.props.item.title, ", ");
      this.contributor = joinIfArray(this.props.item.contributor, ", ");
      this.partner = joinIfArray(this.props.item.partner, ", ");
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      initGa();
      this.trackItemView();
      Router.router.events.on("routeChangeComplete", this.trackItemView);
      this.bindClickThroughEvent();
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
        const gaEvent = {
          type: "View Item",
          itemId: this.itemId,
          title: this.title,
          partner: this.partner,
          contributor: this.contributor
        };

        trackGaEvent(gaEvent);

        this.lastTrackedPath = fullPath;
      }
    }

    bindClickThroughEvent() {
      const links = document.getElementsByClassName("clickThrough");

      const gaEvent = {
        type: "Click Through",
        itemId: this.itemId,
        title: this.title,
        partner: this.partner,
        contributor: this.contributor
      };

      bindLinkEvent(gaEvent, links);
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
