import React from "react";

import { classNames } from "./ExhibitionSection.css";
const menuButtonIcon = "/static/images/menu-black.svg";
const closeIcon = "/static/images/close-white.svg";

const Subheader = ({ section, subsection, onClickMenuButton, isMenuOpen }) =>
  <div className={`${isMenuOpen ? classNames.openMenu : ""}`}>
    <div className={classNames.menuHeader}>
      <button
        onClick={onClickMenuButton}
        className={classNames.closeMenuButton}
      >
        <img
          alt=""
          src={closeIcon}
          className={classNames.closeMenuButtonIcon}
        />
      </button>
      <div className={classNames.menuHeaderText}>Jump to a section</div>
    </div>
    <div className={classNames.menuButtonAndBreadcrumbs}>
      <button onClick={onClickMenuButton} className={classNames.menuButton}>
        <img
          alt=""
          src={menuButtonIcon}
          className={classNames.menuButtonIcon}
        />
      </button>
      <div className={classNames.title}>
        <span className={classNames.titleSection}>{section.title}</span>
        <span className={classNames.titleSubsection}>{subsection.title}</span>
      </div>
    </div>
  </div>;

export default Subheader;
