import React from "react";
import { Link } from "react-router-dom";

import styles from "./MainContent.css";
import { module } from "../../../../../../../../css/utils.css";

const MainContent = ({ topic }) =>
  <div className={[module, styles.wrapper].join(" ")}>
    <h1 className={styles.header}>{topic.title}</h1>
    <p className={styles.topicDescription}>{topic.description}</p>
    <div className={styles.divider} />
    <ul className={styles.subtopics}>
      {topic.subtopics.map(subtopic =>
        <li className={styles.subtopic}>
          <Link to={`browse-by-topic/${subtopic.slug}`}>
            <div
              className={styles.imageWrapper}
              style={{ backgroundImage: `url(${subtopic.image})` }}
            >
              <div className={styles.gradientBackground}>
                <div className={styles.itemCountAndSubtopicTitle}>
                  <p className={styles.itemCount}>
                    {subtopic.numberOfItems} Items
                  </p>
                  <h3 className={styles.subtopicTitle}>{subtopic.title}</h3>
                </div>
              </div>
            </div>
            <p className={styles.subtopicDescription}>
              {subtopic.description}
            </p>
          </Link>
        </li>
      )}
    </ul>
  </div>;

export default MainContent;
