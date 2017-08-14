import React from "react";
import Link from "next/link";

import { classNames } from "./ExhibitionSection.css";

const Sidebar = ({ exhibition }) =>
  <div className={classNames.sidebar}>
    <ul className={classNames.sidebarSections}>
      {exhibition.sections.map(section =>
        <li>
          <span
            className={[
              classNames.sectionTitle,
              section.active && classNames.active
            ].join(" ")}
          >
            {section.title}
          </span>
          {section.active &&
            <ul>
              {section.subsections.map(subsection =>
                <li
                  className={[
                    classNames.subsectionTitle,
                    subsection.active && classNames.active
                  ].join(" ")}
                >
                  {subsection.title}
                </li>
              )}
            </ul>}
        </li>
      )}
    </ul>
    <Link><a>References</a></Link>
  </div>;

export default Sidebar;
