import React from "react";
import Router from "next/router";
import { withRouter } from "next/router"


import {
  sortOptions,
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";
import { removeQueryParams } from "lib";

import css from "shared/FiltersBar/FiltersBar.module.scss";

class FiltersBar extends React.Component {
  componentWillMount() {
    this.setState({
      sortValue: this.props.router.query.order || "recently_added",
      timePeriodValue: this.props.router.query.timePeriod || "all-time-periods",
      subjectValue: this.props.router.query.subject || "all-subjects"
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.router.query.order !== this.state.order ||
      nextProps.router.query.timePeriod !== this.state.timePeriod ||
      nextProps.router.query.subject !== this.state.subject
    ) {
      this.setState({
        sortValue: nextProps.router.query.order || "recently_added",
        timePeriodValue: nextProps.router.query.timePeriod || "all-time-periods",
        subjectValue: nextProps.router.query.subject || "all-subjects"
      });
    }
  }

  onSortChange = val => {
    Router.push({
      pathname: "/primary-source-sets",
      query: Object.assign({}, this.props.route.query, {
        order: val.target.value
      })
    });
  };

  onSubjectChange = val => {
    Router.push({
      pathname: "/primary-source-sets",
      query: Object.assign({}, this.props.router.query, {
        subject: val.target.value
      })
    });
  };

  onTimePeriodChange = val => {
    Router.push({
      pathname: "/primary-source-sets",
      query: Object.assign({}, this.props.route.query, {
        timePeriod: val.target.value
      })
    });
  };

  onClearFilters = e => {
    Router.push({
      pathname: "/primary-source-sets",
      query: Object.assign(
        {},
        removeQueryParams(this.props.router.query, ["subject", "timePeriod"])
      )
    });
    this.setState({
      timePeriodValue: "all-time-periods",
      subjectValue: "all-subjects"
    });
  };

  render() {
    const subjectOptions = [
      { value: "all-subjects", label: "All Subjects" }
    ].concat(
      this.props.subjects.map(subject => ({
        label: subject.name,
        value: mapSubjectNameToSlug(subject.name)
      }))
    );
    const timePeriodOptions = [
      { value: "all-time-periods", label: "All Time Periods" }
    ].concat(
      this.props.timePeriods.map(period => ({
        label: period.name,
        value: mapTimePeriodNameToSlug(period.name)
      }))
    );
    return (
      <div className={css.filtersWrapper}>
        <div className={`${css.filters} site-max-width`}>
          <div className={`row ${css.filtersRow}`}>
            {(this.state.timePeriodValue !== "all-time-periods" ||
              this.state.subjectValue !== "all-subjects") &&
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
            <div className={`${css.filter} col-xs-12 col-md-3`}>
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
            <div className={`${css.filter} col-xs-12 col-md-3`}>
              <label htmlFor="filter-period">Time Period</label>
              <select
                id="filter-period"
                value={this.state.timePeriodValue}
                onChange={this.onTimePeriodChange}
              >
                {timePeriodOptions.map((item, index) =>
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                )}
              </select>
            </div>
            <div className={`${css.filter} col-xs-12 col-md-4`}>
              <label htmlFor="filter-sort">Sort by</label>
              <select
                id="filter-sort"
                value={this.state.sortValue}
                onChange={this.onSortChange}
              >
                {sortOptions.map((item, index) =>
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                )}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FiltersBar);
