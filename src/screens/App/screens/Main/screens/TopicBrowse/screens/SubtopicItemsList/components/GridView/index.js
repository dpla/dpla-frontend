import React from "react";
import { Link } from "react-router-dom";
import Grid from "react-masonry-component";

import styles from "./GridView.css";

const GridView = ({ items }) =>
  <div className={styles.wrapper}>
    <div className={styles.gridSizer} />
    <Grid
      elementType="ul"
      className={styles.grid}
      options={{
        gutter: 5
      }}
    >
      {items.map(item =>
        <li className={styles.gridItem}>
          <Link className={styles.link} to={item.sourceUrl}>
            <img
              className={styles.image}
              src={item.image}
              alt={item.description}
            />
          </Link>
        </li>
      )}
    </Grid>
  </div>;

export default GridView;
