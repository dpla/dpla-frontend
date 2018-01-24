import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/site";
import { joinIfArray, trackGaEvent } from "utilFunctions";

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
      this.initGa();
      this.trackItemView();
      Router.router.events.on("routeChangeComplete", this.trackItemView);
      this.bindClickThroughEventListener();
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

    bindClickThroughEventListener() {
      const links = document.getElementsByClassName("clickThrough");

      const gaEvent = {
        type: "Click Through",
        itemId: this.itemId,
        title: this.title,
        partner: this.partner,
        contributor: this.contributor
      };

      // const trackGaEvent = this.trackGaEvent;

      Array.from(links).forEach(function(link) {
        link.addEventListener("click", function() {
          event.preventDefault();
          trackGaEvent(gaEvent);
          window.open(this.href, "_blank");
        });
      });
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
