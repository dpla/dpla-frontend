import React from "react";
import Select from "react-select";

import "react-select/dist/react-select.css";
import { stylesheet, classNames } from "./Filters.css";
import {
  classNames as utilClassNames,
  stylesheet as utilStylesheet
} from "css/utils.css";

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
        value="all-time-periods"
        className={classNames.select}
        options={[{ value: "all-time-periods", label: "All Time Periods" }]}
      />
      <Select
        clearable={false}
        searchable={false}
        value="all-subjects"
        className={classNames.select}
        options={[{ value: "all-subjects", label: "All Subjects" }]}
      />
      <Select
        clearable={false}
        searchable={false}
        value="date-added"
        className={[classNames.select, classNames.sortSelect].join(" ")}
        valueComponent={SortValue}
        options={[{ value: "date-added", label: "Date Added" }]}
      />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: utilStylesheet }} />
  </div>;

export default Filters;
