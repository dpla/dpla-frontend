import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";

import { gaTrackingId } from "constants/env";
import {
  bindLinkEvent,
  initGa,
  getFullPath,
  joinIfArray,
  trackGaEvent
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
      const fullPath = getFullPath();

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

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
