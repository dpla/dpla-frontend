import React from "react";

import { classNames } from "./ExhibitionSection.css";
const chevron = "/static/images/chevron-thick-black.svg";
const menuButtonIcon = "/static/images/menu-black.svg";
const closeIcon = "/static/images/close-white.svg";

const Subheader = ({ section, subsection, onClickMenuButton, isMenuOpen }) =>
  isMenuOpen ?
  <div className={classNames.menuHeader}>
      <button onClick={onClickMenuButton} className={classNames.closeMenuButton}>
        <img
          alt=""
          src={closeIcon}
          className={classNames.closeMenuButtonIcon}
        />
      </button>
      <div className={classNames.menuHeaderText}>Jump to a section</div>
    </div>
    : <div className={classNames.menuButtonAndBreadcrumbs}>
        <button onClick={onClickMenuButton} className={classNames.menuButton}>
          <img
            alt=""
            src={menuButtonIcon}
            className={classNames.menuButtonIcon}
          />
        </button>
        <div className={classNames.breadcrumbs}>
          <span className={classNames.sectionBreadcrumb}>{section.title}</span>
          <img src={chevron} alt="" className={classNames.breadcrumbChevron} />
          <span>{subsection.title}</span>
        </div>
      </div>;

export default Subheader;
