import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./ListView.css";
const externalLinkIcon = "/static/images/external-link-blue.svg";

const ItemDescription = ({ description }) =>
  <div>
    {Array.isArray(description)
      ? <p className={classNames.itemDescription}>{description.join(" ")}</p>
      : <p className={classNames.itemDescription}>{description}</p>}
  </div>;

const ListView = ({ items, route }) =>
  <ul className={classNames.listView}>
    {items.map(item =>
      <li key={item["@id"]} className={classNames.listItem}>
        <Link href={item.linkHref} as={item.linkAs}>
          <a className={classNames.listItemLink}>
            <div className={classNames.imageWrapper}>
              <img
                src={item.thumbnailUrl}
                alt=""
                className={classNames.image}
              />
            </div>
          </a>
        </Link>
        <div className={classNames.itemInfo}>
          <Link href={item.linkHref} as={item.linkAs}>
            <a className={classNames.listItemLink}>
              <span className={classNames.itemTitle}>
                {item.title}
              </span>
            </a>
          </Link>
          <span className={classNames.itemType}>
            {Array.isArray(item.type) ? item.type.join(", ") : item.type}
          </span>
          {(item.date || item.creator) &&
            <span className={classNames.itemAuthorAndDate}>
              {item.date && <span>{item.date.displayDate}</span>}
              {item.date &&
                item.date.displayDate &&
                item.creator &&
                <span> · </span>}
              {item.creator && <span>{item.creator}</span>}
            </span>}
          <ItemDescription description={item.description} />
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.itemSource}
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
