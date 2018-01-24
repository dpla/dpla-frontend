import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/site";
import { joinIfArray, parseDplaItemRecord, initGa } from "utilFunctions";

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
      // The pathname technically should not contain any parameters, but in this
      // app, it sometimes does.
      const path = window.location.pathname;
      const search = window.location.search;
      const fullPath = path + search;

      if (fullPath !== this.lastTrackedPath) {
        const itemId = this.props.exhibition.dplaItemId;
        const dplaItemJson = this.props.exhibition.dplaItemJson;
        const dplaItem = parseDplaItemRecord(dplaItemJson);
        const partner = joinIfArray(dplaItem.partner, ", ");
        const contributor = joinIfArray(dplaItem.dataProvider, ", ");
        const title = joinIfArray(dplaItem.title, ", ");

        ReactGA.event({
          category: `View Exhibition Item : ${partner}`,
          action: `${contributor}`,
          label: `${itemId} : ${title}`
        });

        this.lastTrackedPath = fullPath;
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
