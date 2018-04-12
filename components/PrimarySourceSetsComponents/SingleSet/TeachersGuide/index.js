import React from "react";
import Link from "next/link";

import removeQueryParams from "utilFunctions/removeQueryParams";
import { GOOGLE_CLASSROOMS_SHARE_URL } from "constants/site";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";
import css from "./TeachersGuide.scss";

const markdownit = require("markdown-it")({ html: true });

const printer = "/static/images/printer.svg";
const link = "/static/images/link.svg";
const googleClassroom = "/static/images/google-classroom.svg";

const printHandler = () => window.print();

const TeachersGuide = ({ route, teachingGuide, setName, currentPath }) =>
  <div
    className={css.wrapper}
    role="tabpanel"
    aria-labelledby="tab-teachingguide"
  >
    <div className={`${css.teachingGuide} ${utils.container}`}>
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <div className={css.content}>
            <div className={contentCss.content}>
              <h3>Discussion questions</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownit.render(
                    teachingGuide.hasPart.find(
                      item => item.name === "Questions"
                    ).text
                  )
                }}
              />
              <h3>Classroom activities</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownit.render(
                    teachingGuide.hasPart.find(item => item.name === "Activity")
                      .text
                  )
                }}
              />
            </div>
            <div className={css.aboutThis}>
              <h3 className={css.aboutThisHeader}>About This Guide</h3>
              <div>
                This teaching guide helps instructors use a specific primary
                source
                set,{" "}
                <Link
                  prefetch
                  href={`/primary-source-sets/set?set=${route.query.set}`}
                  as={{
                    pathname: `/primary-source-sets/${route.query.set}`,
                    query: removeQueryParams(route.query, ["set"])
                  }}
                >
                  <a className={`link ${css.aboutThisLink}`}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: markdownit.renderInline(
                          teachingGuide.isPartOf.name
                        )
                      }}
                    />
                  </a>
                </Link>, in the classroom. It offers discussion questions,
                classroom
                activities, and primary source analysis tools. It is intended to
                spark pedagogical creativity by giving a sample approach to the
                material. Please feel free to share, reuse, and adapt the
                resources
                in this guide for your teaching purposes.
              </div>
            </div>
          </div>
        </div>
        <div className={`col-xs-12 col-md-4 ${css.sidebar}`}>
          <div className={[css.teacherTools, css.sidebarSection].join(" ")}>
            <h3 className={css.sidebarHeader}>Created By</h3>
            {teachingGuide.author.map((author, i) =>
              <div
                className={css.sidebarSection}
                key={i}
                dangerouslySetInnerHTML={{
                  __html: markdownit.renderInline(
                    author.name + ", " + author.affiliation.name
                  )
                }}
              />
            )}
            <h3 className={css.sidebarHeader}>Teacher Tools</h3>
            <div className={css.tools}>
              <div className={css.toolLinkAndIcon}>
                <img src={googleClassroom} alt="" className={css.toolIcon} />
                <a
                  href={`${GOOGLE_CLASSROOMS_SHARE_URL}?url=${currentPath
                    ? currentPath
                    : window.location.href.replace("teaching-guide", "")}`}
                  className={css.toolLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Share to Google Classroom
                </a>
              </div>
              <div className={css.toolLinkAndIcon}>
                <img src={printer} alt="" className={css.toolIcon} />
                <a
                  onClick={printHandler}
                  className={`${css.toolLink} ${css.print}`}
                >
                  Print this Guide
                </a>
              </div>
            </div>
          </div>
          <div className={css.sidebarSection}>
            <h3 className={css.sidebarHeader}>
              Primary source analysis
            </h3>
            <p>For each source, ask students to indicate:</p>
            <ul className={css.ul}>
              <li>the author's point of view</li>
              <li>the author's purpose</li>
              <li>historical context</li>
              <li>audience</li>
            </ul>
            <p>For inquiry-based learning, ask students to:</p>
            <ul className={css.ul}>
              <li>
                explain how a source tells its story and/or makes its argument
              </li>
              <li>explain the relationships between sources</li>
              <li>
                compare and contrast sources in terms of point of view and
                method
              </li>
              <li>support conclusions and interpretations with evidence</li>
              <li>identify questions for further investigation</li>
            </ul>
          </div>
          <div className={css.sidebarSection}>
            <h3 className={css.sidebarHeader}>Additional tools</h3>
            <ul className={css.ul}>
              <li className={css.additionalToolWrapper}>
                <a
                  className="link"
                  href="https://www.archives.gov/education/lessons/worksheets"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Document Analysis Worksheets from the National Archives
                </a>
              </li>
              <li className={css.additionalToolWrapper}>
                <a
                  className="link"
                  href="https://www.loc.gov/teachers/usingprimarysources/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Using Primary Sources from the Library of Congress
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>;

export default TeachersGuide;
