import React from "react";

import { classNames } from "./ExhibitionSection.css";
const menuButtonIcon = "/static/images/menu-black.svg";
const closeIcon = "/static/images/close-white.svg";

const Subheader = ({ section, subsection, onClickMenuButton, isMenuOpen }) =>
  <div className={`${isMenuOpen ? classNames.openMenu : ""}`}>
    <div className={classNames.menuButtonAndBreadcrumbs}>
      <button
        onClick={onClickMenuButton}
        className={classNames.menuButton}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? "Hide" : "Show"}<br />Menu
      </button>
      <h2 className={classNames.breadcrumbSubsection}>
        {subsection.title}
      </h2>
    </div>
  </div>;

export default Subheader;
