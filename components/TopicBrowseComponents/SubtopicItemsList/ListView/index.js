import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./ListView.css";
const externalLinkIcon = "/static/images/external-link-blue.svg";

const ListView = ({ items }) =>
  <ul className={classNames.listView}>
    {items.map(item =>
      <li className={classNames.listItem}>
        <div className={classNames.imageWrapper}>
          <img src={item.image} alt={item.title} className={classNames.image} />
        </div>
        <div className={classNames.itemInfo}>
          <span className={classNames.itemTitle}>
            {item.title}
          </span>
          <span className={classNames.itemType}>
            {item.type}
          </span>
          <span className={classNames.itemAuthor}>
            {item.author}
          </span>
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
