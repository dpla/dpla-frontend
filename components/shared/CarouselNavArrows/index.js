import React from "react";
import { classNames } from "./CarouselNavArrows.css";

const largeChevron = "/static/images/chevron-thin.svg";

const NextArrow = ({ onClick, className }) =>
  <button
    className={`${classNames.arrow} ${classNames.nextArrow} ${className}`}
    tabIndex={-1}
    aria-hidden={true}
    onClick={onClick}
  >
    <img alt="Right-pointing arrow" src={largeChevron} />
  </button>;

const PrevArrow = ({ onClick, className }) =>
  <button
    className={`${classNames.arrow} ${classNames.prevArrow} ${className}`}
    tabIndex={-1}
    aria-hidden={true}
    onClick={onClick}
  >
    <img alt="Left-pointing arrow" src={largeChevron} />
  </button>;

export { PrevArrow, NextArrow };
