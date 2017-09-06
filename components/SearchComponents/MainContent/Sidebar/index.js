import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./Sidebar.css";

import prettifiedFacetMap from "./prettifiedFacetMap";
import Accordion from "components/shared/Accordion";

const possibleFacets = [
  "sourceResource.type",
  "sourceResource.subject.name",
  "sourceResource.spatial.name",
  "sourceResource.language.name",
  "dataProvider",
  "provider.name"
];

const paramsToString = query =>
  Object.keys(query)
    .map(key => {
      // if the query has more than 1 value it is formatted as an array
      if (Array.isArray(query[key])) {
        // we have to map these into a single string
        return query[key].map(param => `${key}=${param}`).join("&");
      } else {
        return `${key}=${query[key]}`;
      }
    })
    .join("&");

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
        href={`${route.pathname}?${queryKey}=${termObject.term}&${paramsToString(
          Object.assign({}, route.query, { page: 1 })
        )}`}
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
                      queryKey={key}
                      disabled={
                        route.query[key] &&
                        route.query[key].includes(termObject.term)
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
