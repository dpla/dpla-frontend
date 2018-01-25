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
      this.bindLinkEvent();
      this.bindBrowseEvent();
    }

    bindLiknkEvent() {
      const links = document.getElementsByClassName("clickThrough");
      const items = this.props.items;

      // Iterate through links.
      Array.from(links).forEach(function(link) {
        // Find item with sourceUrl that matches link href.
        const item = items.filter(function(i) {
          return i.sourceUrl == link.href;
        })[0];

        // Sanity check
        if (item) {
          const gaEvent = {
            type: "Click Through",
            itemId: item.id,
            title: joinIfArray(item.title),
            partner: joinIfArray(item.provider),
            contributor: joinIfArray(item.dataProvider)
          };

          bindLinkEvent(gaEvent, [link]);
        }
      });
    }

    bindBrowseEvent() {
      const path = window.location.pathname;
      // Check if path starts with "/browse-by-partner" (backward compatible in IE).
      // Need to check b/c component is shared between search and browse pages.
      if (path.indexOf("/browse-by-topic") === 0) {
        const links = document.getElementsByClassName("internalItemLink");
        const items = this.props.items;

        // alert(`${JSON.stringify(items[0].linkAs)} : ${JSON.stringify(links[0].href)}`);

        // Iterate through links.
        Array.from(links).forEach(function(link) {
          // Find item with linkAs property that matches end of link href.
          // item.linkAs is relative URL; link.href is full URL.
          const item = items.filter(function(i) {
            const suffix = i.linkAs;
            const str = link.href;
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
          })[0];

          // Sanity check
          if (item) {
            const gaEvent = {
              type: "Browse Item",
              itemId: item.dplaItemId,
              title: joinIfArray(item.title),
              partner: joinIfArray(item.partner),
              contributor: joinIfArray(item.dataProvider)
            };

            bindLinkEvent(gaEvent, [link]);
          }
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
