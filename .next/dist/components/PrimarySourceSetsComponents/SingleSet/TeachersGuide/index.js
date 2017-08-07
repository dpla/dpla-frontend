"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _TeachersGuide = require("./TeachersGuide.css");

var _utils = require("../../../../css/utils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/frankiesimms/Desktop/dpla-enduser-site/components/PrimarySourceSetsComponents/SingleSet/TeachersGuide/index.js";

var _module = _utils.classNames.module;

var printer = "/static/images/printer.svg";
var link = "/static/images/link.svg";
var googleClassroom = "/static/images/google-classroom.svg";

var mockContent = {
  discussionQuestions: ["Analyze the activities for women during wartime portrayed in Winslow Homer’s engraving. Describe the roles women play here. Who is shown playing these roles? Compare the women in the image to the real women in this set, such as Clara Barton, Susie King Taylor, and Nancy Kile Green. Now compare ideas about women’s roles during the Civil War to ideas about women in war during the twenty-first century.", "Read Josephine Crump’s “Two Brave Women” and the excerpt from Alcott’s Hospital Sketches. Describe the hardships and sacrifices they portray. Discuss the similarities and differences between these eyewitness accounts. Evaluate the impact of the author’s loyalties, Confederate (Crump) and Union (Alcott).", "Use Josiah Benton’s speech to identify the obstacles that hindered women’s involvement in the war effort. How does the speech support Clara Barton’s statement that the war helped advance women’s status?", "Use the sources on Susie King Taylor, the “Contraband of War” illustration, and Harriet Tubman’s affidavit to describe some of the roles black women played during the Civil War. Compare these to the portrayal of a black female character in a film set around the time of the Civil War and Reconstruction."],
  classroomActivities: ["Divide students into groups. One group will compare the two images of vivandières: the engraving of Kady Brownell and the postcard. The other will compare the drawing of Loreta Velasquez with the illustration of Belle Boyd. How do these images contrast the ideal with the actual?", "Collectively research Harriet Tubman’s role in the Combahee River raid in 1863. Ask students to use this information to develop arguments supporting or denying Tubman’s claim to a military pension."]
};

var TeachersGuide = function TeachersGuide(props) {
  return _react2.default.createElement("div", { className: _TeachersGuide.classNames.wrapper, __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, _react2.default.createElement("div", { className: [_TeachersGuide.classNames.teachingGuide, _module].join(" "), __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, _react2.default.createElement("div", { className: _TeachersGuide.classNames.content, __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, _react2.default.createElement("h2", { className: _TeachersGuide.classNames.contentHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, "Discussion questions"), _react2.default.createElement("ol", { className: _TeachersGuide.classNames.questions, __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, mockContent.discussionQuestions.map(function (question) {
    return _react2.default.createElement("li", { className: _TeachersGuide.classNames.question, __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    }, question);
  })), _react2.default.createElement("h2", { className: _TeachersGuide.classNames.contentHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  }, "Classroom activities"), _react2.default.createElement("ol", { className: _TeachersGuide.classNames.questions, __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    }
  }, mockContent.classroomActivities.map(function (activity) {
    return _react2.default.createElement("li", { className: _TeachersGuide.classNames.question, __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      }
    }, activity);
  })), _react2.default.createElement("div", { className: _TeachersGuide.classNames.aboutThis, __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    }
  }, _react2.default.createElement("h3", { className: _TeachersGuide.classNames.aboutThisHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    }
  }, "About This Guide"), _react2.default.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    }
  }, "This teaching guide helps instructors use a specific primary source set,", " ", _react2.default.createElement(_link2.default, { className: _TeachersGuide.classNames.aboutThisLink, to: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    }
  }, "Women in the Civil War"), ", in the classroom. It offers discussion questions, classroom activities, and primary source analysis tools. It is intended to spark pedagogical creativity by giving a sample approach to the material. Please feel free to share, reuse, and adapt the resources in this guide for your teaching purposes."))), _react2.default.createElement("div", { className: _TeachersGuide.classNames.sidebar, __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    }
  }, _react2.default.createElement("div", {
    className: [_TeachersGuide.classNames.teacherTools, _TeachersGuide.classNames.sidebarSection].join(" "),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    }
  }, _react2.default.createElement("h3", { className: _TeachersGuide.classNames.sidebarHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    }
  }, "Teacher Tools"), _react2.default.createElement("div", { className: _TeachersGuide.classNames.toolLinkAndIcon, __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    }
  }, _react2.default.createElement("img", { src: googleClassroom, alt: "", className: _TeachersGuide.classNames.toolIcon, __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    }
  }), _react2.default.createElement(_link2.default, { to: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    }
  }, _react2.default.createElement("a", { className: _TeachersGuide.classNames.toolLink, __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    }
  }, "Share to Google Classroom"))), _react2.default.createElement("div", { className: _TeachersGuide.classNames.toolLinkAndIcon, __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    }
  }, _react2.default.createElement("img", { src: printer, alt: "", className: _TeachersGuide.classNames.toolIcon, __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    }
  }), _react2.default.createElement(_link2.default, { to: "", __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    }
  }, _react2.default.createElement("a", { className: _TeachersGuide.classNames.toolLink, __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    }
  }, "Print this Guide"))), _react2.default.createElement("div", { className: _TeachersGuide.classNames.toolLinkAndIcon, __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    }
  }, _react2.default.createElement("img", { src: link, alt: "", className: _TeachersGuide.classNames.toolIcon, __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    }
  }), _react2.default.createElement(_link2.default, {
    href: {
      pathname: "/primary-source-sets/set",
      query: (0, _assign2.default)(props.route.query, { studentMode: true })
    },
    as: "/primary-source-sets/" + props.route.query.set + "?studentMode=true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    }
  }, _react2.default.createElement("a", { className: _TeachersGuide.classNames.toolLink, __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    }
  }, "Link to Student View"))), _react2.default.createElement("p", { className: _TeachersGuide.classNames.studentViewNote, __source: {
      fileName: _jsxFileName,
      lineNumber: 92
    }
  }, _react2.default.createElement("span", { className: _TeachersGuide.classNames.semibold, __source: {
      fileName: _jsxFileName,
      lineNumber: 93
    }
  }, "Student View"), " is a link to this Primary Source Set with the Teaching Guide hidden.")), _react2.default.createElement("div", { className: _TeachersGuide.classNames.sidebarSection, __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    }
  }, _react2.default.createElement("h3", { className: _TeachersGuide.classNames.sidebarHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    }
  }, "Primary source analysis"), _react2.default.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99
    }
  }, "For each source, ask students to indicate:"), _react2.default.createElement("ul", { className: _TeachersGuide.classNames.ul, __source: {
      fileName: _jsxFileName,
      lineNumber: 100
    }
  }, _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101
    }
  }, "the author's point of view"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102
    }
  }, "the author's purpose"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103
    }
  }, "historical context"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104
    }
  }, "audience")), _react2.default.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106
    }
  }, "For inquiry-based learning, ask students to:"), _react2.default.createElement("ul", { className: _TeachersGuide.classNames.ul, __source: {
      fileName: _jsxFileName,
      lineNumber: 107
    }
  }, _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108
    }
  }, "explain how a source tells its story and/or makes its argument"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111
    }
  }, "explain the relationships between sources"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112
    }
  }, "compare and contrast sources in terms of point of view and method"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115
    }
  }, "support conclusions and interpretations with evidence"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116
    }
  }, "identify questions for further investigation"))), _react2.default.createElement("div", { className: _TeachersGuide.classNames.sidebarSection, __source: {
      fileName: _jsxFileName,
      lineNumber: 119
    }
  }, _react2.default.createElement("h3", { className: _TeachersGuide.classNames.sidebarHeader, __source: {
      fileName: _jsxFileName,
      lineNumber: 120
    }
  }, "Additional tools"), _react2.default.createElement("ul", { className: _TeachersGuide.classNames.ul, __source: {
      fileName: _jsxFileName,
      lineNumber: 121
    }
  }, _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122
    }
  }, "Document Analysis Worksheets from the National Archives"), _react2.default.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123
    }
  }, "Using Primary Sources from the Library of Congress"))))), _react2.default.createElement("style", { dangerouslySetInnerHTML: { __html: _TeachersGuide.stylesheet }, __source: {
      fileName: _jsxFileName,
      lineNumber: 128
    }
  }));
};

exports.default = TeachersGuide;