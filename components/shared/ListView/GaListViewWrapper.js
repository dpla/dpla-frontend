import React from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import {
  joinIfArray,
  parseDplaItemRecord,
  bindLinkEvent,
  initGa
} from "utilFunctions";

export default WrappedComponent =>
  class GaListViewWrapper extends React.Component {
    constructor(props) {
      super(props);
    }

    // Using componentDidMount enables access to the window, which is necessary
    // for Google Analytics tracking.
    componentDidMount() {
      initGa();
      this.bindClickThroughEvent();
    }

    bindClickThroughEvent() {
      const links = document.getElementsByClassName("clickThrough");
      const items = this.props.items;

      // Iterate through links.
      Array.from(links).forEach(function(link) {
        // Find item with sourceUrl that matches link href.
        const item = items.filter(function(i) {
          return i.sourceUrl == link.href;
        })[0];

        const gaEvent = {
          type: "Click Through",
          itemId: item.id,
          title: item.title,
          partner: item.provider,
          contributor: item.dataProvider
        };

        bindLinkEvent(gaEvent, [link]);
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
