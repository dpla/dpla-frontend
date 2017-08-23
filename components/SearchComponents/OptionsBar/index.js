import React from "react";
import { classNames, stylesheet } from "./OptionsBar.css";
import Select from "react-select";
import Router from "next/router";

import { sortOptions, subjectOptions } from "./options";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const gridViewIcon = "/static/images/grid-view-icon.svg";
const listViewIcon = "/static/images/list-view-icon.svg";

const view = "list";

class OptionsBar extends React.Component {
  componentWillMount() {
    this.setState({
      sortValue: this.props.route.query.order || "recently_added",
      timePeriodValue: this.props.route.query.timePeriod || "all-time-periods",
      subjectValue: this.props.route.query.subject || "all"
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
        subjectValue: nextProps.route.query.subject || "all"
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
      <div className={classNames.wrapper}>
        <div className={[module, classNames.optionsBar].join(" ")}>
          <p className={classNames.resultsCount}>
            <span>106,703 results for </span>
            <span className={classNames.resultsCountQuery}>new york</span>
          </p>
          <div className={classNames.options}>
            <div className={classNames.optionWrapper}>
              <h3 className={classNames.optionHeader}>
                Items per page
              </h3>
              <Select
                clearable={false}
                searchable={false}
                value={this.state.subjectValue}
                onChange={this.onSubjectChange}
                className={[classNames.select, classNames.itemsPerPage].join(
                  " "
                )}
                options={subjectOptions}
              />
            </div>
            <div className={classNames.optionWrapper}>
              <h3 className={classNames.optionHeader}>
                Sort by
              </h3>
              <Select
                clearable={false}
                searchable={false}
                value={this.state.sortValue}
                className={[classNames.select, classNames.sortBy].join(" ")}
                onChange={this.onSortChange}
                options={sortOptions}
              />
            </div>
            <div>
              <h3 className={classNames.optionHeader}>
                Layout
              </h3>
              <div className={classNames.viewButtons}>
                <button
                  className={[
                    classNames.listViewButton,
                    view === "list"
                      ? classNames.viewButtonActive
                      : classNames.viewButtonInactive
                  ].join(" ")}
                  onClick={() => {
                    if (view !== "list") {
                      this.updateView("list");
                    }
                  }}
                >
                  <img
                    className={classNames.viewButtonIcon}
                    src={listViewIcon}
                    alt="List View"
                  />
                </button>
                <button
                  className={[
                    classNames.gridViewButton,
                    view === "grid"
                      ? classNames.viewButtonActive
                      : classNames.viewButtonInactive
                  ].join(" ")}
                  onClick={() => {
                    if (view !== "grid") {
                      this.updateView("grid");
                    }
                  }}
                >
                  <img
                    className={classNames.viewButtonIcon}
                    src={gridViewIcon}
                    alt="Grid View"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default OptionsBar;
