import React from "react";

import css from "./CarouselNavArrows.module.scss";

import LargeChevron from "components/svg/chevron-thin";

const NextArrow = ({ onClick, className }) =>
  <button
    className={`${css.arrow} ${css.nextArrow} ${className}`}
    tabIndex={-1}
    aria-hidden={true}
    onClick={onClick}
  >
    <LargeChevron/>
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
