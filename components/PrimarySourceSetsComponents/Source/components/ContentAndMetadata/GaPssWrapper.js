import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";

import { gaTrackingId } from "constants/env";
import {
  getFullPath,
  joinIfArray,
  getItemId,
  getPartner,
  trackGaEvent,
  getContributor,
  getTitle,
  initGa
} from "lib";

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

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
