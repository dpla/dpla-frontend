import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./Sidebar.css";

import prettifiedFacetMap from "./prettifiedFacetMap";
import Accordion from "components/shared/Accordion";
import { possibleFacets, mapFacetsToURLPrettified } from "constants/search";
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
          ({termObject.count})
        </span>
      </span>
    : <Link
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
            ({termObject.count})
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

    return (
      <div className={classNames.sidebar}>
        <Accordion
          items={Object.keys(facets).map((key, i) => ({
            name: prettifiedFacetMap[key],
            subitems: facets[key].terms.map(termObject => {
              return {
                content: possibleFacets.includes(key)
                  ? <FacetLink
                      route={route}
                      termObject={termObject}
                      queryKey={mapFacetsToURLPrettified[key]}
                      disabled={
                        route.query[mapFacetsToURLPrettified[key]] &&
                        // handles case of sources with both
                        // "moving image" and "image" as types
                        new RegExp(
                          '"' + escapeForRegex(termObject.term) + '"'
                        ).test(route.query[mapFacetsToURLPrettified[key]])
                      }
                    />
                  : ""
              };
            })
          }))}
        />
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default Sidebar;
