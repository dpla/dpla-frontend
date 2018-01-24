import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/site";
import { joinIfArray, parseDplaItemRecord } from "utilFunctions";

export default WrappedComponent =>
  class GaExhibitWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.trackPageview = this.trackPageview.bind(this);
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      this.initGa();
      this.trackPageview();
      Router.router.events.on("routeChangeComplete", this.trackPageview);
    }

    // Cleanup, prevents multiple pageviews being counted for a single route.
    componentWillUnmount() {
      Router.router.events.off("routeChangeComplete", this.trackPageview);
    }

    trackPageview() {
      // The pathname technically should not contain any parameters, but in this
      // app, it sometimes does.
      const path = window.location.pathname;
      const search = window.location.search;
      const fullPath = path + search;

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
        const itemId = activePage.dplaItemId;
        const dplaItemJson = activePage.dplaItemJson;
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
