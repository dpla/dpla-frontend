import React from "react";
import { Link } from "react-router-dom";

import styles from "./BreadcrumbsModule.css";
import { module } from "../../utils.css";
import chevron from "../../images/chevron-thick-orange.svg";
import question from "../../images/question.svg";

import Tooltip from "../Tooltip";

const isStudentMode = location =>
  /\/primary-source-sets\/.+\/.+/.exec(location.pathname) &&
  location.search.includes("student");

class BreadcrumbsModule extends React.Component {
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
    return (
      <div className={styles.wrapper}>
        <div className={[styles.breadcrumbsModule, module].join(" ")}>
          <div className={styles.breadcrumbs}>
            <Link className={styles.breadcrumbLink} to="/primary-source-sets">
              Primary Source Sets
            </Link>
            <img alt="" src={chevron} className={styles.chevron} />
            <div className={styles.activeBreadcrumb}>Race to the Moon</div>
          </div>
          {isStudentMode(routerProps.location) &&
            <button
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
                  You’re viewing this Primary Source Set with the teaching
                  guides hidden.
                </p>
                <Link
                  to={routerProps.location.pathname}
                  className={styles.tooltipLink}
                >
                  Turn on Teaching Guides
                </Link>
              </Tooltip>
            </button>}
        </div>
      </div>
    );
  }
}

export default BreadcrumbsModule;
