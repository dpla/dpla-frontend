import React from "react";
import Select from "react-select";
import Router from "next/router";

import "react-select/dist/react-select.css";
import { stylesheet, classNames } from "./Filters.css";
import { sortOptions, timePeriodOptions, subjectOptions } from "./options";

const SortValue = props =>
  <span className={classNames.sortValue}>
    <span className={classNames.sortByText}>Sort</span>
    <span>
      {props.value.label}
    </span>
  </span>;

class Filters extends React.Component {
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
      <div className={classNames.filtersWrapper}>
        <div className={`${classNames.filters} site-max-width`}>
          <div className="row">
            <div className={`${classNames.filter} col-xs-6 col-md-4`}>
              <input
                className={classNames.textInput}
                placeholder="Filter by title"
              />
            </div>
            <div className={`${classNames.filter} col-xs-6 col-md-3`}>
              <Select
                clearable={false}
                searchable={false}
                value={this.state.timePeriodValue}
                className={classNames.select}
                onChange={this.onTimePeriodChange}
                options={timePeriodOptions}
              />
            </div>
            <div className={`${classNames.filter} col-xs-6 col-md-2`}>
              <Select
                clearable={false}
                searchable={false}
                value={this.state.subjectValue}
                onChange={this.onSubjectChange}
                className={classNames.select}
                options={subjectOptions}
              />
            </div>
            <div className={`${classNames.filter} col-xs-6 col-md-3`}>
              <Select
                clearable={false}
                searchable={false}
                value={this.state.sortValue}
                className={[classNames.select, classNames.sortSelect].join(" ")}
                onChange={this.onSortChange}
                valueComponent={SortValue}
                options={sortOptions}
              />
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default Filters;
