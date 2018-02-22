import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./Sidebar.css";

import addCommasToNumber from "utilFunctions/addCommasToNumber";
import Accordion from "components/shared/Accordion";
import {
  possibleFacets,
  mapFacetsToURLPrettified,
  prettifiedFacetMap
} from "constants/search";
import escapeForRegex from "utilFunctions/escapeForRegex";

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

class Sidebar extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      possibleFacets.some(
        facet => nextProps.facets[facet] !== this.props.facets[facet]
      )
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
              return {
                name: prettifiedFacetMap[key],
                active: true,
                type: "date",
                subitems: []
              };
            }
          })}
        />
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default Sidebar;
