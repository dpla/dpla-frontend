import React from "react";

import { Link } from "react-router-dom";

import styles from "./SourceSetSources.css";
import { module } from "../../../../../../../../css/utils.css";

const mockSets = [
  {
    img: "http://lorempixel.com/152/168/food",
    id: 0,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 1,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 2,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 3,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 4,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 5,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 6,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 7,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 8,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 9,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 10,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  },
  {
    img: "http://lorempixel.com/152/168/food",
    id: 11,
    title:
      "A photographic portrait of Clara Barton attributed to Mathew Brady, ca. 1865."
  }
];

const SourceSetSources = ({ match }) =>
  <div className={styles.wrapper}>
    <div className={[styles.sourceSetSources, module].join(" ")}>
      {mockSets.map(({ title, img, id }) =>
        <Link to={`${match.url}/sources/${id}`} className={styles.set}>
          <div className={styles.imageWrapper}>
            <img alt={title} src={img} className={styles.image} />
          </div>
          <p className={styles.title}>{title}</p>
        </Link>
      )}
    </div>
  </div>;

export default SourceSetSources;
