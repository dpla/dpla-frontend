import React from "react";
import Link from "next/link";
import Grid from "react-masonry-component";

import { classNames, stylesheet } from "./GridView.css";

const GridView = ({ items }) =>
  <div className={classNames.wrapper}>
    <div className={classNames.gridSizer} />
    <Grid
      elementType="ul"
      className={classNames.grid}
      options={{
        gutter: 5
      }}
    >
      {items.map(item =>
        <li className={classNames.gridItem}>
          <Link to={item.sourceUrl}>
            <a className={classNames.link}>
              <img
                className={classNames.image}
                src={item.image}
                alt={item.description}
              />
            </a>
          </Link>
        </li>
      )}
    </Grid>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default GridView;
