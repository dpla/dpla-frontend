import React from "react";
import Select from "react-select";

import "react-select/dist/react-select.css";
import { classNames, stylesheet } from "shared/FiltersBar/FiltersBar.css";

const SortValue = props =>
  <span className={classNames.sortValue}>
    <span className={classNames.sortByText}>Sort by </span>
    <span>
      {props.value.label}
    </span>
  </span>;

const FiltersBar = () =>
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
            value="title"
            className={[classNames.select, classNames.sortSelect].join(" ")}
            valueComponent={SortValue}
            options={[{ value: "title", label: "Title" }]}
          />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default FiltersBar;
