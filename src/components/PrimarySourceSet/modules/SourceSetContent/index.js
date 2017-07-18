import React from "react";

import styles from "./SourceSetContent.css";
import { module } from "../../../../utils.css";

const mockSets = [
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168",
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  }
];

const SourceSetContent = () =>
  <div className={styles.wrapper}>
    <div className={[styles.sourceSetContent, module].join(" ")}>
      {mockSets.map(({ title, img }) =>
        <div className={styles.set}>
          <div className={styles.imageWrapper}>
            <img alt={title} src={img} className={styles.image} />
          </div>
          <p className={styles.title}>{title}</p>
        </div>
      )}
    </div>
  </div>;

export default SourceSetContent;
