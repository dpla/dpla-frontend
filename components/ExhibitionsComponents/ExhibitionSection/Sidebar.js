import React from "react";
import Link from "next/link";

import css from "./ExhibitionSection.module.scss";

function Sidebar({
  currentSubsection,
  currentSection,
  isShowing,
  sectionMap,
  subsectionMap,
  exhibitionSlug,
}) {
  return (
    <div className={`${css.sidebar} ${isShowing ? css.overlayActive : ""}`}>
      <ul className={css.sidebarSections}>
        {sectionMap.map((section) => (
          <li key={section.id}>
            <Link
              href={`/exhibitions/${exhibitionSlug}/${section.slug}`}
              className={[
                css.sectionTitle,
                section.id === currentSection.id && css.active,
              ].join(" ")}
            >
              {section.title}
            </Link>
            {section.id === currentSection.id && (
              <ul>
                {subsectionMap.map((subsection) => (
                  <li
                    key={subsection.id}
                    className={[
                      css.subsectionTitle,
                      subsection.id === currentSubsection.id && css.active,
                    ].join(" ")}
                  >
                    <Link
                      href={`/exhibitions/${exhibitionSlug}/${section.slug}/${subsection.slug !== section.slug ? subsection.slug : ""}`}
                    >
                      {subsection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
