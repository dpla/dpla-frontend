import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/env";
import {
  bindLinkEvent,
  initGa,
  getFullPath,
  joinIfArray,
  getItemId,
  getPartner,
  trackGaEvent
} from "utilFunctions";

const getContributor = source =>
  source.mainEntity[0]["provider"].filter(
    ref => ref["disambiguationDescription"] == "contributing institution"
  )[0]["name"];

const getTitle = source => source.mainEntity[0]["name"];

export default WrappedComponent =>
  class GaPssWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackSourceView = this.trackSourceView.bind(this);
      const source = this.props.source;
      this.itemId = getItemId(source);
      this.title = joinIfArray(getTitle(source));
      this.partner = joinIfArray(getPartner(source));
      this.contributor = joinIfArray(getContributor(source));
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      initGa();
      this.trackSourceView();
      Router.router.events.on("routeChangeComplete", this.trackSourceView);
      this.bindClickThroughEvent();
    }

    // Cleanup, prevents multiple pageviews being counted for a single route.
    componentWillUnmount() {
      Router.router.events.off("routeChangeComplete", this.trackSourceView);
    }

    trackSourceView() {
      const fullPath = getFullPath();

      if (fullPath !== this.lastTrackedPath) {
        const gaEvent = {
          type: "View Primary Source",
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
