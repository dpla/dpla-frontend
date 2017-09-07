import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./ListView.css";
const externalLinkIcon = "/static/images/external-link-blue.svg";

const ListView = ({ items }) =>
  <ul className={classNames.listView}>
    {items.map(item =>
      <li className={classNames.listItem}>
        <div className={classNames.imageWrapper}>
          <img src={item.thumbnailUrl} alt="" className={classNames.image} />
        </div>
        <div className={classNames.itemInfo}>
          <span className={classNames.itemTitle}>
            {item.title}
          </span>
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
          <span className={classNames.itemDescription}>
            {item.description}
          </span>
          <Link href={item.sourceUrl}>
            <a className={classNames.itemSource}>
              <span className={classNames.itemSourceText}>Source</span>
              <img
                className={classNames.externalLinkIcon}
                src={externalLinkIcon}
                alt=""
              />
            </a>
          </Link>
        </div>
      </li>
    )}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </ul>;

export default ListView;
