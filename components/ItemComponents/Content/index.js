import React from "react";

import MainMetadata from "./MainMetadata";
import OtherMetadata from "./OtherMetadata";
import JsonLdMarkup from "./JsonLdMarkup";
import { withRouter } from "next/router";

import { buildGaEvent, joinIfArray, gtag } from "lib";
import { UNTITLED_TEXT } from "constants/site";

import css from "./Content.module.css";

class Content extends React.Component {
  componentDidMount() {
    this.trackItemView();
  }

  // Prev/next item nav re-renders without remounting
  componentDidUpdate() {
    this.trackItemView();
  }

  trackItemView() {
    // asPath commits with props; window.location can be ahead of them
    // during back/forward
    const fullPath = this.props.router.asPath;

    if (fullPath !== this.lastTrackedPath) {
      const { item, router } = this.props;
      gtag.event(
        buildGaEvent("View Item", {
          itemId: router.query.itemId,
          title: item.title,
          partner: item.partner,
          contributor: item.contributor,
        }),
      );
      this.lastTrackedPath = fullPath;
    }
  }

  render() {
    const { item } = this.props;
    return (
      <div className={css.content}>
        <h1 className={css.title}>
          {item.title && item.title !== ""
            ? joinIfArray(item.title, ", ")
            : UNTITLED_TEXT}
        </h1>
        <MainMetadata item={item} />
        <OtherMetadata item={item} />
        <JsonLdMarkup item={item} />
      </div>
    );
  }
}

export default withRouter(Content);
