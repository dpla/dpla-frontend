import React from "react";
import Link from "next/link";
import Grid from "react-masonry-component";

import GridImage from "./GridImage";

import { classNames, stylesheet } from "./GridView.css";

const GridView = ({ items, style }) =>
  <div className={classNames.wrapper} style={style}>
    <Grid
      elementType="ul"
      className={classNames.grid}
      options={{
        gutter: 5
      }}
    >
      {items.map(item =>
        <li key={item.id} className={classNames.gridItem}>
          <Link prefetch href={item.linkHref} as={item.linkAs}>
            <a className={classNames.link}>
              <GridImage
                title={item.title}
                type={item.type}
                url={item.thumbnailUrl}
                useDefaultImage={item.useDefaultImage}
              />
              <p
                className={[
                  classNames.hoverText,
                  classNames.blockWithText
                ].join(" ")}
              >
                {item.title}
              </p>
            </a>
          </Link>
        </li>
      )}
    </Grid>
    <style>{stylesheet}</style>
  </div>;

export default GridView;
