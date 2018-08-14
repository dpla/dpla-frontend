import React from "react";
import Link from "next/link";

import {
  possibleFacets,
  mapURLPrettifiedFacetsToUgly,
  mapFacetsToURLPrettified
} from "constants/search";
import { removeQueryParams, joinIfArray } from "lib";

import utils from "stylesheets/utils.scss";
import css from "./FiltersList.scss";

const closeIcon = "/static/images/close-white.svg";

const clearAllFacets = query => {
  const duped = Object.assign({}, query);
  delete duped["q"];
  delete duped["page"];
  possibleFacets.forEach(
    facet => delete duped[mapFacetsToURLPrettified[facet]]
  );
  return duped;
};

const clearFacet = (query, queryKey, facet) => {
  const duped = Object.assign({}, query);
  delete duped["page"];
  const value = joinIfArray(duped[queryKey], "|");
  duped[queryKey] = value
    .split("|")
    .filter(facetPart => facetPart.replace(/"/g, "") !== facet)
    .join("|");
  if (!duped[queryKey]) {
    delete duped[queryKey];
  }
  return duped;
};

const Filter = ({ name, queryKey, route }) => {
  const label = queryKey !== "q" ? queryKey : "keywords";
  return (
    <li className={css.filter}>
      <Link
        prefetch
        href={{
          pathname: route.pathname,
          query: Object.assign({}, clearFacet(route.query, queryKey, name))
        }}
      >
        <a
          className={css.filterLink}
          title={`Remove ${label} ${name} filter`}
          aria-label={`Remove ${label} ${name} filter`}
        >
          {label}: <span className={css.filterText}>{name}</span>
          <img src={closeIcon} className={css.closeIcon} alt="" />
        </a>
      </Link>
    </li>
  );
};

class FiltersList extends React.Component {
  render() {
    const { query } = this.props.route;
    const { onClickToggleFilters, showFilters } = this.props;
    return Object.keys(query).some(queryKey =>
      possibleFacets.includes(mapURLPrettifiedFacetsToUgly[queryKey])
    )
      ? <div className={css.filtersListWrapper}>
          <div
            className={`${showFilters
              ? css.isOpen
              : ""} ${css.filtersList} ${utils.container}`}
          >
            <div className={css.labelAndFilters}>
              <span className={css.labelText}>Filtered by</span>
              <ul className={css.filters}>
                {Object.keys(query).map((queryKey, index) => {
                  const value = joinIfArray(query[queryKey], "|");
                  if (
                    possibleFacets.includes(
                      mapURLPrettifiedFacetsToUgly[queryKey]
                    ) ||
                    queryKey === "q"
                  ) {
                    return (
                      value &&
                      value.split("|").map((paramValue, idx) => {
                        const name = queryKey !== "after" &&
                          queryKey !== "before"
                          ? paramValue.replace(/"/g, "")
                          : paramValue;
                        return (
                          <Filter
                            route={this.props.route}
                            queryKey={queryKey}
                            key={idx}
                            name={name}
                          />
                        );
                      })
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
            <Link
              prefetch
              href={{
                pathname: this.props.route.pathname,
                query: Object.assign({}, clearAllFacets(query))
              }}
            >
              <a className={css.clearAll}>
                <svg
                  className={css.clearAllIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M-9-9h36v36H-9z" />
                    <path
                      className={css.clearAllIconPath}
                      d="M11.1869671 9.0007313l6.6321036-6.6336231c.241215-.2405136.241215-.6305716 0-.8710852L16.5043505.1805657C16.3886778.0648899 16.2320966 0 16.0684517 0c-.1636448 0-.3202116.0648899-.4358987.1805657L8.9997271 6.8134666 2.3669012.1805657c-.230634-.23134078-.6404416-.23134078-.8710756 0L.18038312 1.496023c-.24051083.2405136-.24051083.6305716 0 .8710852L6.8132094 9.0007313.18038312 15.6329099c-.24051083.2405136-.24051083.6305716 0 .8717894l1.31544248 1.314735C1.6107941 17.9351083 1.7680795 18 1.9317247 18c.1629298 0 .3202116-.0648917.4351946-.1805657l6.6328258-6.6329009 6.6328259 6.6329009c.1156727.115674.2722539.1805657.4358988.1805657.1636448 0 .3202116-.0648917.4358987-.1805657l1.3147202-1.314735c.2412151-.2412178.2412151-.6312758 0-.8717894l-6.6321216-6.6321786z"
                    />
                  </g>
                </svg>
                <span>Clear all filters</span>
              </a>
            </Link>
          </div>
        </div>
      : null;
  }
}

export default FiltersList;
