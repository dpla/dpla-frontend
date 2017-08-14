import React from "react";

import Sidebar from "./Sidebar";

import { classNames } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const Body = ({ exhibition, route }) =>
  <div className={[module, classNames.body].join(" ")}>
    <Sidebar exhibition={exhibition} />
  </div>;

export default Body;
