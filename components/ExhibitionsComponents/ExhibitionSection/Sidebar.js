import React from "react";
import Link from "next/link";

import { classNames } from "./ExhibitionSection.css";

const Sidebar = ({ exhibition, currentSubsection, currentSection }) =>
  <div className={classNames.sidebar}>
    <ul className={classNames.sidebarSections}>
      {exhibition.sections.map(section =>
        <li>
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
                classNames.sectionTitle,
                section.id === currentSection.id && classNames.active
              ].join(" ")}
            >
              {section.title}
            </a>
          </Link>
          {section.id === currentSection.id &&
            <ul>
              {section.subsections.map(subsection =>
                <li
                  className={[
                    classNames.subsectionTitle,
                    subsection.id === currentSubsection.id && classNames.active
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
