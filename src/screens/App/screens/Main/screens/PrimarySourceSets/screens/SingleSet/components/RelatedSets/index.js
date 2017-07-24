import React from "react";

import styles from "./RelatedSets.css";
import { module } from "../../../../../../../../css/utils.css";

const mockSets = [
  {
    img: "http://lorempixel.com/400/200/food",
    title: "New York City"
  },
  {
    img: "http://lorempixel.com/400/200/food",
    title: "Early Chinese Immigration to the US"
  },
  {
    img: "http://lorempixel.com/400/200/food",
    title: "Mexican Labor and World War II: The Bracero..."
  },
  {
    img: "http://lorempixel.com/400/200/food",
    title: "The Impact of Television on News Media"
  }
];

const RelatedSets = () =>
  <div className={styles.wrapper}>
    <div className={[module, styles.relatedSets].join(" ")}>
      <h3 className={styles.header}>Related Primary Source Sets</h3>
      <div className={styles.sets}>
        {mockSets.map(({ img, title }) =>
          <div className={styles.set}>
            <img alt={title} src={img} className={styles.setImage} />
            <p className={styles.title}>{title}</p>
          </div>
        )}
      </div>
    </div>
  </div>;

export default RelatedSets;
