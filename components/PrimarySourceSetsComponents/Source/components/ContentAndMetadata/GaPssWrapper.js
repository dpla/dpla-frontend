import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/site";
import {
  joinIfArray,
  getFullPath,
  getItemId,
  getPartner,
  initGa,
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
    }

    // Cleanup, prevents multiple pageviews being counted for a single route.
    componentWillUnmount() {
      Router.router.events.off("routeChangeComplete", this.trackSourceView);
    }

    trackSourceView() {
      const fullPath = getFullPath();

      if (fullPath !== this.lastTrackedPath) {
        const source = this.props.source;

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

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
