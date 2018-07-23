import React from "react";
import Link from "next/link";

import ListImage from "./ListImage";

import { bindLinkEvent, joinIfArray, truncateString } from "lib";

import { UNTITLED_TEXT } from "constants/site";

import css from "./ListView.scss";

/**
 * @param description, item description object
 * @return HTML with truncated item description
 */
const ItemDescription = ({ description }) => {
  let str = joinIfArray(description);
  str = truncateString(str);
  return (
    <div className={css.itemDescription}>
      <p>{str}</p>
    </div>
  );
};

class ListView extends React.Component {
  componentDidMount() {
    this.bindClickThroughEvent();
    this.bindBrowseEvent();
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
    // Check if path starts with "/browse-by-topic" (backward compatible in IE).
    // Need to check b/c component is shared between search and browse pages.
    if (path.indexOf("/browse-by-topic") === 0) {
      const links = document.getElementsByClassName("internalItemLink");
      const items = this.props.items;

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
            itemId: item.id,
            title: joinIfArray(item.title),
            partner: joinIfArray(item.provider),
            contributor: joinIfArray(item.dataProvider)
          };

          bindLinkEvent(gaEvent, [link], "_self");
        }
      });
    }
  }

  render() {
    const { items, route } = this.props;
    return (
      <ul className={css.listView}>
        {items.map(item =>
          <li key={item["@id"] || item.id} className={css.listItem}>
            <ListImage
              item={item}
              title={item.title}
              type={item.type}
              url={item.thumbnailUrl}
              useDefaultImage={item.useDefaultImage}
            />
            <div className={css.itemInfo}>
              <h2 className={`hover-underline ${css.itemTitle}`}>
                {/* see issue #869 for details on this hack */}
                {item.id !== "http://dp.la/api/items/#sourceResource" &&
                  <Link href={item.linkHref} as={item.linkAs}>
                    <a className={`internalItemLink`}>
                      {route.pathname.indexOf("/search") === 0 && item.title
                        ? truncateString(item.title, 150)
                        : item.title ? item.title : UNTITLED_TEXT}
                    </a>
                  </Link>}
                {/* see issue #869 for details on this hack */}
                {item.id === "http://dp.la/api/items/#sourceResource" &&
                  <span>
                    {route.pathname.indexOf("/search") === 0 && item.title
                      ? truncateString(item.title, 150)
                      : item.title ? item.title : UNTITLED_TEXT}
                  </span>}
              </h2>

              {(item.date || item.creator) &&
                <span className={css.itemAuthorAndDate}>
                  {route.pathname.indexOf("/search") === 0 &&
                    item.date &&
                    <span>{item.date.displayDate}</span>}
                  {route.pathname.indexOf("/search") === 0 &&
                    item.date &&
                    item.date.displayDate &&
                    item.creator &&
                    <span> · </span>}
                  <span>{joinIfArray(item.creator, ", ")}</span>
                </span>}
              <ItemDescription description={item.description} />
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover-underline clickThrough external ${css.itemSource}`}
              >
                {item.type === "image"
                  ? "View Full Image"
                  : item.type === "text" ? "View Full Text" : "View Full Item"}
              </a>
              {item.dataProvider &&
                <span className={`${css.itemProvider}`}>
                  &nbsp; in {item.dataProvider}
                </span>}
            </div>
          </li>
        )}
      </ul>
    );
  }
}

export default ListView;
