import React from "react";
import { Link } from "react-router-dom";

import styles from "./Sets.css";
import { module } from "../../../../utils.css";

const Sets = ({ sets }) =>
  <div className={[module, styles.setsWrapper].join(" ")}>
    <ul className={styles.sets}>
      {sets.map(set =>
        <li className={styles.set}>
          <img alt={set.title} src={set.image} className={styles.image} />
          <h3 className={styles.title}>{set.title}</h3>
          <h4 className={styles.subtitle}>{set.subtitle}</h4>
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
