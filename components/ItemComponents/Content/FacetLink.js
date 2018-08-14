import React from "react";
import Link from "next/link";

import css from "./Content.scss";

const FacetLink = ({ facet, value, facetLabel }) =>
  <Link
    prefetch
    href={{ pathname: "/search", query: { [facet]: `"${value}"` } }}
  >
    <a
      className="link"
      title={`Find more items with ${facetLabel || facet} "${value}"`}
    >
      {value}
    </a>
  </Link>;

export default FacetLink;
