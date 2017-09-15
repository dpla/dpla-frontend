import React from "react";
import Link from "next/link";
import { markdown } from "markdown";

import removeQueryParams from "utilFunctions/removeQueryParams";
import { classNames, stylesheet } from "./TeachersGuide.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const printer = "/static/images/printer.svg";
const link = "/static/images/link.svg";
const googleClassroom = "/static/images/google-classroom.svg";

const TeachersGuide = ({ route, teachingGuide, setName }) =>
  <div className={classNames.wrapper}>
    <div className={[classNames.teachingGuide, module].join(" ")}>
      <div className={classNames.content}>
        <div className={classNames.markdownWrapper}>
          <h2 className={classNames.contentHeader}>Discussion questions</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: markdown.toHTML(
                teachingGuide.hasPart.find(item => item.name === "Questions")
                  .text
              )
            }}
          />
          <h2 className={classNames.contentHeader}>Classroom activities</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: markdown.toHTML(
                teachingGuide.hasPart.find(item => item.name === "Activity")
                  .text
              )
            }}
          />
        </div>
        <div className={classNames.aboutThis}>
          <h3 className={classNames.aboutThisHeader}>About This Guide</h3>
          <div>
            This teaching guide helps instructors use a specific primary source
            set,{" "}
            <Link
              prefetch
              href={{ pathname: route.pathname, query: route.query }}
              as={{
                pathname: `/primary-source-sets/${route.query.set}`,
                query: removeQueryParams(route.query, ["set"])
              }}
            >
              <a className={classNames.aboutThisLink}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: markdown.toHTML(teachingGuide.isPartOf.name)
                  }}
                />
              </a>
            </Link>, in the classroom. It offers discussion questions, classroom
            activities, and primary source analysis tools. It is intended to
            spark pedagogical creativity by giving a sample approach to the
            material. Please feel free to share, reuse, and adapt the resources
            in this guide for your teaching purposes.
          </div>
        </div>
      </div>
      <div className={classNames.sidebar}>
        <div
          className={[classNames.teacherTools, classNames.sidebarSection].join(
            " "
          )}
        >
          <h3 className={classNames.sidebarHeader}>Teacher Tools</h3>
          <div className={classNames.toolLinkAndIcon}>
            <img src={googleClassroom} alt="" className={classNames.toolIcon} />
            <Link prefetch href="">
              <a className={classNames.toolLink}>Share to Google Classroom</a>
            </Link>
          </div>
          <div className={classNames.toolLinkAndIcon}>
            <img src={printer} alt="" className={classNames.toolIcon} />
            <Link prefetch href="">
              <a className={classNames.toolLink}>Print this Guide</a>
            </Link>
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
            <span className={classNames.semibold}>Student View</span> is a link
            to this Primary Source Set with the Teaching Guide hidden.
          </p>
        </div>
        <div className={classNames.sidebarSection}>
          <h3 className={classNames.sidebarHeader}>Primary source analysis</h3>
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
              compare and contrast sources in terms of point of view and method
            </li>
            <li>support conclusions and interpretations with evidence</li>
            <li>identify questions for further investigation</li>
          </ul>
        </div>
        <div className={classNames.sidebarSection}>
          <h3 className={classNames.sidebarHeader}>Additional tools</h3>
          <ul className={classNames.ul}>
            <li>Document Analysis Worksheets from the National Archives</li>
            <li>Using Primary Sources from the Library of Congress</li>
          </ul>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default TeachersGuide;
