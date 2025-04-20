import React from "react";
import Link from "next/link";
import Router, {useRouter, withRouter} from "next/router";
import Button from "shared/Button";
import Accordion from "components/shared/Accordion";

import InformationIcon from "components/svg/Information";

import {
  possibleFacets,
  qaFacets,
  mapFacetsToURLPrettified,
  prettifiedFacetMap,
  tooltips,
} from "constants/search";
import { SITE_ENV } from "constants/env";
import { addCommasToNumber, escapeForRegex, removeQueryParams } from "lib";

import css from "./Sidebar.module.scss";

function FacetLink({ queryKey, termObject, disabled, isTooltip }) {
  const router = useRouter();
  if (disabled) {
    return (
      <span className={css.facet}>
        <span className={`${css.facetName} ${css.activeFacetName}`}>
          {`${termObject.term} `}
        </span>
        <span className={css.facetCount}>
          {addCommasToNumber(termObject.count)}
        </span>
      </span>
    );
  }

  const href = {
    pathname: router.pathname,
    query: {
      ...router.query, // some facet names have spaces, and we need to wrap them in " "
      [queryKey]: router.query[queryKey]
        ? [`${router.query[queryKey]}`, `"${[termObject.term]}"`].join("|")
        : `"${termObject.term}"`,
      page: 1,
    },
  };

  return (
    <div className={css.facet}>
      <span className={css.facetName}>
        <Link href={href} className={css.facetLink}>
          {termObject.term}
        </Link>
        {isTooltip && tooltips[termObject.term] != null && (
          <Link
            href={tooltips[termObject.term].link}
            title={tooltips[termObject.term].text}
            aria-label={tooltips[termObject.term].text}
          >
            <InformationIcon className={css.informationIcon} />
          </Link>
        )}
      </span>{" "}
      <Link href={href} className={css.facetCount}>
        {addCommasToNumber(termObject.count)}
      </Link>
    </div>
  );
}

class DateFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      after: this.props.after || "",
      before: this.props.before || "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.after !== prevProps.after ||
      this.props.before !== prevProps.before
    ) {
      this.setState({
        after: this.props.after || "",
        before: this.props.before || "",
      });
    }
  }

  cleanText(target, compare) {
    let year = target.value;
    if (isNaN(year)) {
      year = compare;
      target.value = year;
    }
    return year;
  }

  handleAfterText = (event) => {
    this.setState((prevState) => ({
      before: prevState.before,
      after: this.cleanText(event.target, prevState.after),
    }));
  };

  validateAfter = (event) => {
    this.setState((prevState) => {
      const year = this.cleanText(event.target, prevState.after);
      if (year !== "" && prevState.before !== "" && year > prevState.before) {
        return {
          before: prevState.before,
          after: year,
        };
      } else {
        return prevState;
      }
    });
  };

  handleBeforeText = (event) => {
    this.setState((prevState) => ({
      before: this.cleanText(event.target, prevState.before),
      after: prevState.after,
    }));
  };

  validateBefore = (event) => {
    this.setState((prevState) => {
      const year = this.cleanText(event.target, prevState.before);
      if (year !== "" && prevState.after !== "" && year < prevState.after) {
        return {
          after: prevState.after,
          before: prevState.after,
        };
      } else {
        return prevState;
      }
    });
  };

  async handleKeyDown(e) {
    if (e.keyCode === 13) {
      await this.handleDateSubmit(e);
    }
  }

  async handleDateSubmit(e) {
    e.preventDefault();
    const dateProps = this.getDateProps();
    await Router.push({
      pathname: this.props.router.pathname,
      query: {
        ...removeQueryParams(this.props.router.query, ["after", "before"]),
        ...dateProps,
        page: 1,
      },
    });
  }

  getDateProps() {
    const dateProps = {};
    if (this.state.after !== "") dateProps.after = this.state.after;
    if (this.state.before !== "") dateProps.before = this.state.before;
    return dateProps;
  }

  render() {
    // NOTE: this form should maybe be wrapping the entire sidebar?
    const { router } = this.props;
    const formVals = {
      ...removeQueryParams(router.query, ["after", "before", "page"]),
      page: 1,
    };
    return (
      <form
        action={router.pathname}
        method="get"
        className={css.dateRangeFacet}
        onSubmit={(e) => this.handleDateSubmit(e)}
      >
        <label className={css.dateFacet} htmlFor="after-date">
          <span>Between Year</span>
          <input
            id="after-date"
            type="numeric"
            name="after"
            value={this.state.after}
            onChange={(e) => this.handleAfterText(e)}
            onBlur={(e) => this.validateAfter(e)}
            onKeyDown={(e) => this.handleKeyDown(e)}
          />
        </label>
        <label className={css.dateFacet} htmlFor="before-date">
          <span>and Year</span>
          <input
            id="before-date"
            type="numeric"
            name="before"
            value={this.state.before}
            onChange={(e) => this.handleBeforeText(e)}
            onBlur={(e) => this.validateBefore(e)}
            onKeyDown={(e) => this.handleKeyDown(e)}
          />
        </label>
        {Object.entries(formVals).map(([k, v]) => {
          return <input type="hidden" name={k} key={k} value={v} />;
        })}
        <Button type="secondary" className={css.dateButton} mustSubmit={true}>
          Update
        </Button>
      </form>
    );
  }
}

class Sidebar extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      possibleFacets.some(
        (facet) => this.props.facets[facet] !== prevProps.facets[facet],
      ) ||
      prevProps.query !== this.props.query
    ) {
      this.forceUpdate();
    }
  }

  render() {
    const { router, facets } = this.props;
    const isFacetValueInQuery = (facetKey, value) =>
      router.query[mapFacetsToURLPrettified[facetKey]] &&
      // handles case of sources with both
      // "moving image" and "image" as types
      new RegExp('"' + escapeForRegex(value) + '"').test(
        router.query[mapFacetsToURLPrettified[facetKey]],
      );
    const items = Object.keys(facets)
      .map((key, i) => {
        if (SITE_ENV === "local" && key.indexOf("provider.name") !== -1) {
          return null;
        } else if (
          key.indexOf("sourceResource.date") === -1 &&
          key.indexOf("tags") === -1
        ) {
          return {
            name: prettifiedFacetMap[key],
            // first two items should be expanded as well as any items
            // with an active subitem found in the query string
            active:
              i < 2 ||
              facets[key].terms.some((termObject) =>
                isFacetValueInQuery(key, termObject.term),
              ),
            type: "term",
            subitems: facets[key].terms.map((termObject) => {
              return {
                content: qaFacets.includes(key) ? (
                  <FacetLink
                    termObject={termObject}
                    queryKey={mapFacetsToURLPrettified[key]}
                    disabled={isFacetValueInQuery(key, termObject.term)}
                    isTooltip={key === "rightsCategory"}
                  />
                ) : null,
              };
            }),
          };
        } else {
          return null;
        }
      })
      .filter((x) => x !== null);

    const dateProps = {};
    if (router.query.after) dateProps.after = router.query.after;
    if (router.query.before) dateProps.before = router.query.before;
    items.splice(3, 0, {
      name: prettifiedFacetMap["sourceResource.date.begin"],
      active: true,
      type: "date",
      subitems: <DateFacet router={router} {...dateProps} />,
    });

    return (
      <div className={css.sidebar}>
        <h2>Refine your search</h2>
        <Accordion items={items} />
      </div>
    );
  }
}

export default withRouter(Sidebar);
