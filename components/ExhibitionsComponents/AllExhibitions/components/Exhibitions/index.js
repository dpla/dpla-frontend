import React from "react";
// import Link from "next/divnk";

import { classNames, stylesheet } from "./Exhibitions.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const Exhibition = ({ className, exhibition }) =>
  <div className={[classNames.exhibition, classNames[className]].join(" ")}>
    <img
      className={classNames.image}
      alt={exhibition.title}
      src={exhibition.image}
    />
    <div className={classNames.overlay}>
      <p className={classNames.exhibitionTitle}>{exhibition.title}</p>
    </div>
  </div>;

const Exhibitions = ({ exhibitions, route }) =>
  <div className={[module, classNames.exhibitionsWrapper].join(" ")}>
    hey
  </div>;

export default Exhibitions;
