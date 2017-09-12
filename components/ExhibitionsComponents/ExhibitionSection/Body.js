import React from "react";

import Sidebar from "./Sidebar";
import Viewer from "./Viewer";

import mockExhibition from "../Exhibition/mockExhibition";
import { classNames } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const Body = ({ exhibition, section, subsection, route }) =>
  <div className={[module, classNames.body].join(" ")}>
    <Sidebar
      exhibition={exhibition}
      currentSubsection={subsection}
      currentSection={section}
    />
    <Viewer subsection={subsection} exhibition={exhibition} section={section} />
  </div>;

export default Body;
