import React from "react";

import css from "./CarouselNavArrows.module.scss";

import LargeChevron from "components/svg/ChevronThin";

const NextArrow = ({ onClick, className }) =>
  <button
    className={`${css.arrow} ${css.nextArrow} ${className}`}
    tabIndex={-1}
    aria-hidden={true}
    onClick={onClick}
  >
    <LargeChevron alt="Right-pointing arrow" />
  </button>;

const PrevArrow = ({ onClick, className }) =>
  <button
    className={`${css.arrow} ${css.prevArrow} ${className}`}
    tabIndex={-1}
    aria-hidden={true}
    onClick={onClick}
  >
    <LargeChevron alt="Left-pointing arrow" />
  </button>;

export { PrevArrow, NextArrow };
