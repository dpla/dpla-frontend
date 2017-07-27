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
        value="title"
        className={[styles.select, styles.sortSelect].join(" ")}
        valueComponent={SortValue}
        options={[{ value: "title", label: "Title" }]}
      />
    </div>
  </div>;

export default Filters;
