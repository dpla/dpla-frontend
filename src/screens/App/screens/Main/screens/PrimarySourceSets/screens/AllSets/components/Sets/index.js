import React from "react";
import { Link } from "react-router-dom";

import styles from "./Sets.css";
import { module } from "../../../../../../../../css/utils.css";

const Sets = ({ sets }) =>
  <div className={[module, styles.setsWrapper].join(" ")}>
    <ul className={styles.sets}>
      {sets.map(set =>
        <li className={styles.set}>
          <Link to={`primary-source-sets/${set.slug}`}>
            <img alt={set.title} src={set.image} className={styles.image} />
          </Link>
          <p className={styles.itemCount}>65 Items</p>
          <Link to={`primary-source-sets/${set.slug}`}>
            <p className={styles.title}>{set.title}</p>
          </Link>
          <p className={styles.subtitle}>{set.subtitle}</p>
          <ul className={styles.tags}>
            {set.tags.map((tag, i) =>
              <li className={styles.tag}>
                <Link to="">{tag}</Link>
                {i < set.tags.length - 1 && <span>,&nbsp;</span>}
              </li>
            )}
          </ul>
        </li>
      )}
    </ul>
  </div>;

export default Sets;
