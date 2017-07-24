import React from "react";
import Select from "react-select";

import "react-select/dist/react-select.css";
import styles from "./Filters.css";
import { module } from "../../../../../../../../css/utils.css";

const SortValue = props =>
  <span className={styles.sortValue}>
    <span className={styles.sortByText}>Sort by </span>
    <span>{props.value.label}</span>
  </span>;

const Filters = () =>
  <div className={styles.filtersWrapper}>
    <div className={[module, styles.filters].join(" ")}>
      <input className={styles.textInput} placeholder="Filter by title" />
      <Select
        clearable={false}
        searchable={false}
        value="all-time-periods"
        className={styles.select}
        options={[{ value: "all-time-periods", label: "All Time Periods" }]}
      />
      <Select
        clearable={false}
        searchable={false}
        value="all-subjects"
        className={styles.select}
        options={[{ value: "all-subjects", label: "All Subjects" }]}
      />
      <Select
        clearable={false}
        searchable={false}
        value="date-added"
        className={[styles.select, styles.sortSelect].join(" ")}
        valueComponent={SortValue}
        options={[{ value: "date-added", label: "Date Added" }]}
      />
    </div>
  </div>;

export default Filters;
