import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import { gaTrackingId } from "constants/site";
import { joinIfArray, extractItemId, getPartner } from "utilFunctions";

// TODO: getItemId and getPartner duplicated in ./index.js
const getItemId = source =>
  extractItemId(
    source.mainEntity[0]["dct:references"].filter(
      ref => ref["@type"] === "ore:Aggregation"
    )[0]["@id"]
  );

const getContributor = source => {
  const provider = source.mainEntity[0]["provider"];
  var providerName = "";

  if (provider instanceof Array) {
    // This works with a more recent iteration of the PSS API.
    source.mainEntity[0]["provider"].filter(
      ref => ref["disabmiguationDescription"] == "contributing institution"
    )["name"];
  }
  return providerName;
};

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
      this.initGa();
      this.trackSourceView();
      Router.router.events.on("routeChangeComplete", this.trackSourceView);
    }

    // Cleanup, prevents multiple pageviews being counted for a single route.
    componentWillUnmount() {
      Router.router.events.off("routeChangeComplete", this.trackSourceView);
    }

    trackSourceView() {
      // The pathname technically should not contain any parameters, but in this
      // app, it sometimes does.
      const path = window.location.pathname;
      const search = window.location.search;
      const fullPath = path + search;

      if (fullPath !== this.lastTrackedPath) {
        const itemId = getItemId(this.props.source);
        const partner = joinIfArray(getPartner(this.props.source));
        const title = joinIfArray(getTitle(this.props.source));
        const contributor = joinIfArray(getContributor(this.props.source));
        alert(`${itemId} : ${title} : ${partner} : ${contributor}`);
        ReactGA.event({
          category: `View Primary Source : ${partner}`,
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
