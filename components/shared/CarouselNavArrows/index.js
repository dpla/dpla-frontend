import React from "react";

import css from "./CarouselNavArrows.module.scss";

const largeChevron = "/static/images/chevron-thin.svg";

const NextArrow = ({ onClick, className }) =>
  <button
    className={`${css.arrow} ${css.nextArrow} ${className}`}
    tabIndex={-1}
    aria-hidden={true}
    onClick={onClick}
  >
    <img alt="Right-pointing arrow" src={largeChevron} />
  </button>;

const PrevArrow = ({ onClick, className }) =>
  <button
    className={`${css.arrow} ${css.prevArrow} ${className}`}
    tabIndex={-1}
    aria-hidden={true}
    onClick={onClick}
  >
    <img alt="Left-pointing arrow" src={largeChevron} />
  </button>;

export { PrevArrow, NextArrow };
