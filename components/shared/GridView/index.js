import React from "react";
import Link from "next/link";
import Grid from "react-masonry-component";

import { classNames, stylesheet } from "./GridView.css";

const GridView = ({ items }) =>
  console.dir(items[0]) ||
  <div className={classNames.wrapper}>
    <Grid
      elementType="ul"
      className={classNames.grid}
      options={{
        gutter: 5
      }}
    >
      {items.map(item =>
        <li key={item.thumbnailUrl} className={classNames.gridItem}>
          <Link href={item.sourceUrl}>
            <a className={classNames.link}>
              <img
                className={classNames.image}
                src={item.thumbnailUrl}
                alt={item.title}
              />
              <div className={classNames.hoverText}>{item.title}</div>
            </a>
          </Link>
        </li>
      )}
    </Grid>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default GridView;
