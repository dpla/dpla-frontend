import React from "react";

import css from "./ExhibitionSection.module.scss";

const Subheader = ({ subsectionTitle, onClickMenuButton, isMenuOpen }) =>
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
        {subsectionTitle}
      </h2>
    </div>
  </div>;

export default Subheader;
