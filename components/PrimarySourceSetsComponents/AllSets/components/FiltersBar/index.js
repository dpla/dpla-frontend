import React from "react";
import Router from "next/router";
import { withRouter } from "next/router"


import {
  subjectOptions,
  timePeriodOptions,
} from "constants/primarySourceSets";


import css from "shared/FiltersBar/FiltersBar.module.scss";
import utils from "stylesheets/utils.module.scss"

class FiltersBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        timePeriodValue: this.props.router.query.timePeriod || "all-time-periods",
        subjectValue: this.props.router.query.subject || "all-subjects"
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.router.query.timePeriod !== prevProps.router.query.timePeriod ||
      this.props.router.query.subject !== prevProps.router.query.subject
    ) {
      this.setState({
        timePeriodValue: this.props.router.query.timePeriod || "all-time-periods",
        subjectValue: this.props.router.query.subject || "all-subjects"
      });
    }
  }

  onSubjectChange = async val => {
    await Router.push({
      pathname: "/primary-source-sets",
      query: Object.assign({}, this.props.router.query, {
        subject: val.target.value
      })
    });
  };

  onTimePeriodChange = async val => {
    await Router.push({
      pathname: "/primary-source-sets",
      query: Object.assign({}, this.props.router.query, {
        timePeriod: val.target.value
      })
    });
  };

  onClearFilters = async () => {
    await Router.push({
      pathname: "/primary-source-sets"
    });
  };

  render() {

    const timePeriod = this.props.router.query.timePeriod;
    const subject = this.props.router.query.subject;

    const needsClearButton =
        (timePeriod && timePeriod !== "all-time-periods") ||
        (subject && subject !== "all-subjects");

    return (
      <div className={css.filtersWrapper}>
        <div className={`${css.filters} ${utils.siteMaxWidth}`}>
          <div className={`${utils.row} ${css.filtersRow}`}>

            <div className={`${css.filter} ${utils.colXs12} ${utils.colMd3}`}>
              <label htmlFor="filter-subject">Subject</label>
              <select
                id="filter-subject"
                value={this.state.subjectValue}
                onChange={this.onSubjectChange}
              >
                {subjectOptions.map((item, index) =>
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                )}
              </select>
            </div>
            <div className={`${css.filter} ${utils.colXs12} ${utils.colMd3}`}>
              <label htmlFor="filter-period">Time Period</label>
              <select
                id="filter-period"
                value={this.state.timePeriodValue}
                onChange={this.onTimePeriodChange}
              >
                {timePeriodOptions.map((item, index) =>
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                )}
              </select>
            </div>
            {needsClearButton &&
                <div className={css.clearAll}>
                  <button onClick={this.onClearFilters}>
                    <svg
                        aria-hidden
                        className={css.clearAllIcon}
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path d="M-9-9h36v36H-9z" />
                        <path
                            className={css.clearAllIconPath}
                            d="M11.1869671 9.0007313l6.6321036-6.6336231c.241215-.2405136.241215-.6305716 0-.8710852L16.5043505.1805657C16.3886778.0648899 16.2320966 0 16.0684517 0c-.1636448 0-.3202116.0648899-.4358987.1805657L8.9997271 6.8134666 2.3669012.1805657c-.230634-.23134078-.6404416-.23134078-.8710756 0L.18038312 1.496023c-.24051083.2405136-.24051083.6305716 0 .8710852L6.8132094 9.0007313.18038312 15.6329099c-.24051083.2405136-.24051083.6305716 0 .8717894l1.31544248 1.314735C1.6107941 17.9351083 1.7680795 18 1.9317247 18c.1629298 0 .3202116-.0648917.4351946-.1805657l6.6328258-6.6329009 6.6328259 6.6329009c.1156727.115674.2722539.1805657.4358988.1805657.1636448 0 .3202116-.0648917.4358987-.1805657l1.3147202-1.314735c.2412151-.2412178.2412151-.6312758 0-.8717894l-6.6321216-6.6321786z"
                        />
                      </g>
                    </svg>
                    <span>Clear filters</span>
                  </button>
                </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FiltersBar);
