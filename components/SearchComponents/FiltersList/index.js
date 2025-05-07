import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  possibleFacets,
  mapURLPrettifiedFacetsToUgly,
  mapFacetsToURLPrettified,
} from "constants/search";
import { joinIfArray } from "lib";

import css from "./FiltersList.module.scss";
import utils from "stylesheets/utils.module.scss";

import CloseIcon from "components/svg/Close";
import ClearFiltersIcon from "components/svg/ClearFiltersIcon";

function clearAllFacets(query) {
  const duped = { ...query };
  delete duped["q"];
  delete duped["page"];
  possibleFacets.forEach(
    (facet) => delete duped[mapFacetsToURLPrettified[facet]],
  );
  return duped;
}

function clearFacet(query, queryKey, facet) {
  const duped = { ...query };
  delete duped["page"];
  const value = joinIfArray(duped[queryKey], "|");
  duped[queryKey] = value
    .split("|")
    .filter((facetPart) => facetPart.replace(/"/g, "") !== facet)
    .join("|");
  if (!duped[queryKey]) {
    delete duped[queryKey];
  }
  return duped;
}

function Filter({ name, queryKey }) {
  const router = useRouter();
  const label = queryKey !== "q" ? queryKey : "keywords";
  return (
    <li className={css.filter}>
      <Link
        href={{
          pathname: router.pathname,
          query: { ...clearFacet(router.query, queryKey, name) },
        }}
        className={css.filterLink}
        title={`Remove ${label} ${name} filter`}
        aria-label={`Remove ${label} ${name} filter`}
      >
        {label}: <span className={css.filterText}>{name}</span>
        <CloseIcon className={css.closeIcon} />
      </Link>
    </li>
  );
}

function FiltersList({ showFilters }) {
  const router = useRouter();
  const { query } = router;
  const hasFacets = Object.keys(query).some(
    (queryKey) =>
      possibleFacets.includes(mapURLPrettifiedFacetsToUgly[queryKey]) ||
      queryKey === "tags",
  );
  if (!hasFacets) {
    return <></>;
  }
  const filterChildren = Object.keys(query).map((queryKey) => {
    const value = joinIfArray(query[queryKey], "|");
    if (
      possibleFacets.includes(mapURLPrettifiedFacetsToUgly[queryKey]) ||
      queryKey === "q" ||
      queryKey === "tags"
    ) {
      return (
        value &&
        value.split("|").map((paramValue) => {
          const name =
            queryKey !== "after" && queryKey !== "before"
              ? paramValue.replace(/"/g, "")
              : paramValue;
          return (
            <Filter
              queryKey={queryKey}
              key={`${queryKey}-${name}`}
              name={name}
            />
          );
        })
      );
    } else {
      return null;
    }
  });
  return (
    <div className={css.filtersListWrapper}>
      <div
        className={`${showFilters ? css.isOpen : ""} ${css.filtersList} ${utils.container}`}
      >
        <div className={css.labelAndFilters}>
          <span className={css.labelText}>Filtered by</span>
          {filterChildren && <ul className={css.filters}>{filterChildren}</ul>}
        </div>
        <Link
          href={{
            pathname: router.pathname,
            query: { ...clearAllFacets(query) },
          }}
          className={css.clearAll}
        >
          <ClearFiltersIcon className={css.clearAllIcon} />
          <span>Clear all filters</span>
        </Link>
      </div>
    </div>
  );
}

export default FiltersList;
