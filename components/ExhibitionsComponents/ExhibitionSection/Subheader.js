import React from "react";

import css from "./ExhibitionSection.module.scss";

function Subheader({ subsectionTitle, onClickMenuButton, isMenuOpen }) {
  return (
    <div className={`${isMenuOpen ? css.openMenu : ""}`}>
      <div className={css.menuButtonAndBreadcrumbs}>
        <button
          onClick={onClickMenuButton}
          className={css.menuButton}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "Hide" : "Show"}
          <br />
          Menu
        </button>
        <h2 className={css.breadcrumbSubsection}>{subsectionTitle}</h2>
      </div>
    </div>
  );
}

export default Subheader;
