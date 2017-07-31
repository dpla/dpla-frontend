import React from "react";
import { Link } from "react-router-dom";

import styles from "./ListView.css";

import externalLinkIcon from "../../../../../../../../../../images/external-link-blue.svg";

const ListView = ({ items }) =>
  <ul className={styles.listView}>
    {items.map(item =>
      <li className={styles.listItem}>
        <div className={styles.imageWrapper}>
          <img src={item.image} alt={item.title} className={styles.image} />
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemTitle}>{item.title}</span>
          <span className={styles.itemType}>{item.type}</span>
          <span className={styles.itemAuthor}>{item.author}</span>
          <span className={styles.itemDescription}>{item.description}</span>
          <Link to={item.sourceUrl} className={styles.itemSource}>
            <span className={styles.itemSourceText}>Source</span>
            <img
              className={styles.externalLinkIcon}
              src={externalLinkIcon}
              alt=""
            />
          </Link>
        </div>
      </li>
    )}
  </ul>;

export default ListView;
