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
          <p className={classNames.pageNumber}>Page {currentPage}</p>
          <button
            onClick={() => onClickToggleFilters()}
            className={`${classNames.toggleFilters} ${showFilters
              ? classNames.showFilters
              : ""} ${numberOfActiveFacets !== 0
              ? classNames.withActiveFacets
              : ""}`}
          >
            <span>Filter</span>
            {numberOfActiveFacets !== 0 &&
              <span className={classNames.activeFacetCount}>
                ({numberOfActiveFacets})
              </span>}
            <svg
              className={classNames.filtersButtonChevron}
              width="15px"
              height="24px"
              viewBox="0 0 15 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Styles"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Artboard"
                  transform="translate(-183.000000, -205.000000)"
                  fill="#000000"
                >
                  <path
                    d="M201.948629,212.831277 L190.307237,224.272727 L178.598137,212.760526 C178.389045,212.55631 178.272727,212.279942 178.272727,211.991326 C178.272727,211.701341 178.389042,211.42497 178.598137,211.220767 L179.791769,210.047207 L179.791769,210.045847 C179.999478,209.841631 180.280573,209.727273 180.575507,209.727273 C180.869066,209.727273 181.150168,209.841635 181.357863,210.045847 L190.307272,218.843371 L199.187556,210.116599 C199.619606,209.691814 200.321635,209.691814 200.753685,210.116599 L201.947318,211.290159 L201.948704,211.290159 C202.156413,211.494375 202.272727,211.772103 202.272727,212.060718 C202.272727,212.349333 202.156413,212.627075 201.948704,212.831277 L201.948629,212.831277 Z"
                    id="Chevron-Thick"
                    transform="translate(190.272727, 217.000000) rotate(-90.000000) translate(-190.272727, -217.000000) "
                  />
                </g>
              </g>
            </svg>
          </button>
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
