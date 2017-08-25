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

const Sidebar = ({ facets, route }) =>
  <div className={classNames.sidebar}>
    <Accordion
      subitemsWrapperClass={classNames.accordionSubitems}
      itemHeaderClass={classNames.accordionItemHeader}
      subitemClass={classNames.accordionSubitem}
      activeItemClass={classNames.active}
      inactiveItemClass={classNames.inactive}
      items={Object.keys(facets).map((key, i) => ({
        name: prettifiedFacetMap[key],
        subitems: facets[key].terms.map(termObject => {
          return {
            content: possibleFacets[key]
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
  </div>;

export default Sidebar;
