import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";

import { NextArrow, PrevArrow } from "components/shared/CarouselNavArrows";

import { extractSourceSetSlug } from "lib/";

import utils from "stylesheets/utils.scss";
import css from "./RelatedItems.scss";

const RelatedItems = ({ items }) => {
  return (
    <div className={css.wrapper}>
      {items.map((item, index) =>
        <div>{item.id}</div>
      )}
    </div>
  );
};

export default RelatedItems;
