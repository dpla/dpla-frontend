import React from "react";
import Link from "next/link";
import Grid from "react-masonry-component";

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
        <li key={item.thumbnailUrl} className={classNames.gridItem}>
          <Link prefetch href={item.linkHref} as={item.linkAs}>
            <a className={classNames.link}>
              <img
                className={classNames.image}
                src={item.thumbnailUrl}
                alt=""
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
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default GridView;
