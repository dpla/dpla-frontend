import React from "react";
import Select from "react-select";
import Router from "next/router";

import "react-select/dist/react-select.css";
import { stylesheet, classNames } from "./Filters.css";
import { classNames as utilClassNames } from "css/utils.css";
import { sortOptions, timePeriodOptions, subjectOptions } from "./options";

const { module } = utilClassNames;

const SortValue = props =>
  <span className={classNames.sortValue}>
    <span className={classNames.sortByText}>Sort by </span>
    <span>
      {props.value.label}
    </span>
  </span>;

class Filters extends React.Component {
  componentWillMount() {
    this.setState({
      sortValue: this.props.route.query.order || "recently_added",
      timePeriodValue: this.props.route.query.timePeriod || "all-time-periods",
      subjectValue: this.props.route.query.subject || "all"
    });
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
        <div className={[module, classNames.filters].join(" ")}>
          <input
            className={classNames.textInput}
            placeholder="Filter by title"
          />
          <Select
            clearable={false}
            searchable={false}
            value={this.state.timePeriodValue}
            className={classNames.select}
            onChange={this.onTimePeriodChange}
            options={timePeriodOptions}
          />
          <Select
            clearable={false}
            searchable={false}
            value={this.state.subjectValue}
            onChange={this.onSubjectChange}
            className={classNames.select}
            options={subjectOptions}
          />
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
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default Filters;
