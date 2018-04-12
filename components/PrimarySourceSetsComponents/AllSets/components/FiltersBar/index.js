import React from "react";
import Select from "react-select";
import Router from "next/router";

import "react-select/dist/react-select.css";

import {
  sortOptions,
  mapTimePeriodNameToSlug,
  mapSubjectNameToSlug
} from "constants/primarySourceSets";

import css from "shared/FiltersBar/FiltersBar.scss";

const SortValue = props =>
  <span className={css.sortValue}>
    <span className={css.sortByText}>Sort by</span>
    <span>
      {props.value.label}
    </span>
  </span>;

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
      query: Object.assign({}, this.props.route.query, { order: val.value })
    });
  };

  onSubjectChange = val => {
    Router.push({
      pathname: "/primary-source-sets",
      query: Object.assign({}, this.props.route.query, { subject: val.value })
    });
  };

  onTimePeriodChange = val => {
    Router.push({
      pathname: "/primary-source-sets",
      query: Object.assign({}, this.props.route.query, {
        timePeriod: val.value
      })
    });
  };

  render() {
    return (
      <div className={css.filtersWrapper}>
        <div className={`${css.filters} site-max-width`}>
          <div className="row">
            <div className={`${css.filter} col-xs-12 col-md-3`}>
              <Select
                clearable={false}
                searchable={false}
                value={this.state.subjectValue}
                onChange={this.onSubjectChange}
                className={css.select}
                options={[
                  { value: "all-subjects", label: "All Subjects" }
                ].concat(
                  this.props.subjects.map(subject => ({
                    label: subject.name,
                    value: mapSubjectNameToSlug(subject.name)
                  }))
                )}
              />
            </div>
            <div className={`${css.filter} col-xs-12 col-md-3`}>
              <Select
                clearable={false}
                searchable={false}
                value={this.state.timePeriodValue}
                className={css.select}
                onChange={this.onTimePeriodChange}
                options={[
                  { value: "all-time-periods", label: "All Time Periods" }
                ].concat(
                  this.props.timePeriods.map(period => ({
                    label: period.name,
                    value: mapTimePeriodNameToSlug(period.name)
                  }))
                )}
              />
            </div>
            <div className={`${css.filter} col-xs-12 col-md-4`}>
              <Select
                clearable={false}
                searchable={false}
                value={this.state.sortValue}
                className={[css.select, css.sortSelect].join(" ")}
                onChange={this.onSortChange}
                valueComponent={SortValue}
                options={sortOptions}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FiltersBar;
