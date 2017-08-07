import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./TeachersGuide.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const printer = "/static/images/printer.svg";
const link = "/static/images/link.svg";
const googleClassroom = "/static/images/google-classroom.svg";

const mockContent = {
  discussionQuestions: [
    "Analyze the activities for women during wartime portrayed in Winslow Homer’s engraving. Describe the roles women play here. Who is shown playing these roles? Compare the women in the image to the real women in this set, such as Clara Barton, Susie King Taylor, and Nancy Kile Green. Now compare ideas about women’s roles during the Civil War to ideas about women in war during the twenty-first century.",
    "Read Josephine Crump’s “Two Brave Women” and the excerpt from Alcott’s Hospital Sketches. Describe the hardships and sacrifices they portray. Discuss the similarities and differences between these eyewitness accounts. Evaluate the impact of the author’s loyalties, Confederate (Crump) and Union (Alcott).",
    "Use Josiah Benton’s speech to identify the obstacles that hindered women’s involvement in the war effort. How does the speech support Clara Barton’s statement that the war helped advance women’s status?",
    "Use the sources on Susie King Taylor, the “Contraband of War” illustration, and Harriet Tubman’s affidavit to describe some of the roles black women played during the Civil War. Compare these to the portrayal of a black female character in a film set around the time of the Civil War and Reconstruction."
  ],
  classroomActivities: [
    "Divide students into groups. One group will compare the two images of vivandières: the engraving of Kady Brownell and the postcard. The other will compare the drawing of Loreta Velasquez with the illustration of Belle Boyd. How do these images contrast the ideal with the actual?",
    "Collectively research Harriet Tubman’s role in the Combahee River raid in 1863. Ask students to use this information to develop arguments supporting or denying Tubman’s claim to a military pension."
  ]
};

const TeachersGuide = props =>
  <div className={classNames.wrapper}>
    <div className={[classNames.teachingGuide, module].join(" ")}>
      <div className={classNames.content}>
        <h2 className={classNames.contentHeader}>Discussion questions</h2>
        <ol className={classNames.questions}>
          {mockContent.discussionQuestions.map(question =>
            <li className={classNames.question}>
              {question}
            </li>
          )}
        </ol>
        <h2 className={classNames.contentHeader}>Classroom activities</h2>
        <ol className={classNames.questions}>
          {mockContent.classroomActivities.map(activity =>
            <li className={classNames.question}>
              {activity}
            </li>
          )}
        </ol>
        <div className={classNames.aboutThis}>
          <h3 className={classNames.aboutThisHeader}>About This Guide</h3>
          <p>
            This teaching guide helps instructors use a specific primary source
            set,{" "}
            <Link className={classNames.aboutThisLink} to="">
              Women in the Civil War
            </Link>, in the classroom. It offers discussion questions, classroom
            activities, and primary source analysis tools. It is intended to
            spark pedagogical creativity by giving a sample approach to the
            material. Please feel free to share, reuse, and adapt the resources
            in this guide for your teaching purposes.
          </p>
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
            <Link to="">
              <a className={classNames.toolLink}>Share to Google Classroom</a>
            </Link>
          </div>
          <div className={classNames.toolLinkAndIcon}>
            <img src={printer} alt="" className={classNames.toolIcon} />
            <Link to="">
              <a className={classNames.toolLink}>Print this Guide</a>
            </Link>
          </div>
          <div className={classNames.toolLinkAndIcon}>
            <img src={link} alt="" className={classNames.toolIcon} />
            <Link
              href={{
                pathname: `/primary-source-sets/set`,
                query: Object.assign(props.route.query, { studentMode: true })
              }}
              as={`/primary-source-sets/${props.route.query
                .set}?studentMode=true`}
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
