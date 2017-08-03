import React from "react";
import { Link } from "react-router-dom";

import styles from "./StudentMode.css";

import question from "../../../../../../../../../../images/question.svg";

import Tooltip from "../../../../../../../../components/Tooltip";

const isStudentMode = location => location.search.includes("student");

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
    const { routerProps } = this.props;

    return isStudentMode(routerProps.location)
      ? <button
          aria-describedby="student-mode-tooltip"
          className={styles.studentMode}
          onMouseOver={() => this.showTooltip()}
          onFocus={() => this.showTooltip()}
          onBlur={() => this.hideTooltip()}
          onMouseLeave={() => this.hideTooltip()}
          onClick={() => this.toggleTooltip()}
          tabIndex="0"
        >
          <h3 className={styles.studentModeText}>Student Mode</h3>
          <img src={question} alt="" className={styles.questionIcon} />
          <Tooltip
            id="student-mode-tooltip"
            isHidden={!this.state.showTooltip}
            className={styles.tooltip}
          >
            <p className={styles.tooltipText}>
              You’re viewing this Primary Source Set with the teaching guides
              hidden.
            </p>
            <Link
              to={routerProps.location.pathname}
              className={styles.tooltipLink}
            >
              Turn on Teaching Guides
            </Link>
          </Tooltip>
        </button>
      : null;
  }
}

export default StudentMode;
