import React from "react";
import Link from "next/link";

import css from "./ExhibitionSection.scss";

const Sidebar = ({
  exhibition,
  currentSubsection,
  currentSection,
  isShowing
}) =>
  <div className={`${css.sidebar} ${isShowing ? css.overlayActive : ""}`}>
    <ul className={css.sidebarSections}>
      {exhibition.sections.map(section =>
        <li key={section.id}>
          <Link
            prefetch
            href={{
              pathname: `/exhibitions/exhibition/section/subsection`,
              query: { exhibition: exhibition.slug, section: section.slug }
            }}
            as={{ pathname: `/exhibitions/${exhibition.slug}/${section.slug}` }}
          >
            <a
              className={[
                css.sectionTitle,
                section.id === currentSection.id && css.active
              ].join(" ")}
            >
              {section.title}
            </a>
          </Link>
          {section.id === currentSection.id &&
            <ul>
              {section.subsections.map(subsection =>
                <li
                  key={subsection.id}
                  className={[
                    css.subsectionTitle,
                    subsection.id === currentSubsection.id && css.active
                  ].join(" ")}
                >
                  <Link
                    prefetch
                    href={{
                      pathname: `/exhibitions/exhibition/section/subsection`,
                      query: {
                        exhibition: exhibition.slug,
                        section: section.slug,
                        subsection: subsection.slug !== section.slug
                          ? subsection.slug
                          : ""
                      }
                    }}
                    as={{
                      pathname: `/exhibitions/${exhibition.slug}/${section.slug}/${subsection.slug !==
                        section.slug
                        ? subsection.slug
                        : ""}`
                    }}
                  >
                    <a>{subsection.title}</a>
                  </Link>
                </li>
              )}
            </ul>}
        </li>
      )}
    </ul>
  </div>;

export default Sidebar;
