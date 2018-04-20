import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";

import { gaTrackingId } from "constants/env";
import {
  initGa,
  getFullPath,
  joinIfArray,
  parseDplaItemRecord,
  trackGaEvent
} from "lib";

export default WrappedComponent =>
  class GaExhibitWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackPageview = this.trackPageview.bind(this);
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      initGa();
      this.trackPageview();
      Router.router.events.on("routeChangeComplete", this.trackPageview);
    }

    // Cleanup, prevents multiple pageviews being counted for a single route.
    componentWillUnmount() {
      Router.router.events.off("routeChangeComplete", this.trackPageview);
    }

    trackPageview() {
      const fullPath = getFullPath();

      if (fullPath !== this.lastTrackedPath) {
        // Track pageview.
        // Since this does not use the MainLayout like the rest of the site,
        // the pageview is tracked here.
        ReactGA.pageview(fullPath);

        // Also track exhibit item view event.
        const subsection = this.props.subsection;
        const pageBlocks = subsection.page_blocks;
        const activePageIdx = pageBlocks.findIndex(block => block.isActive);
        const activePage = pageBlocks[activePageIdx];
        const dplaItemJson = activePage.dplaItemJson;
        const dplaItem = parseDplaItemRecord(dplaItemJson);

        const gaEvent = {
          type: "View Exhibition Item",
          itemId: activePage.dplaItemId,
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
