import React from "react";

import css from "./CarouselNavArrows.module.scss";

import LargeChevron from "components/svg/ChevronThin";

function NextArrow({ onClick, className }) {
  return (
    <button
      className={`${css.arrow} ${css.nextArrow} ${className}`}
      tabIndex={-1}
      aria-hidden={true}
      onClick={onClick}
    >
      <LargeChevron />
    </button>
  );
}

function PrevArrow({ onClick, className }) {
  return (
    <button
      className={`${css.arrow} ${css.prevArrow} ${className}`}
      tabIndex={-1}
      aria-hidden={true}
      onClick={onClick}
    >
      <LargeChevron />
    </button>
  );
}

export { PrevArrow, NextArrow };
