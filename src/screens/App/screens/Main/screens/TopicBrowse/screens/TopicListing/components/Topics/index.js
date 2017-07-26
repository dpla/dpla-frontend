import React from "react";
import { Link } from "react-router-dom";

import styles from "./Topics.css";
import { module } from "../../../../../../../../css/utils.css";

const Topics = ({ topics }) =>
  <div className={[module, styles.topicsWrapper].join(" ")}>
    <ul className={styles.topics}>
      {topics.map(topic =>
        <li className={styles.topic}>
          <Link to={`browse-by-topics/${topic.slug}`}>
            <img alt={topic.title} src={topic.image} className={styles.image} />
            <h3 className={styles.title}>{topic.title}</h3>
          </Link>
          {topic.isFeatured && <div className={styles.ribbon}>Featured</div>}
          {topic.isNew &&
            !topic.isFeatured &&
            <div className={styles.ribbon}>New</div>}
        </li>
      )}
    </ul>
  </div>;

export default Topics;
