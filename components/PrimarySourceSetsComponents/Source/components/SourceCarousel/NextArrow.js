import React from "react";
import { classNames } from "./SourceCarousel.css";
const largeChevron = "/static/images/chevron-thin.svg";

const NextArrow = ({ onClick, className }) =>
  <button className={classNames.nextArrow} onClick={onClick}>
    <img
      alt=""
      className={[classNames.nextChevron, className].join(" ")}
      src={largeChevron}
    />
  </button>;

export default NextArrow;
