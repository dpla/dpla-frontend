import React from "react";

import css from "./ExhibitionSection.scss";

const menuButtonIcon = "/static/images/menu-black.svg";
const closeIcon = "/static/images/close-white.svg";

const Subheader = ({ section, subsection, onClickMenuButton, isMenuOpen }) =>
  <div className={`${isMenuOpen ? css.openMenu : ""}`}>
    <div className={css.menuButtonAndBreadcrumbs}>
      <button
        onClick={onClickMenuButton}
        className={css.menuButton}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? "Hide" : "Show"}<br />Menu
      </button>
      <h2 className={css.breadcrumbSubsection}>
        {subsection.title}
      </h2>
    </div>
  </div>;

export default Subheader;
