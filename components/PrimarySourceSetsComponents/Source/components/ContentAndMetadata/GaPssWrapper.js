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
      this.unbindClickThroughEvent();
    }

    trackSourceView() {
      const fullPath = getFullPath();
      const source = this.props.source;

      if (fullPath !== this.lastTrackedPath) {
        const gaEvent = {
          type: "View Primary Source",
          itemId: getItemId(source),
          title: joinIfArray(getTitle(source)),
          partner: joinIfArray(getPartner(source)),
          contributor: joinIfArray(getContributor(source))
        };

        trackGaEvent(gaEvent);
        this.lastTrackedPath = fullPath;
      }
    }

    clickEvent = function(event) {
      event.preventDefault();
      trackGaEvent(this.gaEvent);
      //window.open(this.href, windowName);
    };

    bindClickThroughEvent() {
      var links = document.getElementsByClassName("clickThrough");
      var source = this.props.source;

      var gaEvent = {
        type: "Click Through",
        itemId: getItemId(source),
        title: joinIfArray(getTitle(source)),
        partner: joinIfArray(getPartner(source)),
        contributor: joinIfArray(getContributor(source))
      };

      let clickEvent = this.clickEvent;

      Array.from(links).forEach(function(node) {
        console.log(node.windowName);
        node.gaEvent = gaEvent;
        node.windowName = "_blank";
        node.addEventListener("click", clickEvent);
      });
    }

    unbindClickThroughEvent() {
      var links = document.getElementsByClassName("clickThrough");

      let clickEvent = this.clickEvent;

      Array.from(links).forEach(function(node) {
        delete node.gaEvent;
        delete node.windowName;
        node.removeEventListener("click", clickEvent);
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
