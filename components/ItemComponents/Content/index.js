import React from "react";
import Router, { withRouter } from "next/router";

import MainMetadata from "./MainMetadata";
import OtherMetadata from "./OtherMetadata";
import JsonLdMarkup from "./JsonLdMarkup";

import * as gtag from "lib/gtag";
import { bindLinkEvent, getFullPath, joinIfArray } from "lib";
import { UNTITLED_TEXT } from "constants/site";

import css from "./Content.scss";

class Content extends React.Component {
  // items track the clickthroughs and the view for the partner
  componentDidMount() {
    this.trackItemView();
    this.bindClickThroughEvent();
    Router.onRouteChangeComplete = url => this.trackItemView();
  }

  trackItemView() {
    const fullPath = getFullPath();
    const itemId = this.props.router.query.itemId;
    const title = joinIfArray(this.props.item.title, ", ");
    const contributor = joinIfArray(this.props.item.contributor, ", ");
    const partner = joinIfArray(this.props.item.partner, ", ");

    if (fullPath !== this.lastTrackedPath) {
      const gaEvent = {
        type: "View Item",
        itemId: itemId,
        title: title,
        partner: partner,
        contributor: contributor
      };

      gtag.event(gaEvent);

      this.lastTrackedPath = fullPath;
    }
  }

  bindClickThroughEvent() {
    const links = document.getElementsByClassName("clickThrough");
    const itemId = this.props.router.query.itemId;
    const title = joinIfArray(this.props.item.title, ", ");
    const contributor = joinIfArray(this.props.item.contributor, ", ");
    const partner = joinIfArray(this.props.item.partner, ", ");

    const gaEvent = {
      type: "Click Through",
      itemId: itemId,
      title: title,
      partner: partner,
      contributor: contributor
    };

    bindLinkEvent(gaEvent, links);
  }

  render() {
    const { item, url } = this.props;
    return (
      <div className={css.content}>
        <h1 className={css.title}>
          {item.title && item.title !== "" ? item.title : UNTITLED_TEXT}
        </h1>
        <MainMetadata item={item} />
        <OtherMetadata item={item} />
        <JsonLdMarkup item={item} url={url} />
      </div>
    );
  }
}

export default withRouter(Content);
