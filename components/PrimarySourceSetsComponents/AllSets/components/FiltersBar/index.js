import React from "react";
import Router from "next/router";

import Button from "shared/Button";

import {
  sortOptions,
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";

import css from "shared/FiltersBar/FiltersBar.scss";

class FiltersBar extends React.Component {
  componentWillMount() {
    this.setState({
      sortValue: this.props.route.query.order || "recently_added",
      timePeriodValue: this.props.route.query.timePeriod || "all-time-periods",
      subjectValue: this.props.route.query.subject || "all-subjects"
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.route.query.order !== this.state.order ||
      nextProps.route.query.timePeriod !== this.state.timePeriod ||
      nextProps.route.query.subject !== this.state.subject
    ) {
      this.setState({
        sortValue: nextProps.route.query.order || "recently_added",
        timePeriodValue: nextProps.route.query.timePeriod || "all-time-periods",
        subjectValue: nextProps.route.query.subject || "all-subjects"
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
      query: Object.assign({}, this.props.route.query, {
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
      query: Object.assign({}, this.props.route.query, {
        subject: "all-subjects",
        timePeriod: "all-time-periods"
      })
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
          <div className="row">
            {(this.state.timePeriodValue !== "all-time-periods" ||
              this.state.subjectValue !== "all-subjects") &&
              <Button
                type={"secondary"}
                className={css.clearButton}
                onClick={this.onClearFilters}
              >
                Clear filters
              </Button>}
            <div className={`${css.filter} col-xs-12 col-md-3`}>
              <select
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
              <select
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
              <select value={this.state.sortValue} onChange={this.onSortChange}>
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

export default FiltersBar;
