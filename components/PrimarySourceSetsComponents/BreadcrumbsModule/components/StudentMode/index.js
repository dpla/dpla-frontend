import React from "react";
import { Link } from "react-router-dom";

import styles from "./StudentMode.css";
import Tooltip from "../../../../Tooltip";

const question = "static/images/question.svg";

const isStudentMode = () => false; //TODO fix this

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
    return isStudentMode()
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
            <Link>
              <a className={styles.tooltipLink}>Turn on Teaching Guides</a>
            </Link>
          </Tooltip>
        </button>
      : null;
  }
}

export default StudentMode;
