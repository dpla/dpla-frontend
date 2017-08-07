import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./StudentMode.css";
import Tooltip from "../../../../Tooltip";

const question = "/static/images/question.svg";

const removeStudentModeParam = query => {
  const dupedQuery = Object.assign({}, query);
  delete dupedQuery.studentMode;
  return dupedQuery;
}

class StudentMode extends React.Component {
  componentWillMount() {
    this.setState({ showTooltip: false });
  }

  showTooltip() {
    this.setState({ showTooltip: true });
  }

  hideTooltip() {
    this.setState({ showTooltip: false });
  }

  toggleTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip });
  }

  render() {
    return (
      <button
        aria-describedby="student-mode-tooltip"
        className={classNames.studentMode}
        onMouseOver={() => this.showTooltip()}
        onFocus={() => this.showTooltip()}
        onBlur={() => this.hideTooltip()}
        onMouseLeave={() => this.hideTooltip()}
        onClick={() => this.toggleTooltip()}
        tabIndex="0"
      >
        <h3 className={classNames.studentModeText}>Student Mode</h3>
        <img src={question} alt="" className={classNames.questionIcon} />
        <Tooltip
          id="student-mode-tooltip"
          isHidden={!this.state.showTooltip}
          className={classNames.tooltip}
        >
          <p className={classNames.tooltipText}>
            You’re viewing this Primary Source Set with the teaching guides
            hidden.
          </p>
          <Link
            href={{
              pathname: this.props.route.pathname,
              query: removeStudentModeParam(this.props.route.query)
            }}
          >
            <a className={classNames.tooltipLink}>Turn on Teaching Guides</a>
          </Link>
        </Tooltip>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </button>
    );
  }
}

export default StudentMode;
