import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/site";
import {
  joinIfArray,
  getFullPath,
  parseDplaItemRecord,
  initGa,
  trackGaEvent
} from "utilFunctions";

export default WrappedComponent =>
  class GaExhibitHomeWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackItemView = this.trackExhibitHomeView.bind(this);
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      initGa();
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
      const fullPath = getFullPath();

      if (fullPath !== this.lastTrackedPath) {
        const dplaItemJson = this.props.exhibition.dplaItemJson;
        const dplaItem = parseDplaItemRecord(dplaItemJson);

        const gaEvent = {
          type: "View Exhibition Item",
          itemId: this.props.exhibition.dplaItemId,
          title: joinIfArray(dplaItem.title, ", "),
          partner: joinIfArray(dplaItem.partner, ", "),
          contributor: joinIfArray(dplaItem.dataProvider, ", ")
        };

        trackGaEvent(gaEvent);
        this.lastTrackedPath = fullPath;
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
