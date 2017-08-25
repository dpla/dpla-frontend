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
                  ? <Link
                      href={{
                        pathname: route.pathname,
                        query: Object.assign({}, route.query, {
                          [key]: route.query[key]
                            ? [route.query[key], [termObject.term]].join(",")
                            : termObject.term
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
                    </Link>
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
