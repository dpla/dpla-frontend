import React from "react";
// import Link from "next/link";

import { classNames, stylesheet } from "./Exhibitions.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const Exhibitions = ({ exhibitions, route }) =>
  <div className={[module, classNames.exhibitionsWrapper].join(" ")}>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Exhibitions;
