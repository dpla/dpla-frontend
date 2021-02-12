import React from "react";
import Link from "next/link";
import Router from "next/router";

import Button from "shared/Button";
import Accordion from "components/shared/Accordion";

import {
  possibleFacets,
  qaFacets,
  mapFacetsToURLPrettified,
  prettifiedFacetMap
} from "constants/search";
import { SITE_ENV } from "constants/env";
import { addCommasToNumber, escapeForRegex, removeQueryParams } from "lib";

import css from "./Sidebar.scss";

const FacetLink = ({ route, queryKey, termObject, disabled }) =>
  disabled
    ? <span className={[css.facet].join(" ")}>
        <span className={[css.facetName, css.activeFacetName].join(" ")}>
          {`${termObject.term} `}
        </span>
        <span className={css.facetCount}>
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
        <a className={css.facet}>
          <span className={css.facetName}>
            {`${termObject.term} `}
          </span>
          <span className={css.facetCount}>
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

  handleKeyDown(e) {
    if (e.keyCode == 13) {
      this.handleDateSubmit(e);
    }
  }

  handleDateSubmit(e) {
    e.preventDefault();
    const dateProps = this.getDateProps();
    Router.push({
      pathname: this.props.route.pathname,
      query: Object.assign(
        {},
        removeQueryParams(this.props.route.query, ["after", "before"]),
        dateProps,
        {
          page: 1
        }
      )
    });
  }

  getDateProps() {
    let dateProps = {};
    if (this.state.after !== "") dateProps.after = this.state.after;
    if (this.state.before !== "") dateProps.before = this.state.before;
    return dateProps;
  }

  render() {
    // NOTE: this form should maybe be wrapping the entire sidebar?
    const formVals = Object.assign(
      {},
      removeQueryParams(this.props.route.query, ["after", "before", "page"]),
      {
        page: 1
      }
    );
    return (
      <form
        action={this.props.route.pathname}
        method="get"
        className={css.dateRangeFacet}
        onSubmit={e => this.handleDateSubmit(e)}
      >
        <label className={css.dateFacet} htmlFor="after-date">
          <span>Between Year</span>
          <input
            id="after-date"
            type="numeric"
            name="after"
            value={this.state.after}
            onChange={e => this.handleAfterText(e)}
            onBlur={e => this.validateAfter(e)}
            onKeyDown={e => this.handleKeyDown(e)}
          />
        </label>
        <label className={css.dateFacet} htmlFor="before-date">
          <span>and Year</span>
          <input
            id="before-date"
            type="numeric"
            name="before"
            value={this.state.before}
            onChange={e => this.handleBeforeText(e)}
            onBlur={e => this.validateBefore(e)}
            onKeyDown={e => this.handleKeyDown(e)}
          />
        </label>
        {Object.entries(formVals).map(([k, v], index) => {
          return <input type="hidden" name={k} key={index} value={v} />;
        })}
        <Button type="secondary" className={css.dateButton} mustSubmit={true}>
          Update
        </Button>
      </form>
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
      <div className={css.sidebar}>
        <h2>Refine your search</h2>
        <Accordion
          items={Object.keys(facets).map((key, i) => {
            if (SITE_ENV === "local" && key.indexOf("provider.name") !== -1)
              return "";
            if (key.indexOf("sourceResource.date") === -1 && key.indexOf("tags") === -1) {
              return {
                name: prettifiedFacetMap[key],
                // first two items should be expanded as well as any items
                // with an active subitem found in the query string
                active:
                    facets[key].terms.some(termObject =>
                      isFacetValueInQuery(key, termObject.term)
                    ),
                type: "term",
                subitems: facets[key].terms.map(termObject => {
                  return {
                    content: qaFacets.includes(key)
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
                  active: false,
                  type: "date",
                  subitems: <DateFacet route={route} {...dateProps} />
                };
              } else {
                return "";
              }
            }
          })}
        />
      </div>
    );
  }
}

export default Sidebar;
