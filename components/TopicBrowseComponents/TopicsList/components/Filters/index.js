import React from "react";
import Select from "react-select";

import "react-select/dist/react-select.css";

import css from "shared/FiltersBar/FiltersBar.scss";

const SortValue = props =>
  <span className={css.sortValue}>
    <span className={css.sortByText}>Sort by </span>
    <span>
      {props.value.label}
    </span>
  </span>;

const FiltersBar = () =>
  <div className={css.filtersWrapper}>
    <div className={`${css.filters} site-max-width`}>
      <div className="row">
        <div className={`${css.filter} col-xs-6 col-md-4`}>
          <input className={css.textInput} placeholder="Filter by title" />
        </div>
        <div className={`${css.filter} col-xs-6 col-md-3`}>
          <Select
            clearable={false}
            searchable={false}
            value="title"
            className={[css.select, css.sortSelect].join(" ")}
            valueComponent={SortValue}
            options={[{ value: "title", label: "Title" }]}
          />
        </div>
      </div>
    </div>
  </div>;

export default FiltersBar;
