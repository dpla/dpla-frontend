import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./FiltersList.css";
import { classNames as utilClassNames } from "css/utils.css";
import { possibleFacets } from "constants/search";

// const plusSign = "static/images/add-white.svg";

const clearAllFacets = query => {
  const duped = Object.assign({}, query);
  possibleFacets.forEach(facet => delete duped[facet]);
  return duped;
};

const clearFacet = (query, queryKey, facet) => {
  const duped = Object.assign({}, query);
  duped[queryKey] = duped[queryKey]
    .split("+AND+")
    .filter(facetPart => facetPart.replace(/"/g, "") !== facet)
    .join("+AND+");
  if (!duped[queryKey]) {
    delete duped[queryKey];
  }
  return duped;
};

const Filter = ({ name, queryKey, route }) =>
  <li className={classNames.filter}>
    <Link
      href={{
        pathname: route.pathname,
        query: Object.assign({}, clearFacet(route.query, queryKey, name))
      }}
    >
      <a className={classNames.filterLink}>
        <span>{name}</span>
        {/* <img src={plusSign} className={classNames.xIcon} alt="" /> */}
      </a>
    </Link>
  </li>;

class FiltersList extends React.Component {
  render() {
    const { query } = this.props.route;
    return Object.keys(query).some(queryKey =>
      possibleFacets.includes(queryKey)
    )
      ? <div className={classNames.filtersListWrapper}>
          <div
            className={[classNames.filtersList, utilClassNames.module].join(
              " "
            )}
          >
            <div className={classNames.labelAndFilters}>
              <span className={classNames.labelText}>Filtered by</span>
              <ul className={classNames.filters}>
                {Object.keys(query).map(queryKey => {
                  if (possibleFacets.includes(queryKey)) {
                    return (
                      query[queryKey] &&
                      query[queryKey]
                        .split("+AND+")
                        .map(paramValue =>
                          <Filter
                            route={this.props.route}
                            queryKey={queryKey}
                            name={paramValue.replace(/"/g, "")}
                          />
                        )
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
            <Link
              href={{
                pathname: this.props.route.pathname,
                query: Object.assign({}, clearAllFacets(query))
              }}
            >
              <a className={classNames.clearAll}>
                Clear all filters
              </a>
            </Link>
          </div>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </div>
      : null;
  }
}

export default FiltersList;
