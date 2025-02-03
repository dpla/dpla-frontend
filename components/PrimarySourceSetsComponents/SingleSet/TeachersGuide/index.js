import React from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { withRouter } from "next/router";

import { removeQueryParams, markdownLinks } from "lib";

import contentCss from "stylesheets/content-pages.module.scss";
import css from "./TeachersGuide.module.scss";
import utils from "stylesheets/utils.module.scss"

import Printer from "components/svg/Printer"

class TeachersGuide extends React.Component {
  state = { routePath: null };

  componentDidMount() {
    this.setState({ routePath: this.props.router.asPath });
  }

  render() {
    const {
      router,
      teachingGuide,
      isPrintable,
      setName
    } = this.props;
    return (
      <div
        className={css.wrapper}
        role="tabpanel"
        aria-labelledby="tab-teachingguide"
      >
        <div className={`${css.teachingGuide} ${utils.container}`}>
          <div className={utils.row}>
            <div className={`${utils.colXs12} ${utils.colMd8}`}>
              <div className={css.content}>
                <div className={contentCss.content}>
                  <h3>Discussion questions</h3>
                  <Markdown
                      components={{
                        a(props) { return markdownLinks(props) }
                      }}
                  >{teachingGuide.hasPart.find(
                        item => item.name === "Questions"
                    ).text
                  }</Markdown>
                  <h3>Classroom activities</h3>
                  <Markdown
                    components={{
                      a(props) {
                        return markdownLinks(props)
                      }
                    }}
                  >{
                    teachingGuide.hasPart.find(
                        item => item.name === "Activity"
                    ).text
                  }</Markdown>
                </div>
                <div className={css.aboutThis}>
                  <h3 className={css.aboutThisHeader}>About This Guide</h3>
                  <div>
                    This teaching guide helps instructors use a specific primary
                    source
                    set,{" "}
                    <Link
                      href={`/primary-source-sets/set?set=${router.query.set}`}
                      as={{
                        pathname: `/primary-source-sets/${router.query.set}`,
                        query: removeQueryParams(router.query, ["set"])
                      }}
                      className={utils.link}
                    ><Markdown
                      allowedElements={["emphasis", "text"]}
                      unwrapDisallowed
                    >{setName}</Markdown></Link>, in the classroom. It offers discussion questions,
                    classroom activities, and primary source analysis tools. It is
                    intended to spark pedagogical creativity by giving a sample approach to
                    the material. Please feel free to share, reuse, and adapt the
                    resources in this guide for your teaching purposes.
                  </div>
                </div>
              </div>
            </div>
            <div className={`${utils.colXs12} ${utils.colMd4} ${css.sidebar}`}>
              <div className={`${css.teacherTools} ${css.sidebarSection}`}>
                <h3 className={css.sidebarHeader}>Created By</h3>
                {teachingGuide.author.map((author) =>
                  <Markdown key={author.name}
                    className={css.sidebarSection}
                    allowedElements={["emphasis", "text"]}
                    unwrapDisallowed
                  >{author.name + ", " + author.affiliation.name}</Markdown>
                )}
                {isPrintable !== true &&
                  <h3 className={css.sidebarHeader}>
                    Teacher Tools
                  </h3>}
                {isPrintable !== true &&
                  this.state.routePath &&
                  <div className={css.tools}>
                    <div className={css.toolLinkAndIcon}>
                      <Printer className={css.toolIcon}/>
                      <a
                        href={
                          "" +
                          this.state.routePath.substring(
                            0,
                            this.state.routePath.indexOf("#") === -1
                              ? this.state.routePath.length
                              : this.state.routePath.indexOf("#")
                          ) +
                          "-print"
                        }
                        target="_blank"
                        rel={"noreferrer"}
                        className={`${css.toolLink} ${css.print}`}
                      >
                        Print this Guide
                      </a>
                    </div>
                  </div>}
              </div>
              <div className={css.sidebarSection}>
                <h3 className={css.sidebarHeader}>
                  Primary source analysis
                </h3>
                <p>For each source, ask students to indicate:</p>
                <ul className={css.ul}>
                  <li>the author&apos;s point of view</li>
                  <li>the author&apos;s purpose</li>
                  <li>historical context</li>
                  <li>audience</li>
                </ul>
                <p>For inquiry-based learning, ask students to:</p>
                <ul className={css.ul}>
                  <li>
                    explain how a source tells its story and/or makes its
                    argument
                  </li>
                  <li>explain the relationships between sources</li>
                  <li>
                    compare and contrast sources in terms of point of view and
                    method
                  </li>
                  <li>
                    support conclusions and interpretations with evidence
                  </li>
                  <li>identify questions for further investigation</li>
                </ul>
              </div>
              <div className={css.sidebarSection}>
                <h3 className={css.sidebarHeader}>Additional tools</h3>
                <ul className={css.ul}>
                  <li className={css.additionalToolWrapper}>
                    <a
                      className="link external"
                      href="https://www.archives.gov/education/lessons/worksheets"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Document Analysis Worksheets from the National Archives
                    </a>
                  </li>
                  <li className={css.additionalToolWrapper}>
                    <a
                      className="link external"
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
      </div>
    );
  }
}

export default withRouter(TeachersGuide);
