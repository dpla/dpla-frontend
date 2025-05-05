import React from "react";
import Link from "next/link";
import Router, { withRouter } from "next/router";

import { addCommasToNumber } from "lib";
import {
  sortOptions,
  pageSizeOptions,
  mapSortOptionsToParams,
  getSortOptionFromParams,
  DEFAULT_PAGE_SIZE,
} from "constants/search";

import css from "./OptionsBar.module.scss";
import utils from "stylesheets/utils.module.scss";

import GridViewIcon from "components/svg/GridViewIcon";
import ListViewIcon from "components/svg/ListViewIcon";
import FilterButton from "components/svg/FilterButton";

class OptionsBar extends React.Component {
  constructor(props) {
    super(props);
    const { sort_by, sort_order, page_size } = props.router.query;
    this.state = {
      sortValue: getSortOptionFromParams({
        sortBy: sort_by || "",
        sortOrder: sort_order || "",
      }),
      pageSizeValue: page_size || DEFAULT_PAGE_SIZE,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { sort_by, sort_order, page_size } = prevProps.router.query;
    const {
      sort_by: next_sort_by,
      sort_order: next_sort_order,
      page_size: next_page_size,
    } = this.props.router.query;
    if (
      next_sort_by !== sort_by ||
      next_sort_order !== sort_order ||
      next_page_size !== page_size
    ) {
      this.setState({
        sortValue: getSortOptionFromParams({
          sortBy: next_sort_by || "",
          sortOrder: next_sort_order || "",
        }),
        pageSizeValue: next_page_size || "10",
      });
    }
  }

  onPageSizeChange = async (val) => {
    await Router.push({
      pathname: "/search",
      query: {
        ...this.props.router.query,
        page_size: val.target.value,
        page: 1,
      },
    });
  };

  onSortChange = async (val) => {
    await Router.push({
      pathname: "/search",
      query: {
        ...this.props.router.query,
        sort_by: mapSortOptionsToParams[val.target.value].sort_by,
        sort_order: mapSortOptionsToParams[val.target.value].sort_order,
        page: 1,
      },
    });
  };

  render() {
    const {
      router,
      currentPage,
      onClickToggleFilters,
      showFilters,
      numberOfActiveFacets,
    } = this.props;
    return (
      <div className={css.wrapper}>
        <div className={`${utils.container} ${css.optionsBar}`}>
          <div className={css.resultsAndFilter}>
            <h1 className={css.resultsCount}>
              <span>{addCommasToNumber(this.props.itemCount)} results </span>
              {router.query.q && (
                <span className={css.resultsCountQuery}>
                  <span>for </span>
                  <span className={css.resultsCountQueryText}>
                    {router.query.q}
                  </span>
                </span>
              )}
            </h1>
            <p className={css.pageNumber}>Page {currentPage}</p>
            <button
              onClick={() => onClickToggleFilters()}
              aria-expanded={showFilters}
              className={[
                css.toggleFilters,
                showFilters ? css.showFilters : "",
                numberOfActiveFacets !== 0 ? css.withActiveFacets : "",
              ].join(" ")}
            >
              <span>Filter</span>
              {numberOfActiveFacets !== 0 && (
                <span className={css.activeFacetCount}>
                  ({numberOfActiveFacets})
                </span>
              )}
              <FilterButton className={css.filtersButtonChevron} />
            </button>
          </div>
          <div className={css.options}>
            <div className={css.optionWrapper}>
              <label htmlFor="options-bar-sort-by" className={css.optionHeader}>
                Sort by
              </label>
              <select
                id="options-bar-sort-by"
                value={this.state.sortValue}
                onChange={this.onSortChange}
              >
                {sortOptions.map((item) => (
                  <option value={item.value} key={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={css.optionWrapper}>
              <label
                htmlFor="options-bar-page-size"
                className={css.optionHeader}
              >
                Items per page
              </label>
              <select
                id="options-bar-page-size"
                value={this.state.pageSizeValue}
                onChange={this.onPageSizeChange}
              >
                {pageSizeOptions.map((item, index) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={css.optionWrapper}>
              <span className={css.optionHeader}>Layout</span>
              <div className={css.viewButtons}>
                <Link
                  href={{
                    pathname: router.pathname,
                    query: { ...router.query, list_view: "list" },
                  }}
                  className={[
                    css.listViewButton,
                    router.query.list_view === "grid"
                      ? css.viewButtonInactive
                      : css.viewButtonActive,
                  ].join(" ")}
                >
                  <ListViewIcon className={css.viewButtonIcon} />
                </Link>
                <Link
                  href={{
                    pathname: router.pathname,
                    query: { ...router.query, list_view: "grid" },
                  }}
                  className={[
                    css.gridViewButton,
                    router.query.list_view === "grid"
                      ? css.viewButtonActive
                      : css.viewButtonInactive,
                  ].join(" ")}
                >
                  <GridViewIcon className={css.viewButtonIcon} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OptionsBar);
