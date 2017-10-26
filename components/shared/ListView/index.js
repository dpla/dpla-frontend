import React from "react";
import Link from "next/link";

import { joinIfArray } from "utilFunctions";
import { truncateString } from "utilFunctions";
import { endsWith } from "utilFunctions";

import ListImage from "./ListImage";
import { classNames, stylesheet } from "./ListView.css";

const externalLinkIcon = "/static/images/external-link-blue.svg";

const ItemDescription = ({ description }) => {
  let str = joinIfArray(description);
  str = truncateString(str);
  return (
    <div>
      <p className={classNames.itemDescription}>
        {str}
      </p>
    </div>
  );
};

const ListView = ({ items, route }) =>
  <ul className={classNames.listView}>
    {items.map(item =>
      <li key={item["@id"] || item.id} className={classNames.listItem}>
        <Link prefetch href={item.linkHref} as={item.linkAs}>
          <a
            className={`${classNames.listItemLink} ${classNames.listItemImageLink}`}
          >
            <ListImage
              title={item.title}
              type={item.type}
              url={item.thumbnailUrl}
              useDefaultImage={item.useDefaultImage}
            />
          </a>
        </Link>
        <div className={classNames.itemInfo}>
          <Link prefetch href={item.linkHref} as={item.linkAs}>
            <a className={classNames.listItemLink}>
              <span className={`hover-underline ${classNames.itemTitle}`}>
                {item.title}
              </span>
            </a>
          </Link>
          {(item.date || item.creator) &&
            <span className={classNames.itemAuthorAndDate}>
              {endsWith(route.pathname, "/search") === 0 &&
                item.date &&
                <span>{item.date.displayDate}</span>}
              {endsWith(route.pathname, "/search") === 0 &&
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
            className={`hover-underline ${classNames.itemSource}`}
          >
            <span className={classNames.itemSourceText}>Source</span>
            <img
              className={classNames.externalLinkIcon}
              src={externalLinkIcon}
              alt=""
            />
          </a>
        </div>
      </li>
    )}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </ul>;

export default ListView;
