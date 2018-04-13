import React from "react";
import Link from "next/link";
import Grid from "react-masonry-component";

import GridImage from "./GridImage";

import css from "./GridView.scss";

const GridView = ({ items, style }) =>
  <div className={css.wrapper} style={style}>
    <Grid
      elementType="ul"
      className={css.grid}
      options={{
        gutter: 5
      }}
    >
      {items.map(item =>
        <li key={item.id} className={css.gridItem}>
          <Link prefetch href={item.linkHref} as={item.linkAs}>
            <a className={css.link}>
              <GridImage
                title={item.title}
                type={item.type}
                url={item.thumbnailUrl}
                useDefaultImage={item.useDefaultImage}
              />
              <p className={[css.hoverText, css.blockWithText].join(" ")}>
                {item.title}
              </p>
            </a>
          </Link>
        </li>
      )}
    </Grid>
  </div>;

export default GridView;
