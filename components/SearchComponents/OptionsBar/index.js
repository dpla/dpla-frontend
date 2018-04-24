import React from "react";
import Link from "next/link";
import Router from "next/router";

import {
  sortOptions,
  pageSizeOptions,
  mapSortOptionsToParams,
  getSortOptionFromParams
} from "./options";
import addCommasToNumber from "lib/addCommasToNumber";
import { DEFAULT_PAGE_SIZE } from "constants/search";

import utils from "stylesheets/utils.scss";
import css from "./OptionsBar.scss";

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
      query: Object.assign({}, this.props.route.query, {
        page_size: val.target.label,
        page: 1
      })
    });
  };

  onSortChange = val => {
    Router.push({
      pathname: "/search",
      query: Object.assign({}, this.props.route.query, {
        sort_by: mapSortOptionsToParams[val.target.value].sort_by,
        sort_order: mapSortOptionsToParams[val.target.value].sort_order,
        page: 1
      })
    });
  };

  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  render() {
    const {
      currentPage,
      onClickToggleFilters,
      showFilters,
      numberOfActiveFacets
    } = this.props;
    return (
      <div className={css.wrapper}>
        <div className={[utils.container, css.optionsBar].join(" ")}>
          <div className={css.resultsAndFilter}>
            <h1 className={css.resultsCount}>
              <span>
                {addCommasToNumber(this.props.itemCount)} results{" "}
              </span>
              {this.props.route.query.q &&
                <span className={css.resultsCountQuery}>
                  <span>for </span>
                  <span className={css.resultsCountQueryText}>
                    {this.props.route.query.q}
                  </span>
                </span>}
            </h1>
            <p className={css.pageNumber}>Page {currentPage}</p>
            <button
              onClick={() => onClickToggleFilters()}
              aria-expanded={showFilters}
              className={`${css.toggleFilters} ${showFilters
                ? css.showFilters
                : ""} ${numberOfActiveFacets !== 0
                ? css.withActiveFacets
                : ""}`}
            >
              <span>Filter</span>
              {numberOfActiveFacets !== 0 &&
                <span className={css.activeFacetCount}>
                  ({numberOfActiveFacets})
                </span>}
              <svg
                className={css.filtersButtonChevron}
                width="15px"
                height="24px"
                viewBox="0 0 15 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g
                    transform="translate(-183.000000, -205.000000)"
                    fill="#000000"
                  >
                    <path
                      d="M201.948629,212.831277 L190.307237,224.272727 L178.598137,212.760526 C178.389045,212.55631 178.272727,212.279942 178.272727,211.991326 C178.272727,211.701341 178.389042,211.42497 178.598137,211.220767 L179.791769,210.047207 L179.791769,210.045847 C179.999478,209.841631 180.280573,209.727273 180.575507,209.727273 C180.869066,209.727273 181.150168,209.841635 181.357863,210.045847 L190.307272,218.843371 L199.187556,210.116599 C199.619606,209.691814 200.321635,209.691814 200.753685,210.116599 L201.947318,211.290159 L201.948704,211.290159 C202.156413,211.494375 202.272727,211.772103 202.272727,212.060718 C202.272727,212.349333 202.156413,212.627075 201.948704,212.831277 L201.948629,212.831277 Z"
                      transform="translate(190.272727, 217.000000) rotate(-90.000000) translate(-190.272727, -217.000000) "
                    />
                  </g>
                </g>
              </svg>
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
                {sortOptions.map((item, index) =>
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                )}
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
                {pageSizeOptions.map((item, index) =>
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                )}
              </select>
            </div>
            {/* <div>
              <h3 className={css.optionHeader}>
                Layout
              </h3>
              <div className={css.viewButtons}>
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
                      css.listViewButton,
                      this.props.route.query.list_view === "grid"
                        ? css.viewButtonInactive
                        : css.viewButtonActive
                    ].join(" ")}
                  >
                    <img
                      className={css.viewButtonIcon}
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
                      css.gridViewButton,
                      this.props.route.query.list_view === "grid"
                        ? css.viewButtonActive
                        : css.viewButtonInactive
                    ].join(" ")}
                  >
                    <img
                      className={css.viewButtonIcon}
                      src={gridViewIcon}
                      alt="Grid View"
                    />
                  </a>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default OptionsBar;
