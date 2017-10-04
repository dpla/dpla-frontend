import React from "react";

import Sidebar from "./Sidebar";
import Viewer from "./Viewer";

import { classNames } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";
const { container } = utilClassNames;

const Body = ({ exhibition, section, subsection, route }) =>
  <div className={[container, classNames.body].join(" ")}>
    <Sidebar
      exhibition={exhibition}
      currentSubsection={subsection}
      currentSection={section}
    />
    <Viewer
      route={route}
      subsection={subsection}
      exhibition={exhibition}
      section={section}
    />
  </div>;

export default Body;
