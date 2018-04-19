import React from "react";
import Link from "next/link";

import ListImage from "./ListImage";
import GaListViewWrapper from "./GaListViewWrapper";

import { joinIfArray, truncateString } from "utilFunctions";
import { UNTITLED_TEXT } from "constants/site";

import css from "./ListView.scss";

const externalLinkIcon = "/static/images/external-link-blue.svg";

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

const ListView = ({ items, route }) =>
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
            <Link href={item.linkHref} as={item.linkAs}>
              <a className={`internalItemLink`}>
                {route.pathname.indexOf("/search") === 0 && item.title
                  ? truncateString(item.title, 150)
                  : item.title ? item.title : UNTITLED_TEXT}
              </a>
            </Link>
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
  </ul>;

export default GaListViewWrapper(ListView);
