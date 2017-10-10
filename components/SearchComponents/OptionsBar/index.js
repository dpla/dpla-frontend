import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./OptionsBar.css";
import Select from "react-select";
import Router from "next/router";

import {
  sortOptions,
  pageSizeOptions,
  mapSortOptionsToParams,
  getSortOptionFromParams
} from "./options";
import addCommasToNumber from "utilFunctions/addCommasToNumber";
import { DEFAULT_PAGE_SIZE } from "constants/search";
import { classNames as utilClassNames } from "css/utils.css";
const { container } = utilClassNames;

const gridViewIcon = "/static/images/grid-view-icon.svg";
const listViewIcon = "/static/images/list-view-icon.svg";

class OptionsBar extends React.Component {
  componentWillMount() {
    const { sort_by, sort_order, page_size } = this.props.route.query;
    this.setState({
      sortValue: getSortOptionFromParams({
        sortBy: sort_by || "",
        sortOrder: sort_order || ""
      }),
      pageSizeValue: page_size || DEFAULT_PAGE_SIZE
    });
  }

  componentWillReceiveProps(nextProps) {
    const { sort_by, sort_order, page_size } = this.props.route.query;
    const {
      sort_by: next_sort_by,
      sort_order: next_sort_order,
      page_size: next_page_size
    } = nextProps.route.query;
    if (
      next_sort_by !== sort_by ||
      next_sort_order !== sort_order ||
      next_page_size !== page_size
    ) {
      this.setState({
        sortValue: getSortOptionFromParams({
          sortBy: next_sort_by || "",
          sortOrder: next_sort_order || ""
        }),
        pageSizeValue: next_page_size || "10"
      });
    }
  }

  onPageSizeChange = val => {
    Router.push({
      pathname: "/search",
      query: Object.assign({}, this.props.route.query, { page_size: val.label })
    });
  };

  onSortChange = val => {
    Router.push({
      pathname: "/search",
      query: Object.assign({}, this.props.route.query, {
        sort_by: mapSortOptionsToParams[val.value].sort_by,
        sort_order: mapSortOptionsToParams[val.value].sort_order
      })
    });
  };

  render() {
    return (
      <div className={classNames.wrapper}>
        <div className={[container, classNames.optionsBar].join(" ")}>
          <p className={classNames.resultsCount}>
            <span>{addCommasToNumber(this.props.itemCount)} results </span>
            {this.props.route.query.q &&
              <span className={classNames.resultsCountQuery}>
                <span>for </span>
                <span className={classNames.resultsCountQueryText}>
                  {this.props.route.query.q}
                </span>
              </span>}
          </p>
          <div className={classNames.options}>
            <div className={classNames.optionWrapper}>
              <h3 className={classNames.optionHeader}>
                Items per page
              </h3>
              <Select
                clearable={false}
                instanceId="options-bar-page-size"
                searchable={false}
                value={this.state.pageSizeValue}
                onChange={this.onPageSizeChange}
                className={[classNames.select, classNames.itemsPerPage].join(
                  " "
                )}
                options={pageSizeOptions}
              />
            </div>
            <div className={classNames.optionWrapper}>
              <h3 className={classNames.optionHeader}>
                Sort by
              </h3>
              <Select
                clearable={false}
                searchable={false}
                instanceId="options-bar-sort-by"
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
                <Link
                  prefetch
                  href={{
                    pathname: this.props.route.pathname,
                    query: Object.assign({}, this.props.route.query, {
                      list_view: "list"
                    })
                  }}
                >
                  <a
                    className={[
                      classNames.listViewButton,
                      this.props.route.query.list_view === "grid"
                        ? classNames.viewButtonInactive
                        : classNames.viewButtonActive
                    ].join(" ")}
                  >
                    <img
                      className={classNames.viewButtonIcon}
                      src={listViewIcon}
                      alt="List View"
                    />
                  </a>
                </Link>
                <Link
                  prefetch
                  href={{
                    pathname: this.props.route.pathname,
                    query: Object.assign({}, this.props.route.query, {
                      list_view: "grid"
                    })
                  }}
                >
                  <a
                    className={[
                      classNames.gridViewButton,
                      this.props.route.query.list_view === "grid"
                        ? classNames.viewButtonActive
                        : classNames.viewButtonInactive
                    ].join(" ")}
                  >
                    <img
                      className={classNames.viewButtonIcon}
                      src={gridViewIcon}
                      alt="Grid View"
                    />
                  </a>
                </Link>
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
