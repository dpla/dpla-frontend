import React from "react";
import Link from "next/link";

const FacetLink = ({ facet, value, facetLabel }) =>
  <Link
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
