import React from "react";
import Link from "next/link";

import removeQueryParams from "utilFunctions/removeQueryParams";
import { GOOGLE_CLASSROOMS_SHARE_URL } from "constants/site";
import { classNames, stylesheet } from "./TeachersGuide.css";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const markdownit = require("markdown-it")({ html: true });
const { container } = utilClassNames;
const printer = "/static/images/printer.svg";
const link = "/static/images/link.svg";
const googleClassroom = "/static/images/google-classroom.svg";

const printHandler = () => window.print();

const TeachersGuide = ({ route, teachingGuide, setName, currentPath }) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.teachingGuide} ${container}`}>
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <div className={classNames.content}>
            <div className={contentClasses.content}>
              <h3>Discussion questions</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownit.render(
                    teachingGuide.hasPart
                      .find(item => item.name === "Questions")
                      .text.replace(
                        /https?:\/\/.*?\/primary-source-sets\/sources\//g,
                        "sources/"
                      )
                      .replace(
                        /https?:\/\/.*?\/primary-source-sets\/sets\//g,
                        "/primary-source-sets/"
                      )
                  )
                }}
              />
              <h3>Classroom activities</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownit.render(
                    teachingGuide.hasPart
                      .find(item => item.name === "Activity")
                      .text.replace(
                        /https?:\/\/.*?\/primary-source-sets\/sources\//g,
                        "sources/"
                      )
                      .replace(
                        /https?:\/\/.*?\/primary-source-sets\/sets\//g,
                        "/primary-source-sets/"
                      )
                  )
                }}
              />
            </div>
            <div className={classNames.aboutThis}>
              <h3 className={classNames.aboutThisHeader}>About This Guide</h3>
              <div>
                This teaching guide helps instructors use a specific primary
                source
                set,{" "}
                <Link
                  prefetch
                  href={{ pathname: route.pathname, query: route.query }}
                  as={{
                    pathname: `/primary-source-sets/${route.query.set}`,
                    query: removeQueryParams(route.query, ["set"])
                  }}
                >
                  <a className={`link ${classNames.aboutThisLink}`}>
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
        <div className={`col-xs-12 col-md-4 ${classNames.sidebar}`}>
          <div
            className={[
              classNames.teacherTools,
              classNames.sidebarSection
            ].join(" ")}
          >
            <h3 className={classNames.sidebarHeader}>Created By</h3>
            {teachingGuide.author.map((author, i) =>
              <div
                className={classNames.sidebarSection}
                key={i}
                dangerouslySetInnerHTML={{
                  __html: markdownit.renderInline(
                    author.name + ", " + author.affiliation.name
                  )
                }}
              />
            )}
            <h3 className={classNames.sidebarHeader}>Teacher Tools</h3>
            <div className={classNames.tools}>
              <div className={classNames.toolLinkAndIcon}>
                <img
                  src={googleClassroom}
                  alt=""
                  className={classNames.toolIcon}
                />
                <a
                  href={`${GOOGLE_CLASSROOMS_SHARE_URL}?url=${currentPath
                    ? currentPath
                    : window.location.href.replace("teaching-guide", "")}`}
                  className={classNames.toolLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Share to Google Classroom
                </a>
              </div>
              <div className={classNames.toolLinkAndIcon}>
                <img src={printer} alt="" className={classNames.toolIcon} />
                <a
                  onClick={printHandler}
                  className={`${classNames.toolLink} ${classNames.print}`}
                >
                  Print this Guide
                </a>
              </div>
              <div className={classNames.toolLinkAndIcon}>
                <img src={link} alt="" className={classNames.toolIcon} />
                <Link
                  prefetch
                  href={{
                    pathname: `/primary-source-sets/set`,
                    query: Object.assign({}, route.query, { studentMode: true })
                  }}
                  as={{
                    pathname: `/primary-source-sets/${route.query.set}`,
                    query: Object.assign(
                      {},
                      removeQueryParams(route.query, ["set"]),
                      { studentMode: true }
                    )
                  }}
                >
                  <a className={classNames.toolLink}>Link to Student View</a>
                </Link>
              </div>
              <p className={classNames.studentViewNote}>
                <span className={classNames.semibold}>Student View</span> is a
                link
                to this Primary Source Set with the Teaching Guide hidden.
              </p>

            </div>
          </div>
          <div className={classNames.sidebarSection}>
            <h3 className={classNames.sidebarHeader}>
              Primary source analysis
            </h3>
            <p>For each source, ask students to indicate:</p>
            <ul className={classNames.ul}>
              <li>the author's point of view</li>
              <li>the author's purpose</li>
              <li>historical context</li>
              <li>audience</li>
            </ul>
            <p>For inquiry-based learning, ask students to:</p>
            <ul className={classNames.ul}>
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
          <div className={classNames.sidebarSection}>
            <h3 className={classNames.sidebarHeader}>Additional tools</h3>
            <ul className={classNames.ul}>
              <li className={classNames.additionalToolWrapper}>
                <a
                  className="link"
                  href="https://www.archives.gov/education/lessons/worksheets"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Document Analysis Worksheets from the National Archives
                </a>
              </li>
              <li className={classNames.additionalToolWrapper}>
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
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </div>;

export default TeachersGuide;
