import React from "react";

import { classNames } from "./ExhibitionSection.css";

const chevron = "/static/images/chevron-thick-black.svg";

const Viewer = ({ exhibition, section, subsection, route }) =>
  <div className={classNames.viewer}>
    <div className={classNames.breadcrumbs}>
      <span className={classNames.sectionBreadcrumb}>{section.title}</span>
      <img src={chevron} alt="" className={classNames.breadcrumbChevron} />
      <span>{subsection.title}</span>
    </div>
    <div className={classNames.viewerContent}>
      <div className={classNames.standIn}>
        hey
      </div>
      <div
        className={classNames.text}
        dangerouslySetInnerHTML={{
          __html: subsection.page_blocks.find(block => block.text).text
        }}
      />
    </div>
  </div>;

export default Viewer;
