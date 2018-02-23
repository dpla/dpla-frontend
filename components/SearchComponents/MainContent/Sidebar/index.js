import React from "react";
import Link from "next/link";

import Button from "shared/Button";
import Accordion from "components/shared/Accordion";

import {
  possibleFacets,
  mapFacetsToURLPrettified,
  prettifiedFacetMap
} from "constants/search";
import {
  addCommasToNumber,
  escapeForRegex,
  removeQueryParams
} from "utilFunctions";

import { classNames, stylesheet } from "./Sidebar.css";

const FacetLink = ({ route, queryKey, termObject, disabled }) =>
  disabled
    ? <span className={[classNames.facet].join(" ")}>
        <span
          className={[classNames.facetName, classNames.activeFacetName].join(
            " "
          )}
        >
          {`${termObject.term} `}
        </span>
        <span className={classNames.facetCount}>
          {addCommasToNumber(termObject.count)}
        </span>
      </span>
    : <Link
        prefetch
        href={{
          pathname: route.pathname,
          query: Object.assign({}, route.query, {
            // some facet names have spaces, and we need to wrap them in " "
            [queryKey]: route.query[queryKey]
              ? [`${route.query[queryKey]}`, `"${[termObject.term]}"`].join("|")
              : `"${termObject.term}"`,
            page: 1
          })
        }}
      >
        <a className={classNames.facet}>
          <span className={classNames.facetName}>
            {`${termObject.term} `}
          </span>
          <span className={classNames.facetCount}>
            {addCommasToNumber(termObject.count)}
          </span>
        </a>
      </Link>;

class DateFacet extends React.Component {
  componentWillMount() {
    this.setState({
      after: this.props.after || "",
      before: this.props.before || ""
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.after !== this.state.after ||
      nextProps.before !== this.state.before
    ) {
      this.setState({
        after: nextProps.after || "",
        before: nextProps.before || ""
      });
    }
  }

  cleanText(target, compare) {
    let year = target.value;
    if (isNaN(target.value)) {
      year = compare;
      target.value = year;
    }
    return year;
  }

  handleAfterText = event => {
    let year = this.cleanText(event.target, this.state.after);
    this.setState({
      before: this.state.before,
      after: year
    });
  };

  validateAfter = event => {
    let year = this.cleanText(event.target, this.state.after);
    if (year != "" && this.state.before !== "" && year > this.state.before) {
      year = this.state.before;
      this.setState({
        before: this.state.before,
        after: year
      });
    }
  };

  handleBeforeText = event => {
    let year = this.cleanText(event.target, this.state.before);
    this.setState({
      after: this.state.after,
      before: year
    });
  };

  validateBefore = event => {
    let year = this.cleanText(event.target, this.state.before);
    if (year != "" && this.state.after !== "" && year < this.state.after) {
      year = this.state.after;
      this.setState({
        after: this.state.after,
        before: year
      });
    }
  };

  render() {
    let dateProps = {};
    if (this.state.after !== "") dateProps.after = this.state.after;
    if (this.state.before !== "") dateProps.before = this.state.before;
    return (
      <div className={classNames.dateRangeFacet}>
        <label className={classNames.dateFacet} htmlFor="after-date">
          <span>On or After</span>
          <input
            id="after-date"
            type="numeric"
            value={this.state.after}
            onChange={e => this.handleAfterText(e)}
            onBlur={e => this.validateAfter(e)}
          />
        </label>
        <label className={classNames.dateFacet} htmlFor="before-date">
          <span>On or Before</span>
          <input
            id="before-date"
            type="numeric"
            value={this.state.before}
            onChange={e => this.handleBeforeText(e)}
            onBlur={e => this.validateBefore(e)}
          />
        </label>
        <Button
          type="secondary"
          className={classNames.dateButton}
          url={{
            pathname: this.props.route.pathname,
            query: Object.assign(
              {},
              removeQueryParams(this.props.route.query, ["after", "before"]),
              dateProps,
              {
                page: 1
              }
            )
          }}
        >
          Update
        </Button>
      </div>
    );
  }
}

class Sidebar extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      possibleFacets.some(
        facet => nextProps.facets[facet] !== this.props.facets[facet]
      ) ||
      nextProps.query !== this.props.query
    ) {
      this.forceUpdate();
    }
  }

  render() {
    const { route, facets } = this.props;
    const isFacetValueInQuery = (facetKey, value) =>
      route.query[mapFacetsToURLPrettified[facetKey]] &&
      // handles case of sources with both
      // "moving image" and "image" as types
      new RegExp('"' + escapeForRegex(value) + '"').test(
        route.query[mapFacetsToURLPrettified[facetKey]]
      );
    let hasDates = false;
    return (
      <div className={classNames.sidebar}>
        <h2>Refine your search</h2>
        <Accordion
          items={Object.keys(facets).map((key, i) => {
            if (key.indexOf("sourceResource.date") === -1) {
              return {
                name: prettifiedFacetMap[key],
                // first two items should be expanded as well as any items
                // with an active subitem found in the query string
                active:
                  i < 2 ||
                    facets[key].terms.some(termObject =>
                      isFacetValueInQuery(key, termObject.term)
                    ),
                type: "term",
                subitems: facets[key].terms.map(termObject => {
                  return {
                    content: possibleFacets.includes(key)
                      ? <FacetLink
                          route={route}
                          termObject={termObject}
                          queryKey={mapFacetsToURLPrettified[key]}
                          disabled={isFacetValueInQuery(key, termObject.term)}
                        />
                      : ""
                  };
                })
              };
            } else {
              if (!hasDates) {
                hasDates = true; // because there's facets for after and before we dont want two date ranges
                let dateProps = {};
                if (route.query.after) dateProps.after = route.query.after;
                if (route.query.before) dateProps.before = route.query.before;
                return {
                  name: prettifiedFacetMap[key],
                  active: true,
                  type: "date",
                  subitems: <DateFacet route={route} {...dateProps} />
                };
              } else {
                return "";
              }
            }
          })}
        />
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default Sidebar;
