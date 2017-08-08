import React from "react";
import Select from "react-select";

import "react-select/dist/react-select.css";
import { classNames, stylesheet } from "./Filters.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const SortValue = props =>
  <span className={classNames.sortValue}>
    <span className={classNames.sortByText}>Sort by </span>
    <span>
      {props.value.label}
    </span>
  </span>;

const Filters = () =>
  <div className={classNames.filtersWrapper}>
    <div className={[module, classNames.filters].join(" ")}>
      <input className={classNames.textInput} placeholder="Filter by title" />
      <Select
        clearable={false}
        searchable={false}
        value="title"
        className={[classNames.select, classNames.sortSelect].join(" ")}
        valueComponent={SortValue}
        options={[{ value: "title", label: "Title" }]}
      />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Filters;
