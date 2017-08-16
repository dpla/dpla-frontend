import React from "react";
import { classNames } from "./SourceCarousel.css";
const largeChevron = "/static/images/chevron-thin.svg";

const PrevArrow = ({ onClick, className }) =>
  <button className={classNames.prevArrow} onClick={onClick}>
    <img
      alt=""
      className={[classNames.backChevron, className].join(" ")}
      src={largeChevron}
    />
  </button>;

export default PrevArrow;
