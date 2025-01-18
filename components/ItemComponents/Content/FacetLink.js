import React from "react";
import Link from "next/link";

const FacetLink = ({ facet, value, facetLabel }) =>
  <Link
    href={{ pathname: "/search", query: { [facet]: `"${value}"` } }}
    title={`Find more items with ${facetLabel || facet} "${value}"`}
    className="link"
  >
    {value}
  </Link>;

export default FacetLink;
